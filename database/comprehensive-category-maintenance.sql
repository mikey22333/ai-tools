-- Comprehensive category tool count maintenance script
-- This handles various edge cases that can cause count mismatches

-- Step 1: Check for orphaned tools (tools with invalid category_id)
SELECT 
    'Orphaned tools check' as check_type,
    COUNT(*) as count
FROM tools t
LEFT JOIN categories c ON t.category_id = c.id
WHERE c.id IS NULL;

-- Step 2: Check for duplicate tools in same category
SELECT 
    'Duplicate tools check' as check_type,
    category_id,
    name,
    COUNT(*) as duplicates
FROM tools
GROUP BY category_id, name
HAVING COUNT(*) > 1;

-- Step 3: Clean up any NULL or empty category_id values
UPDATE tools 
SET category_id = 'other' 
WHERE category_id IS NULL OR category_id = '';

-- Step 4: Ensure 'other' category exists
INSERT INTO categories (id, name, description, icon, color, tool_count)
VALUES ('other', 'Other', 'Other AI tools and services', '🔧', '#6B7280', 0)
ON CONFLICT (id) DO NOTHING;

-- Step 5: Update all category tool counts
UPDATE categories 
SET tool_count = (
    SELECT COUNT(DISTINCT t.id) 
    FROM tools t 
    WHERE t.category_id = categories.id
);

-- Step 6: Remove categories with zero tools (except essential ones)
DELETE FROM categories 
WHERE tool_count = 0 
AND id NOT IN (
    'writing-editing', 
    'image-generation', 
    'coding-development', 
    'business-management', 
    'marketing-advertising',
    'other'
);

-- Step 7: Final verification report
SELECT 
    '=== CATEGORY TOOL COUNT REPORT ===' as report_section,
    NULL as category_id,
    NULL as category_name,
    NULL as tool_count,
    NULL as actual_count,
    NULL as status
UNION ALL
SELECT 
    'Data' as report_section,
    c.id,
    c.name,
    c.tool_count::text,
    COUNT(t.id)::text,
    CASE 
        WHEN c.tool_count = COUNT(t.id) THEN '✓'
        ELSE '✗ MISMATCH'
    END
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY report_section, c.name;

-- Step 8: Summary statistics
SELECT 
    'SUMMARY' as section,
    COUNT(*) as total_categories,
    SUM(tool_count) as total_tools_in_categories,
    (SELECT COUNT(*) FROM tools) as actual_total_tools
FROM categories;
