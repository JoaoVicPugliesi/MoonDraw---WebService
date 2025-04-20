/*
  Warnings:

  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_user_id_fkey";

-- DropTable
DROP TABLE "Purchase";

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendent',

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("public_id")
);

-- CreateTable
CREATE TABLE "pivot_purchases_products" (
    "purchase_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "pivot_purchases_products_pkey" PRIMARY KEY ("purchase_id","product_id")
);

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pivot_purchases_products" ADD CONSTRAINT "pivot_purchases_products_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pivot_purchases_products" ADD CONSTRAINT "pivot_purchases_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
