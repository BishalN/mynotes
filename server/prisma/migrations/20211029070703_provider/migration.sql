-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'facebook', 'github', 'local');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT E'local';
