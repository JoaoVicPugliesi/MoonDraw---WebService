/*
  Warnings:

  - Added the required column `quantity` to the `pivot_purchases_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pivot_purchases_products" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "image_id" TEXT NOT NULL;
