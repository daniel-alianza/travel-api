-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardNumber` VARCHAR(191) NOT NULL,
    `type` ENUM('VIATIC', 'FUEL') NOT NULL,
    `companyId` INTEGER NULL,
    `userId` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `limite` DECIMAL(12, 2) NULL,
    `fuelName` VARCHAR(191) NULL,
    `fuelCardKind` ENUM('physical', 'virtual') NULL,
    `fuelGroup` VARCHAR(191) NULL,
    `fuelAssignmentType` ENUM('NotAcumulative', 'Acumulable') NULL,
    `fuelStatus` ENUM('active', 'inactive', 'blocked', 'cancelled') NULL,
    `sapCode` VARCHAR(191) NULL,
    `sapSyncedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Card_cardNumber_key`(`cardNumber`),
    INDEX `Card_type_idx`(`type`),
    INDEX `Card_companyId_idx`(`companyId`),
    INDEX `Card_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
