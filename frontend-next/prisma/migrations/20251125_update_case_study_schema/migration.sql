-- AlterTable: Add new columns with defaults
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "description" TEXT NOT NULL DEFAULT '';
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "content" TEXT;
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "industry" TEXT NOT NULL DEFAULT 'Tecnologia';
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "date" TEXT NOT NULL DEFAULT '';
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "metaKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "metrics" JSONB;

-- Migrate existing data
UPDATE "case_studies"
SET
  "description" = COALESCE("challenge", ''),
  "date" = TO_CHAR("createdAt", 'YYYY-MM-DD'),
  "results" = CASE
    WHEN "result" IS NOT NULL THEN ARRAY["result"]::TEXT[]
    ELSE ARRAY[]::TEXT[]
  END
WHERE "description" = '' OR "date" = '';

-- Make solution optional (already is TEXT in schema)
ALTER TABLE "case_studies" ALTER COLUMN "solution" DROP NOT NULL;

-- Drop old columns that are no longer used
ALTER TABLE "case_studies" DROP COLUMN IF EXISTS "result";
ALTER TABLE "case_studies" DROP COLUMN IF EXISTS "metric";

-- Update deliverables default if needed
ALTER TABLE "case_studies" ALTER COLUMN "deliverables" SET DEFAULT ARRAY[]::TEXT[];

-- Add index for featured
CREATE INDEX IF NOT EXISTS "case_studies_featured_idx" ON "case_studies"("featured");
