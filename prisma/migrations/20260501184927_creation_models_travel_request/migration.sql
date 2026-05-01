/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `TravelRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `areaId` INTEGER NOT NULL,
    `approverId` INTEGER NULL,
    `employeeName` VARCHAR(191) NOT NULL,
    `corporateCardNumber` VARCHAR(191) NULL,
    `status` ENUM('draft', 'submitted', 'approved', 'rejected', 'dispersed', 'cancelled') NOT NULL DEFAULT 'draft',
    `approverComment` TEXT NULL,
    `submittedAt` DATETIME(3) NULL,
    `approvedAt` DATETIME(3) NULL,
    `rejectedAt` DATETIME(3) NULL,
    `dispersedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TravelRequest_userId_idx`(`userId`),
    INDEX `TravelRequest_companyId_idx`(`companyId`),
    INDEX `TravelRequest_branchId_idx`(`branchId`),
    INDEX `TravelRequest_areaId_idx`(`areaId`),
    INDEX `TravelRequest_approverId_idx`(`approverId`),
    INDEX `TravelRequest_status_idx`(`status`),
    INDEX `TravelRequest_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequestTrip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travelRequestId` INTEGER NOT NULL,
    `tripOrder` INTEGER NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `purpose` TEXT NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,
    `disbursementDate` DATETIME(3) NOT NULL,
    `estimatedTotal` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TravelRequestTrip_travelRequestId_idx`(`travelRequestId`),
    UNIQUE INDEX `TravelRequestTrip_travelRequestId_tripOrder_key`(`travelRequestId`, `tripOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequestTripObjective` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `objectiveOrder` INTEGER NOT NULL,
    `description` TEXT NOT NULL,

    INDEX `TravelRequestTripObjective_tripId_idx`(`tripId`),
    UNIQUE INDEX `TravelRequestTripObjective_tripId_objectiveOrder_key`(`tripId`, `objectiveOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequestTripExpense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `transport` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `tolls` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `lodging` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `food` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `freight` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `tools` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `shipping` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `miscellaneous` DECIMAL(12, 2) NOT NULL DEFAULT 0,

    UNIQUE INDEX `TravelRequestTripExpense_tripId_key`(`tripId`),
    INDEX `TravelRequestTripExpense_tripId_idx`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequestTripGasoline` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `requiresGasoline` BOOLEAN NOT NULL DEFAULT false,
    `cardId` INTEGER NULL,
    `plate` VARCHAR(191) NULL,
    `currentMileageKm` DECIMAL(12, 2) NULL,
    `requestedAmount` DECIMAL(12, 2) NULL,
    `distanceKm` DECIMAL(12, 2) NULL,
    `comments` TEXT NULL,

    UNIQUE INDEX `TravelRequestTripGasoline_tripId_key`(`tripId`),
    INDEX `TravelRequestTripGasoline_tripId_idx`(`tripId`),
    INDEX `TravelRequestTripGasoline_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequestTripTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `requiresTag` BOOLEAN NOT NULL DEFAULT false,
    `requestedAmount` DECIMAL(12, 2) NULL,
    `comments` TEXT NULL,

    UNIQUE INDEX `TravelRequestTripTag_tripId_key`(`tripId`),
    INDEX `TravelRequestTripTag_tripId_idx`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequestTripFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NULL,
    `mimeType` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TravelRequestTripFile_tripId_idx`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTrip` ADD CONSTRAINT `TravelRequestTrip_travelRequestId_fkey` FOREIGN KEY (`travelRequestId`) REFERENCES `TravelRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTripObjective` ADD CONSTRAINT `TravelRequestTripObjective_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTripExpense` ADD CONSTRAINT `TravelRequestTripExpense_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTripGasoline` ADD CONSTRAINT `TravelRequestTripGasoline_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTripGasoline` ADD CONSTRAINT `TravelRequestTripGasoline_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTripTag` ADD CONSTRAINT `TravelRequestTripTag_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestTripFile` ADD CONSTRAINT `TravelRequestTripFile_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
