-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" TEXT NOT NULL DEFAULT 'sophy',
ADD COLUMN     "lastname" TEXT NOT NULL DEFAULT 'doe',
ADD COLUMN     "nin" TEXT NOT NULL DEFAULT 'test';
