-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'USER');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable: blog_posts - Add new columns with defaults/nullable first
ALTER TABLE "blog_posts"
  ADD COLUMN IF NOT EXISTS "slug" TEXT,
  ADD COLUMN IF NOT EXISTS "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "status" "PostStatus" DEFAULT 'PUBLISHED',
  ADD COLUMN IF NOT EXISTS "authorId" TEXT,
  ADD COLUMN IF NOT EXISTS "metaTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "metaDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "metaKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);

-- Populate slug from title (create unique slugs)
UPDATE "blog_posts"
SET "slug" = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || SUBSTRING(id FROM 1 FOR 8)
WHERE "slug" IS NULL;

-- Get first admin user ID or create a default one
DO $$
DECLARE
  admin_user_id TEXT;
BEGIN
  -- Try to get existing admin user
  SELECT id INTO admin_user_id FROM users WHERE email = 'admin@andorinha.com' LIMIT 1;

  -- If no admin user exists, use the first user or a placeholder
  IF admin_user_id IS NULL THEN
    SELECT id INTO admin_user_id FROM users LIMIT 1;
  END IF;

  -- Update authorId with the admin user id
  IF admin_user_id IS NOT NULL THEN
    UPDATE "blog_posts" SET "authorId" = admin_user_id WHERE "authorId" IS NULL;
  END IF;
END $$;

-- Now make slug and authorId required
ALTER TABLE "blog_posts"
  ALTER COLUMN "slug" SET NOT NULL,
  ALTER COLUMN "status" SET NOT NULL,
  ALTER COLUMN "authorId" SET NOT NULL;

-- Change id to use cuid() for new records (existing keep their id)
ALTER TABLE "blog_posts"
  ALTER COLUMN "id" DROP DEFAULT;

-- Make content a TEXT type
ALTER TABLE "blog_posts"
  ALTER COLUMN "content" TYPE TEXT;

-- AlterTable: case_studies - Same process
ALTER TABLE "case_studies"
  ADD COLUMN IF NOT EXISTS "slug" TEXT,
  ADD COLUMN IF NOT EXISTS "status" "PostStatus" DEFAULT 'PUBLISHED',
  ADD COLUMN IF NOT EXISTS "authorId" TEXT,
  ADD COLUMN IF NOT EXISTS "metaTitle" TEXT,
  ADD COLUMN IF NOT EXISTS "metaDescription" TEXT,
  ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);

-- Populate slug from title for case_studies
UPDATE "case_studies"
SET "slug" = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')) || '-' || SUBSTRING(id FROM 1 FOR 8)
WHERE "slug" IS NULL;

-- Update authorId for case_studies
DO $$
DECLARE
  admin_user_id TEXT;
BEGIN
  SELECT id INTO admin_user_id FROM users WHERE email = 'admin@andorinha.com' LIMIT 1;

  IF admin_user_id IS NULL THEN
    SELECT id INTO admin_user_id FROM users LIMIT 1;
  END IF;

  IF admin_user_id IS NOT NULL THEN
    UPDATE "case_studies" SET "authorId" = admin_user_id WHERE "authorId" IS NULL;
  END IF;
END $$;

-- Make required
ALTER TABLE "case_studies"
  ALTER COLUMN "slug" SET NOT NULL,
  ALTER COLUMN "status" SET NOT NULL,
  ALTER COLUMN "authorId" SET NOT NULL;

-- Change id to use cuid()
ALTER TABLE "case_studies"
  ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable: users - Convert role to enum
ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "role_new" "UserRole" DEFAULT 'USER';

-- Migrate existing role values
UPDATE "users"
SET "role_new" = CASE
  WHEN LOWER("role") = 'admin' THEN 'ADMIN'::"UserRole"
  WHEN LOWER("role") = 'editor' THEN 'EDITOR'::"UserRole"
  ELSE 'USER'::"UserRole"
END;

-- Drop old column and rename new one
ALTER TABLE "users" DROP COLUMN "role";
ALTER TABLE "users" RENAME COLUMN "role_new" TO "role";

-- Make sure role is not null
ALTER TABLE "users"
  ALTER COLUMN "role" SET NOT NULL,
  ALTER COLUMN "role" SET DEFAULT 'USER'::"UserRole";

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_slug_key" ON "blog_posts"("slug");
CREATE INDEX IF NOT EXISTS "blog_posts_status_idx" ON "blog_posts"("status");
CREATE INDEX IF NOT EXISTS "blog_posts_category_idx" ON "blog_posts"("category");
CREATE INDEX IF NOT EXISTS "blog_posts_authorId_idx" ON "blog_posts"("authorId");

CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_slug_key" ON "case_studies"("slug");
CREATE INDEX IF NOT EXISTS "case_studies_status_idx" ON "case_studies"("status");
CREATE INDEX IF NOT EXISTS "case_studies_category_idx" ON "case_studies"("category");
CREATE INDEX IF NOT EXISTS "case_studies_authorId_idx" ON "case_studies"("authorId");

-- AddForeignKey
ALTER TABLE "blog_posts"
  ADD CONSTRAINT "blog_posts_authorId_fkey"
  FOREIGN KEY ("authorId")
  REFERENCES "users"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE "case_studies"
  ADD CONSTRAINT "case_studies_authorId_fkey"
  FOREIGN KEY ("authorId")
  REFERENCES "users"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;
