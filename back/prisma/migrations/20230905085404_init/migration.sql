-- CreateTable
CREATE TABLE `internautes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NULL,
    `prenom` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `photo` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
