/*
  Warnings:

  - You are about to drop the `pivot_carts_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pivot_carts_products" DROP CONSTRAINT "pivot_carts_products_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "pivot_carts_products" DROP CONSTRAINT "pivot_carts_products_product_id_fkey";

-- DropTable
DROP TABLE "pivot_carts_products";

-- CreateTable
CREATE TABLE "carts_products_pivot" (
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "carts_products_pivot_pkey" PRIMARY KEY ("cart_id","product_id")
);

-- CreateTable
CREATE TABLE "purchases_products_pivot" (
    "purchase_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "purchases_products_pivot_pkey" PRIMARY KEY ("purchase_id","product_id")
);

-- AddForeignKey
ALTER TABLE "carts_products_pivot" ADD CONSTRAINT "carts_products_pivot_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_products_pivot" ADD CONSTRAINT "carts_products_pivot_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases_products_pivot" ADD CONSTRAINT "purchases_products_pivot_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases_products_pivot" ADD CONSTRAINT "purchases_products_pivot_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
