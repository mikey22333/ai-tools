-- Quick fix for category tool counts
-- This will update all category tool_count fields to match actual tool counts in database

UPDATE categories 
SET tool_count = (
    SELECT COUNT(*) 
    FROM tools 
    WHERE tools.category_id = categories.id
);

-- Show the results to verify
SELECT 
    id,
    name,
    tool_count as updated_count
FROM categories
WHERE tool_count > 0
ORDER BY tool_count DESC;
