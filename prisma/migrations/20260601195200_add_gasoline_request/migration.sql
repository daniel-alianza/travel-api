-- CreateTable
CREATE TABLE `GasolineRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `branchId` INTEGER NULL,
    `areaId` INTEGER NULL,
    `cardId` INTEGER NOT NULL,
    `plate` VARCHAR(191) NOT NULL,
    `currentMileageKm` DECIMAL(12, 2) NOT NULL,
    `requestedAmount` DECIMAL(12, 2) NOT NULL,
    `distanceKm` DECIMAL(12, 2) NOT NULL,
    `routeToTake` VARCHAR(191) NOT NULL,
    `applicantComments` TEXT NULL,
    `status` ENUM('pending', 'approved', 'rejected', 'dispersed') NOT NULL DEFAULT 'pending',
    `approverId` INTEGER NULL,
    `approverComment` TEXT NULL,
    `approvedAt` DATETIME(3) NULL,
    `disbursedById` INTEGER NULL,
    `disbursedComment` TEXT NULL,
    `disbursedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GasolineRequest_userId_idx`(`userId`),
    INDEX `GasolineRequest_companyId_idx`(`companyId`),
    INDEX `GasolineRequest_branchId_idx`(`branchId`),
    INDEX `GasolineRequest_areaId_idx`(`areaId`),
    INDEX `GasolineRequest_cardId_idx`(`cardId`),
    INDEX `GasolineRequest_approverId_idx`(`approverId`),
    INDEX `GasolineRequest_disbursedById_idx`(`disbursedById`),
    INDEX `GasolineRequest_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GasolineRequestOdometerPhoto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gasolineRequestId` INTEGER NOT NULL,
    `photo` LONGBLOB NOT NULL,

    INDEX `GasolineRequestOdometerPhoto_gasolineRequestId_idx`(`gasolineRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequest` ADD CONSTRAINT `GasolineRequest_disbursedById_fkey` FOREIGN KEY (`disbursedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineRequestOdometerPhoto` ADD CONSTRAINT `GasolineRequestOdometerPhoto_gasolineRequestId_fkey` FOREIGN KEY (`gasolineRequestId`) REFERENCES `GasolineRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
