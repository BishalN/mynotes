import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import axios from 'axios';
import express from 'express';
import { prismaClient } from '../../context';
import { User } from '.prisma/client';

const router = express.Router();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async (accessToken, _, profile, cb) => {
      const {
        _json: { id },
      } = profile;

      let graphqlUrl = `https://graph.facebook.com/v9.0/${id}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const { data } = await axios.get(graphqlUrl);

      const {
        name,
        email,
        picture: {
          data: { url },
        },
      } = data as any;

      let user: User;

      //find the user either by their email or their facebook id
      if (!email) {
        user = await prismaClient.user.findFirst({
          where: { facebookId: id },
        });
      } else {
        user = await prismaClient.user.findUnique({ where: { email } });
      }

      //   //we need to register user
      if (!user) {
        user = await prismaClient.user.create({
          data: { email, imageUrl: url, name, facebookId: id },
        });
      } else if (!user.facebookId) {
        //merge the account
        await prismaClient.user.update({
          where: { id: user.id },
          data: { facebookId: id },
        });
      } else {
        //log the user in
      }

      return cb(null, { id: user.id });
    }
  )
);

router.get('/', passport.authenticate('facebook'));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: process.env.LOGIN_URL,
  }),
  (req, res) => {
    //set the cookie to the browser with some token
    res.redirect(process.env.LOGIN_SUCCESS_URL);
  }
);
export { router };
