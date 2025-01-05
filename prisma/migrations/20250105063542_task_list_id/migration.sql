/*
  Warnings:

  - You are about to drop the column `ListId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `listId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_ListId_fkey`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `ListId`,
    ADD COLUMN `listId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
