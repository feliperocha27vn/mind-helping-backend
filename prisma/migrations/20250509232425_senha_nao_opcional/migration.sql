/*
  Warnings:

  - Made the column `senha_hash` on table `profissional` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profissional" ALTER COLUMN "senha_hash" SET NOT NULL;
