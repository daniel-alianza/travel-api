-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardNumber` VARCHAR(50) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Card_cardNumber_key`(`cardNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardAssignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `unassignedAt` DATETIME(3) NULL,

    INDEX `CardAssignment_cardId_idx`(`cardId`),
    INDEX `CardAssignment_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusTravelRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `StatusTravelRequest_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `cardId` INTEGER NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `travelReason` VARCHAR(255) NOT NULL,
    `travelObjectives` VARCHAR(255) NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,
    `disbursementDate` DATETIME(3) NULL,
    `approvalDate` DATETIME(3) NULL,
    `approverId` INTEGER NULL,
    `comment` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TravelRequest_userId_idx`(`userId`),
    INDEX `TravelRequest_statusId_idx`(`statusId`),
    INDEX `TravelRequest_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travelRequestId` INTEGER NOT NULL,
    `concept` VARCHAR(150) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,

    INDEX `TravelDetail_travelRequestId_idx`(`travelRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardAssignment` ADD CONSTRAINT `CardAssignment_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardAssignment` ADD CONSTRAINT `CardAssignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `StatusTravelRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_approverId_fkey` FOREIGN KEY (`approverId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequest` ADD CONSTRAINT `TravelRequest_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelDetail` ADD CONSTRAINT `TravelDetail_travelRequestId_fkey` FOREIGN KEY (`travelRequestId`) REFERENCES `TravelRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
