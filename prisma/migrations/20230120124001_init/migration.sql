/*
  Warnings:

  - You are about to drop the column `body` on the `Part` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Part` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Part` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Part` table. All the data in the column will be lost.
  - Added the required column `category` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategory` to the `Part` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Part" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Part" ("id") SELECT "id" FROM "Part";
DROP TABLE "Part";
ALTER TABLE "new_Part" RENAME TO "Part";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
