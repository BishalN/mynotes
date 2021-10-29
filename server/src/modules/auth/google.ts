import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express, { Request } from 'express';
import { prismaClient } from '../../context';
import { isProd } from '../../utils/isProd';

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProd
        ? process.env.PROD_GOOGLE_CALLBACK_URL
        : process.env.DEV_GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email', 'openid'],
    },
    async (accessToken: string, refreshToken: string, profile, cb) => {
      const {
        _json: { email, name, picture, sub: id },
      } = profile;

      let user = await prismaClient.user.findUnique({ where: { email } });

      //we need to register user
      if (!user) {
        user = await prismaClient.user.create({
          data: { email, imageUrl: picture, name, googleId: id },
        });
      } else if (!user.googleId) {
        //merge the account
        await prismaClient.user.update({
          where: { id: user.id },
          data: { googleId: id },
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
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

router.get(
  '/callback',
  passport.authenticate('google', {
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
      isProd
        ? process.env.PROD_LOGIN_SUCCESS_URL
        : process.env.DEV_LOGIN_SUCCESS_URL
    );
  }
);
export { router };
