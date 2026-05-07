-- CreateTable
CREATE TABLE `TravelRequestReconciliation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travelRequestId` INTEGER NOT NULL,
    `requestedByUserId` INTEGER NOT NULL,
    `status` ENUM('pending', 'rejected', 'approved', 'verified') NOT NULL DEFAULT 'pending',
    `verificationCodeHash` VARCHAR(255) NOT NULL,
    `decidedByUserId` INTEGER NULL,
    `decidedAt` DATETIME(3) NULL,
    `rejectionReason` TEXT NULL,
    `codeVerifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TravelRequestReconciliation_travelRequestId_idx`(`travelRequestId`),
    INDEX `TravelRequestReconciliation_status_idx`(`status`),
    INDEX `TravelRequestReconciliation_createdAt_idx`(`createdAt`),
    INDEX `TravelRequestReconciliation_decidedAt_idx`(`decidedAt`),
    INDEX `TravelRequestReconciliation_requestedByUserId_idx`(`requestedByUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TravelRequestReconciliation` ADD CONSTRAINT `TravelRequestReconciliation_travelRequestId_fkey` FOREIGN KEY (`travelRequestId`) REFERENCES `TravelRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestReconciliation` ADD CONSTRAINT `TravelRequestReconciliation_requestedByUserId_fkey` FOREIGN KEY (`requestedByUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelRequestReconciliation` ADD CONSTRAINT `TravelRequestReconciliation_decidedByUserId_fkey` FOREIGN KEY (`decidedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
