/*
  Warnings:

  - Made the column `due_date` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `due_date` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "due_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "due_date" SET NOT NULL;
