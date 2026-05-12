-- CreateTable
CREATE TABLE `UserExtraPermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `permissionCode` VARCHAR(64) NOT NULL,

    INDEX `UserExtraPermission_permissionCode_idx`(`permissionCode`),
    UNIQUE INDEX `UserExtraPermission_userId_permissionCode_key`(`userId`, `permissionCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserExtraPermission` ADD CONSTRAINT `UserExtraPermission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
