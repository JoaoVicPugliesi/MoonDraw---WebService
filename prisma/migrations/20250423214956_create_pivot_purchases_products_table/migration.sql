-- CreateTable
CREATE TABLE "pivot_purchases_products" (
    "purchase_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "pivot_purchases_products_pkey" PRIMARY KEY ("purchase_id","product_id")
);

-- AddForeignKey
ALTER TABLE "pivot_purchases_products" ADD CONSTRAINT "pivot_purchases_products_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pivot_purchases_products" ADD CONSTRAINT "pivot_purchases_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
