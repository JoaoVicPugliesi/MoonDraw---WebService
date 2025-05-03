-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "images_id" TEXT[],
    "artist_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'No Description',
    "price" INTEGER NOT NULL DEFAULT 0,
    "supply" INTEGER NOT NULL DEFAULT 0,
    "publisher" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("public_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_image_ids_key" ON "products"("images_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_artist_id_key" ON "products"("artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_name_public_id_artist_id_idx" ON "products"("name", "public_id", "artist_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "users"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;
