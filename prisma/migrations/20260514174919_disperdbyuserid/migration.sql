-- AlterTable
ALTER TABLE `TravelRequest` ADD COLUMN `dispersedById` INTEGER NULL;

-- AlterTable
ALTER TABLE `TravelRequestTrip` ADD COLUMN `approvedById` INTEGER NULL;

-- CreateIndex
CREATE INDEX `TravelRequest_dispersedById_idx` ON `TravelRequest`(`dispersedById`);

-- CreateIndex
CREATE INDEX `TravelRequestTrip_approvedById_idx` ON `TravelRequestTrip`(`approvedById`);

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_dispersedById_fkey` FOREIGN KEY (`dispersedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTrip` ADD CONSTRAINT `TravelRequestTrip_approvedById_fkey` FOREIGN KEY (`approvedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
