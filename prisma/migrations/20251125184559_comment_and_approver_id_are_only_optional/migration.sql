/*
  Warnings:

  - Made the column `cardId` on table `TravelRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `TravelRequest` DROP FOREIGN KEY `TravelRequest_cardId_fkey`;

-- AlterTable
ALTER TABLE `TravelRequest` MODIFY `cardId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
