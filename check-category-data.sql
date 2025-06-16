-- COMPREHENSIVE CATEGORY MISMATCH ANALYSIS
-- This will identify the systematic issue affecting most categories

-- 1. Show ALL categories with their stored vs actual tool counts
SELECT 
  c.id as category_id,
  c.name as category_name,
  c.tool_count as stored_count,
  COUNT(t.id) as actual_count,
  CASE 
    WHEN COUNT(t.id) = 0 AND c.tool_count > 0 THEN 'MAJOR MISMATCH - No tools found'
    WHEN c.tool_count - COUNT(t.id) > 50 THEN 'LARGE MISMATCH'
    WHEN c.tool_count - COUNT(t.id) > 0 THEN 'SMALL MISMATCH'
    ELSE 'OK'
  END as status
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY (c.tool_count - COUNT(t.id)) DESC;

-- 2. Show ALL unique category_id values used in tools table
SELECT 
  category_id, 
  COUNT(*) as tool_count,
  'Tools table' as source
FROM tools 
GROUP BY category_id
ORDER BY tool_count DESC;

-- 3. Show ALL category IDs from categories table
SELECT 
  id as category_id, 
  tool_count,
  'Categories table' as source
FROM categories 
ORDER BY tool_count DESC;

-- 4. Find orphaned tools (tools with category_id not in categories table)
SELECT 
  'ORPHANED TOOLS' as issue_type,
  t.category_id,
  COUNT(*) as tool_count,
  STRING_AGG(t.name, ', ') as sample_tools
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
WHERE c.id IS NULL
GROUP BY t.category_id;

-- 5. Find empty categories (categories with no matching tools)
SELECT 
  'EMPTY CATEGORIES' as issue_type,
  c.id as category_id,
  c.name,
  c.tool_count as claimed_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
HAVING COUNT(t.id) = 0 AND c.tool_count > 0;

-- 6. Check for pattern mismatches (dash vs underscore, etc)
SELECT 
  'PATTERN ANALYSIS' as analysis_type,
  category_id,
  COUNT(*) as tools_using_this_id
FROM tools
GROUP BY category_id
ORDER BY category_id;
