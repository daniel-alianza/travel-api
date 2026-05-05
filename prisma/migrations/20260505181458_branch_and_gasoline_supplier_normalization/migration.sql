/*
  Warnings:

  - A unique constraint covering the columns `[companyId,externalCode]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Branch` ADD COLUMN `companyId` INTEGER NULL,
    ADD COLUMN `externalCode` VARCHAR(191) NULL,
    ADD COLUMN `source` ENUM('INTERNAL', 'SAP_ALIANZA') NULL;

-- CreateTable
CREATE TABLE `GasolineSupplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NULL,

    INDEX `GasolineSupplier_companyId_idx`(`companyId`),
    UNIQUE INDEX `GasolineSupplier_companyId_code_key`(`companyId`, `code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Branch_companyId_idx` ON `Branch`(`companyId`);

-- CreateIndex
CREATE UNIQUE INDEX `Branch_companyId_externalCode_key` ON `Branch`(`companyId`, `externalCode`);

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `Branch_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GasolineSupplier` ADD CONSTRAINT `GasolineSupplier_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
