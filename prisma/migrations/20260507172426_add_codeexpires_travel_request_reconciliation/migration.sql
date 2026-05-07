/*
  Warnings:

  - Added the required column `codeExpiresAt` to the `TravelRequestReconciliation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TravelRequestReconciliation` ADD COLUMN `codeExpiresAt` DATETIME(3) NOT NULL;
