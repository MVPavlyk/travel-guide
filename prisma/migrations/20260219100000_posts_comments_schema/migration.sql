-- AlterTable Post: name -> title, add content (preserve existing row)
ALTER TABLE "Post" ADD COLUMN "title" TEXT;
ALTER TABLE "Post" ADD COLUMN "content" TEXT;
UPDATE "Post" SET "title" = "name", "content" = COALESCE("name", '');
ALTER TABLE "Post" ALTER COLUMN "title" SET NOT NULL, ALTER COLUMN "content" SET NOT NULL;
ALTER TABLE "Post" DROP COLUMN "name";

-- Update Post FK to CASCADE
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop old index, add new
DROP INDEX IF EXISTS "Post_name_idx";
CREATE INDEX "Post_title_idx" ON "Post"("title");

-- CreateTable Comment
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey Comment -> Post, User
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
