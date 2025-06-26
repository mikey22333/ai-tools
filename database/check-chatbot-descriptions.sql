-- Check tools in Chatbots & Virtual Companions category without descriptions
SELECT name, description 
FROM tools 
WHERE category_id = 'chatbots-virtual-companions' 
AND (description IS NULL OR description = '')
ORDER BY name
LIMIT 10;
