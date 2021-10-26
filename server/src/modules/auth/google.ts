import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express from 'express';
import { prismaClient } from '../../context';

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email', 'openid'],
    },
    async (req, res, profile, cb) => {
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

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.LOGIN_URL,
  }),
  (req, res) => {
    res.redirect(process.env.LOGIN_SUCCESS_URL);
  }
);
export { router };
