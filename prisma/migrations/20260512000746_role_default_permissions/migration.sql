-- CreateTable
CREATE TABLE `RoleDefaultPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` INTEGER NOT NULL,
    `permissionCode` VARCHAR(64) NOT NULL,

    INDEX `RoleDefaultPermission_permissionCode_idx`(`permissionCode`),
    UNIQUE INDEX `RoleDefaultPermission_roleId_permissionCode_key`(`roleId`, `permissionCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoleDefaultPermission` ADD CONSTRAINT `RoleDefaultPermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
