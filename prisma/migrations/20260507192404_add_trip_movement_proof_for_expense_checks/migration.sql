-- AlterTable
ALTER TABLE `TravelRequestTripFile` ADD COLUMN `fileRole` ENUM('ticket', 'invoice_xml', 'invoice_pdf', 'invoice_xml_outbound', 'invoice_pdf_outbound', 'invoice_xml_return', 'invoice_pdf_return') NULL,
    ADD COLUMN `tripMovementProofId` INTEGER NULL;

-- CreateTable
CREATE TABLE `TripMovementProof` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `movementSequence` INTEGER NOT NULL,
    `movementDate` DATETIME(3) NOT NULL,
    `movementAmount` DECIMAL(12, 2) NOT NULL,
    `movementMemo` TEXT NULL,
    `proofType` ENUM('ticket', 'invoice') NOT NULL,
    `status` ENUM('submitted', 'approved', 'rejected') NOT NULL DEFAULT 'submitted',
    `comment` TEXT NULL,
    `createdByUserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TripMovementProof_tripId_idx`(`tripId`),
    INDEX `TripMovementProof_createdByUserId_idx`(`createdByUserId`),
    INDEX `TripMovementProof_status_idx`(`status`),
    INDEX `TripMovementProof_createdAt_idx`(`createdAt`),
    UNIQUE INDEX `TripMovementProof_tripId_movementSequence_key`(`tripId`, `movementSequence`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `TravelRequestTripFile_tripMovementProofId_idx` ON `TravelRequestTripFile`(`tripMovementProofId`);

-- CreateIndex
CREATE INDEX `TravelRequestTripFile_fileRole_idx` ON `TravelRequestTripFile`(`fileRole`);

-- AddForeignKey
ALTER TABLE `TravelRequestTripFile` ADD CONSTRAINT `TravelRequestTripFile_tripMovementProofId_fkey` FOREIGN KEY (`tripMovementProofId`) REFERENCES `TripMovementProof`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripMovementProof` ADD CONSTRAINT `TripMovementProof_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `TravelRequestTrip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripMovementProof` ADD CONSTRAINT `TripMovementProof_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
