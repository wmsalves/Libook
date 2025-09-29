-- CreateEnum
CREATE TYPE "public"."ReadingStatus" AS ENUM ('WANT_TO_READ', 'READING', 'READ');

-- CreateTable
CREATE TABLE "public"."ReadingList" (
    "id" TEXT NOT NULL,
    "status" "public"."ReadingStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "ReadingList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingList_userId_bookId_key" ON "public"."ReadingList"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "public"."ReadingList" ADD CONSTRAINT "ReadingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReadingList" ADD CONSTRAINT "ReadingList_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
