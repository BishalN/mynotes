import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import express from 'express';
import { prismaClient } from '../../context';
import { User } from '.prisma/client';
import { isProd } from '../../utils/isProd';

const router = express.Router();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: isProd
        ? process.env.PROD_GITHUB_CALLBACK_URL
        : process.env.DEV_GITHUB_CALLBACK_URL,
      scope: ['profile', 'email', 'openid'],
    },
    async (req, res, profile, cb) => {
      const {
        _json: { email, name, picture, sub: id },
      } = profile;

      let user: User;

      //find the user either by their email or their facebook id
      if (!email) {
        user = await prismaClient.user.findFirst({ where: { githubId: id } });
      } else {
        user = await prismaClient.user.findUnique({ where: { email } });
      }

      //we need to register user
      if (!user) {
        user = await prismaClient.user.create({
          data: { email, imageUrl: picture, name, githubId: id },
        });
      } else if (!user.githubId) {
        //merge the account
        await prismaClient.user.update({
          where: { id: user.id },
          data: { githubId: id },
        });
      } else {
        //log the user in
      }

      return cb(null, { id: user.id });
    }
  )
);

let redirectUrl: string;

router.get(
  '/',
  async (req: any, res, next) => {
    if (req.query.redirect) {
      console.log('on the if statement');
      redirectUrl = req.query.redirect;
    }
    next();
  },
  passport.authenticate('github', {
    scope: ['profile', 'email', 'openid'],
  })
);

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: isProd
      ? process.env.PROD_LOGIN_URL
      : process.env.DEV_LOGIN_URL,
  }),
  (req, res) => {
    if (redirectUrl) {
      res.redirect(`${redirectUrl}cookies=${JSON.stringify(req.cookies)}`);
      redirectUrl = '';
      return;
    }
    res.redirect(
      isProd ? process.env.PROD_LOGIN_SUCCESS_URL : process.env.DEV_LOGIN_URL
    );
  }
);
export { router };
