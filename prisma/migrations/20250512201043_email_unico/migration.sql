/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `profissional` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profissional_email_key" ON "profissional"("email");
