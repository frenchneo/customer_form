/*
  Warnings:

  - A unique constraint covering the columns `[tel]` on the table `internautes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `internautes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nom` on table `internautes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prenom` on table `internautes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dob` on table `internautes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `internautes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `internautes` MODIFY `nom` VARCHAR(191) NOT NULL,
    MODIFY `prenom` VARCHAR(191) NOT NULL,
    MODIFY `dob` VARCHAR(191) NOT NULL,
    MODIFY `photo` TEXT NULL,
    MODIFY `tel` VARCHAR(191) NULL,
    MODIFY `adress` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `internautes_tel_key` ON `internautes`(`tel`);

-- CreateIndex
CREATE UNIQUE INDEX `internautes_email_key` ON `internautes`(`email`);
