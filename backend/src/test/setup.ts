import { prisma } from "../prismaClient";

jest.mock("../utils/sendEmail.ts");

beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.note.deleteMany();
});

beforeEach(async () => {});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.note.deleteMany();
});
