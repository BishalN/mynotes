import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';
import passport from 'passport';

import { context, prismaClient } from './context';
import { helloResolver } from './helloResolver';
import { router as googleAuthHandler } from './modules/auth/google';
import { router as facebookAuthHandler } from './modules/auth/facebook';
import { router as githubAuthHandler } from './modules/auth/github';
import { User } from './modules/user/User';

dotenv.config();

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver],
    }),
    context,
    introspection: true,
  });

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

  app.use(passport.initialize());

  app.use('/auth/google', googleAuthHandler);
  app.use('/auth/facebook', facebookAuthHandler);
  app.use('/auth/github', githubAuthHandler);

  app.get('/success', (req, res) => {
    // res.send('Successfully done');
    console.log(req.user);
    res.send('success');
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
