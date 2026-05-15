-- CreateTable
CREATE TABLE `Currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sapCurrencyCode` VARCHAR(191) NOT NULL,
    `companyId` INTEGER NOT NULL,

    INDEX `Currency_companyId_idx`(`companyId`),
    UNIQUE INDEX `Currency_companyId_name_key`(`companyId`, `name`),
    UNIQUE INDEX `Currency_companyId_sapCurrencyCode_key`(`companyId`, `sapCurrencyCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Currency` ADD CONSTRAINT `Currency_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
