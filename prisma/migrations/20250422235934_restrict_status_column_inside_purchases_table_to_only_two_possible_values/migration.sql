/*
  Warnings:

  - The `status` column on the `purchases` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('pendent', 'completed');

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "status",
ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT 'pendent';

-- DropEnum
DROP TYPE "Status";
