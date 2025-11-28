-- AlterTable
ALTER TABLE `TravelRequest` ADD COLUMN `disburserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_disburserId_fkey` FOREIGN KEY (`disburserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
