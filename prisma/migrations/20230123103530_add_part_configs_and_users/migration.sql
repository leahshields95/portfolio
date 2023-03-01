/*
  Warnings:

  - The primary key for the `Part` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Part` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PartConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "part_id" INTEGER NOT NULL,
    "additional" TEXT,
    "part_configuration" TEXT NOT NULL,
    CONSTRAINT "PartConfig_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MeasuredPartMass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "configuration_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "precision" INTEGER NOT NULL,
    "measured_mass" INTEGER NOT NULL,
    "manufacturer_mass" INTEGER NOT NULL,
    "new" BOOLEAN NOT NULL,
    "date" TEXT NOT NULL,
    "customisation" TEXT,
    "notes" TEXT NOT NULL,
    CONSTRAINT "MeasuredPartMass_configuration_id_fkey" FOREIGN KEY ("configuration_id") REFERENCES "PartConfig" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MeasuredPartMass_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Part" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Part" ("category", "id", "manufacturer", "name", "subcategory") SELECT "category", "id", "manufacturer", "name", "subcategory" FROM "Part";
DROP TABLE "Part";
ALTER TABLE "new_Part" RENAME TO "Part";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
