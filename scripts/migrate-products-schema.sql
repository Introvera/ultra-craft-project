-- Migration: products table — replace categories array with main_category + sub_type
-- Run this once (e.g. psql $DATABASE_URL -f scripts/migrate-products-schema.sql)

-- Remove old categories column
ALTER TABLE products DROP COLUMN IF EXISTS categories;

-- Add new columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS main_category text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sub_type text;

-- Optional: add constraint so main_category is required for new rows
-- ALTER TABLE products ALTER COLUMN main_category SET NOT NULL;
