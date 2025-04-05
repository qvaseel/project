-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "attend" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "schedule" ADD COLUMN     "order_number" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
