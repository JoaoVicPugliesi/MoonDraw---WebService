-- CreateTable
CREATE TABLE "pivot_carts_products" (
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "pivot_carts_products_pkey" PRIMARY KEY ("cart_id","product_id")
);

-- AddForeignKey
ALTER TABLE "pivot_carts_products" ADD CONSTRAINT "pivot_carts_products_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pivot_carts_products" ADD CONSTRAINT "pivot_carts_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
