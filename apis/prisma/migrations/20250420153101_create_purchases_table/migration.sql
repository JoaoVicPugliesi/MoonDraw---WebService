/*
  Warnings:

  - You are about to drop the column `desc` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `carts_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendent', 'completed', 'canceled');

-- DropForeignKey
ALTER TABLE "carts_products" DROP CONSTRAINT "carts_products_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "carts_products" DROP CONSTRAINT "carts_products_product_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "desc",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No Description';

-- DropTable
DROP TABLE "carts_products";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendent',

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("public_id")
);

-- CreateTable
CREATE TABLE "pivot_carts_products" (
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "pivot_carts_products_pkey" PRIMARY KEY ("cart_id","product_id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pivot_carts_products" ADD CONSTRAINT "pivot_carts_products_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pivot_carts_products" ADD CONSTRAINT "pivot_carts_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
