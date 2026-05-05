-- AlterTable
ALTER TABLE `Card` ADD COLUMN `assignedById` INTEGER NULL,
    ADD COLUMN `createdById` INTEGER NULL,
    ADD COLUMN `deactivatedAt` DATETIME(3) NULL,
    ADD COLUMN `deactivatedById` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Card_createdById_idx` ON `Card`(`createdById`);

-- CreateIndex
CREATE INDEX `Card_assignedById_idx` ON `Card`(`assignedById`);

-- CreateIndex
CREATE INDEX `Card_deactivatedById_idx` ON `Card`(`deactivatedById`);

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_assignedById_fkey` FOREIGN KEY (`assignedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_deactivatedById_fkey` FOREIGN KEY (`deactivatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
