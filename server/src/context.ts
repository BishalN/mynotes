import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prismaClient,
};
