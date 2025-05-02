-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('Pending', 'Completed');

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "payment_method" TEXT,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("public_id")
);

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("public_id") ON DELETE CASCADE ON UPDATE CASCADE;
