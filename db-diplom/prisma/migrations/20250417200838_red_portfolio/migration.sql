/*
  Warnings:

  - You are about to drop the column `points` on the `achievements` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `achievements` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `portfolios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "points",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "portfolios" DROP COLUMN "totalPoints";
