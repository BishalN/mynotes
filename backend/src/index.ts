import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyEnv, { fastifyEnvOpt } from 'fastify-env';

const app = fastify({ logger: true });

const schema = {
  type: 'object',
  required: ['PORT', 'DATABASE_URL'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
    DATABASE_URL: {
      type: 'string',
    },
  },
};

const options: fastifyEnvOpt = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
};

app.register(fastifyEnv, options);

export const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
  const users = await prisma.note.findMany();
  res.send(users);
});

app.get('/auth/local', async (req, res) => {});

const main = async () => {
  try {
    await app.listen(process.env.PORT || 4000);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

main();
