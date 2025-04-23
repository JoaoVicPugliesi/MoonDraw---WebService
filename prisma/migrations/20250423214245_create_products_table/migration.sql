-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'No Description',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "supply" INTEGER NOT NULL DEFAULT 0,
    "publisher" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("public_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_image_id_key" ON "products"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_name_public_id_idx" ON "products"("name", "public_id");
