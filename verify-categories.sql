-- VERIFY CURRENT CATEGORY ASSIGNMENTS
-- This script checks the current state of tool categories

-- Show current distribution
SELECT 'CURRENT_DISTRIBUTION' as check_type, 
  c.id as category_id, 
  c.name as category_name, 
  c.tool_count as stored_count,
  COUNT(t.id) as actual_count,
  CASE 
    WHEN c.tool_count = COUNT(t.id) THEN 'MATCHES'
    ELSE 'MISMATCH'
  END as status
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY actual_count DESC;

-- Show tools with potentially wrong categories (sample)
SELECT 'SAMPLE_MISMATCHED_TOOLS' as check_type,
  t.id,
  t.name,
  t.category_id,
  c.name as current_category_name,
  LEFT(t.description, 100) as description_sample
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
WHERE (
  -- Image tools in wrong categories
  (LOWER(t.name) LIKE '%image%' OR LOWER(t.description) LIKE '%image%') AND t.category_id NOT IN ('image-analysis', 'image-generation-editing')
  OR
  -- Coding tools in wrong categories
  (LOWER(t.name) LIKE '%code%' OR LOWER(t.description) LIKE '%coding%' OR LOWER(t.description) LIKE '%development%') AND t.category_id != 'coding-development'
  OR
  -- Writing tools in wrong categories
  (LOWER(t.name) LIKE '%writing%' OR LOWER(t.description) LIKE '%writing%' OR LOWER(t.description) LIKE '%content%') AND t.category_id != 'writing-editing'
)
LIMIT 20;

-- Count total tools
SELECT 'TOTAL_TOOLS' as check_type, COUNT(*) as total_count FROM tools;
