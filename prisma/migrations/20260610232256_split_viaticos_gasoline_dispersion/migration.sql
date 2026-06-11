/*
  Warnings:

  - A unique constraint covering the columns `[travelRequestTripId]` on the table `GasolineRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `GasolineRequest` ADD COLUMN `travelRequestTripId` INTEGER NULL;

-- AlterTable
ALTER TABLE `TravelRequestTripGasoline` ADD COLUMN `odometerPhoto` LONGBLOB NULL;

-- AlterTable
ALTER TABLE `TravelRequestTripTag` ADD COLUMN `dispersionStatus` ENUM('pending', 'dispersed') NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX `GasolineRequest_travelRequestTripId_key` ON `GasolineRequest`(`travelRequestTripId`);

-- CreateIndex
CREATE INDEX `TravelRequestTripTag_dispersionStatus_idx` ON `TravelRequestTripTag`(`dispersionStatus`);

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_travelRequestTripId_fkey` FOREIGN KEY (`travelRequestTripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
