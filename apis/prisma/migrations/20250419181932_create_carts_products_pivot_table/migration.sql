-- AlterTable
ALTER TABLE "products" ALTER COLUMN "desc" SET DEFAULT 'No Description';

-- CreateTable
CREATE TABLE "carts_products" (
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "carts_products_pkey" PRIMARY KEY ("cart_id","product_id")
);

-- CreateIndex
CREATE INDEX "products_name_public_id_idx" ON "products"("name", "public_id");

-- CreateIndex
CREATE INDEX "users_email_public_id_idx" ON "users"("email", "public_id");

-- AddForeignKey
ALTER TABLE "carts_products" ADD CONSTRAINT "carts_products_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts_products" ADD CONSTRAINT "carts_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
