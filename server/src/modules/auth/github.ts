import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import express from 'express';
import { prismaClient } from '../../context';
import { User } from '.prisma/client';

const router = express.Router();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
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

router.get(
  '/',
  passport.authenticate('github', { scope: ['profile', 'email', 'openid'] })
);

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.LOGIN_URL,
  }),
  (req, res) => {
    // res.redirect(process.env.LOGIN_SUCCESS_URL);
    res.redirect('/success');
  }
);
export { router };
