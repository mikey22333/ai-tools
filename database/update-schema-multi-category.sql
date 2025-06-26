-- Updated schema to allow tools in multiple categories
-- This removes the unique constraint on tool id and uses a composite primary key

-- Drop existing constraints if they exist
ALTER TABLE IF EXISTS tools DROP CONSTRAINT IF EXISTS tools_pkey;

-- Modify the tools table to allow the same tool in multiple categories
ALTER TABLE tools DROP CONSTRAINT IF EXISTS tools_pkey;
ALTER TABLE tools ADD CONSTRAINT tools_pkey PRIMARY KEY (id, category_id);

-- Alternative: If you prefer to keep it simple, you can just drop the primary key
-- and use a regular index instead:
-- DROP INDEX IF EXISTS tools_pkey;
-- CREATE INDEX idx_tools_id_category ON tools(id, category_id);

-- Note: This change allows the same tool (same id) to exist in multiple categories
-- For example, 'midjourney' can exist in both 'art-creative-design' and 'ai-detection'
