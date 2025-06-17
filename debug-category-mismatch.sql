-- Fix category ID mismatches
-- This script will check and fix tools that have incorrect category assignments

-- First, let's see what category IDs exist
SELECT id, name FROM categories ORDER BY name;

-- Check for tools with 'health-wellness' category that should be in 'image-analysis'
SELECT t.id, t.name, t.category_id, c.name as category_name
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.category_id = 'health-wellness'
AND (
  LOWER(t.name) LIKE '%image%' 
  OR LOWER(t.description) LIKE '%image analysis%'
  OR LOWER(t.description) LIKE '%computer vision%'
  OR LOWER(t.description) LIKE '%visual recognition%'
)
LIMIT 20;

-- Check what tools are actually assigned to image-analysis category
SELECT COUNT(*) as tool_count, category_id 
FROM tools 
WHERE category_id = 'image-analysis'
GROUP BY category_id;

-- Check what tools are in health-wellness that might belong elsewhere
SELECT t.name, t.description, t.category_id
FROM tools t
WHERE t.category_id = 'health-wellness'
AND (
  LOWER(t.name) LIKE '%image%' 
  OR LOWER(t.name) LIKE '%vision%'
  OR LOWER(t.name) LIKE '%photo%'
  OR LOWER(t.description) LIKE '%image%'
)
LIMIT 10;
