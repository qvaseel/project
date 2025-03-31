-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_group_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
