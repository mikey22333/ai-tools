-- Fix category tool counts by recalculating actual tool counts
-- This script will update all categories with the correct number of tools

-- First, let's see the current state (for debugging)
SELECT 
    c.id,
    c.name,
    c.tool_count as current_count,
    COUNT(t.id) as actual_count,
    (c.tool_count - COUNT(t.id)) as difference
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY difference DESC;

-- Update all category tool counts with actual counts
UPDATE categories 
SET tool_count = (
    SELECT COUNT(*) 
    FROM tools 
    WHERE tools.category_id = categories.id
);

-- Verify the update worked correctly
SELECT 
    c.id,
    c.name,
    c.tool_count as updated_count,
    COUNT(t.id) as actual_count,
    CASE 
        WHEN c.tool_count = COUNT(t.id) THEN '✓ Match'
        ELSE '✗ Mismatch'
    END as status
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY c.name;

-- Show summary
SELECT 
    'Category tool counts updated successfully' as status,
    COUNT(*) as categories_updated
FROM categories;
