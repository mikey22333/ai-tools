-- Simple script to fix category tool counts
-- This will update the tool_count field in categories table to match actual tool counts

UPDATE categories 
SET tool_count = (
    SELECT COUNT(*) 
    FROM tools 
    WHERE tools.category_id = categories.id
);

-- Show the results
SELECT 
    id,
    name,
    tool_count as updated_count
FROM categories
ORDER BY tool_count DESC;
