import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { context } from './context';
import { helloResolver } from './helloResolver';

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [helloResolver],
    }),
    context,
    introspection: true,
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
