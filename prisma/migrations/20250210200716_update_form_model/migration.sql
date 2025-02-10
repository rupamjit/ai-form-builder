/*
  Warnings:

  - You are about to drop the column `subissions` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "subissions",
ADD COLUMN     "submissions" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "shareUrl" DROP NOT NULL;
