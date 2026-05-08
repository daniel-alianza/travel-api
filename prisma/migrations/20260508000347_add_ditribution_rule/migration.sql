-- CreateTable
CREATE TABLE `DistributionRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `areaId` INTEGER NULL,

    INDEX `DistributionRule_companyId_idx`(`companyId`),
    INDEX `DistributionRule_companyId_areaId_idx`(`companyId`, `areaId`),
    UNIQUE INDEX `DistributionRule_companyId_areaId_code_key`(`companyId`, `areaId`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DistributionRule` ADD CONSTRAINT `DistributionRule_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DistributionRule` ADD CONSTRAINT `DistributionRule_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
