-- Debug script to understand the tool-category mapping issue

-- 1. Check a sample of tools and their category_id values
SELECT 
    id,
    name,
    category_id,
    rating,
    views
FROM tools 
WHERE category_id IS NOT NULL 
ORDER BY rating DESC 
LIMIT 10;

-- 2. Check what category IDs exist in the categories table
SELECT 
    id,
    name,
    tool_count
FROM categories 
ORDER BY name;

-- 3. Check for any tools with NULL or invalid category_id
SELECT 
    COUNT(*) as total_tools,
    COUNT(CASE WHEN category_id IS NULL THEN 1 END) as null_category_tools,
    COUNT(CASE WHEN category_id IS NOT NULL THEN 1 END) as valid_category_tools
FROM tools;

-- 4. Check the most common category_id values in tools
SELECT 
    category_id,
    COUNT(*) as tool_count,
    c.name as category_name
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
GROUP BY category_id, c.name
ORDER BY tool_count DESC
LIMIT 20;

-- 5. Check for category_id mismatches
SELECT 
    t.category_id,
    COUNT(*) as tools_with_this_category,
    c.name as category_name_if_exists
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.category_id IS NOT NULL
GROUP BY t.category_id, c.name
HAVING c.name IS NULL
ORDER BY tools_with_this_category DESC;
