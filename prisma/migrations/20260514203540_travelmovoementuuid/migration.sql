-- AlterTable
ALTER TABLE `TripMovementProof` ADD COLUMN `cfdiPdfCrosscheckAt` DATETIME(3) NULL,
    ADD COLUMN `cfdiPdfCrosscheckPassed` BOOLEAN NULL;

-- CreateTable
CREATE TABLE `TripMovementProofCfdi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripMovementProofId` INTEGER NOT NULL,
    `tripFileId` INTEGER NULL,
    `cfdiUuid` VARCHAR(36) NOT NULL,
    `fechaEmision` DATETIME(3) NOT NULL,
    `xmlFileRole` ENUM('invoice_xml', 'invoice_xml_outbound', 'invoice_xml_return') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TripMovementProofCfdi_tripMovementProofId_idx`(`tripMovementProofId`),
    INDEX `TripMovementProofCfdi_tripFileId_idx`(`tripFileId`),
    INDEX `TripMovementProofCfdi_fechaEmision_idx`(`fechaEmision`),
    UNIQUE INDEX `TripMovementProofCfdi_cfdiUuid_key`(`cfdiUuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TripMovementProofCfdi` ADD CONSTRAINT `TripMovementProofCfdi_tripMovementProofId_fkey` FOREIGN KEY (`tripMovementProofId`) REFERENCES `TripMovementProof`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripMovementProofCfdi` ADD CONSTRAINT `TripMovementProofCfdi_tripFileId_fkey` FOREIGN KEY (`tripFileId`) REFERENCES `TravelRequestTripFile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
