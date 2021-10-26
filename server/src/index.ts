import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';

import { context, prismaClient } from './context';
import { helloResolver } from './helloResolver';
import { router as googleAuthHandler } from './modules/auth/google';
import { router as facebookAuthHandler } from './modules/auth/facebook';
import { router as githubAuthHandler } from './modules/auth/github';
import { router as localAuthHandler } from './modules/auth/local';
import { User } from './modules/user/User';

dotenv.config();

const main = async () => {
  const app = express();

  app.use(cors());

  app.set('trust proxy', 1);

  app.use(
    cookieSession({
      secret: 'hellowo',
      name: 'qid',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.use(json());

  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id: number, done) {
    try {
      const user = await prismaClient.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  app.use('/auth/google', googleAuthHandler);
  app.use('/auth/facebook', facebookAuthHandler);
  app.use('/auth/github', githubAuthHandler);
  app.use('/auth/local', localAuthHandler);

  app.post('/', async (req, res) => {
    console.log(req.body);
    res.send('suck');
  });

  app.get('/success', (req, res) => {
    console.log(req.user);
    res.send('success');
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver],
    }),
    context,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log('timeXoneSyncer running on port 4000 !!');
  });
};

main();
