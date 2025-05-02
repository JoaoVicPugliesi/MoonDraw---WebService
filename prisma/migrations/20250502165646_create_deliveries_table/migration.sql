/*
  Warnings:

  - You are about to drop the column `user_id` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `refresh_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[owner_id]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('Processing', 'Delivering', 'Delivered');

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_fkey";

-- DropIndex
DROP INDEX "carts_user_id_key";

-- DropIndex
DROP INDEX "refresh_tokens_user_id_key";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "deliveries" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "purchase_id" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'Processing',
    "recipient_name" TEXT NOT NULL,
    "recipient_email" TEXT NOT NULL,
    "recipient_phone" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "postal_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tracking_number" TEXT,
    "carrier" TEXT,
    "tracking_url" TEXT,
    "delivery_instructions" JSONB,
    "delivered_at" TIMESTAMP(3),

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("public_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_buyer_id_key" ON "deliveries"("buyer_id");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_purchase_id_key" ON "deliveries"("purchase_id");

-- CreateIndex
CREATE UNIQUE INDEX "carts_owner_id_key" ON "carts"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_owner_id_key" ON "refresh_tokens"("owner_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
