-- FIX TOOLS TABLE CATEGORY IDS
-- The tools table still has wrong category_id values - let's fix them

-- First, let's see what tools are actually in image-analysis category
SELECT 'CURRENT TOOLS IN IMAGE-ANALYSIS' as info, COUNT(*) as count
FROM tools WHERE category_id = 'image-analysis';

-- Check what tools should be in image-analysis based on their names/descriptions
SELECT 'TOOLS THAT SHOULD BE IMAGE-ANALYSIS' as info, 
       t.id, t.name, t.category_id as current_category
FROM tools t
WHERE (
  LOWER(t.name) LIKE '%image%' OR
  LOWER(t.name) LIKE '%vision%' OR
  LOWER(t.name) LIKE '%photo%' OR
  LOWER(t.name) LIKE '%visual%' OR
  LOWER(t.description) LIKE '%image analysis%' OR
  LOWER(t.description) LIKE '%computer vision%' OR
  LOWER(t.description) LIKE '%visual recognition%' OR
  LOWER(t.description) LIKE '%image processing%' OR
  LOWER(t.description) LIKE '%object detection%' OR
  LOWER(t.description) LIKE '%face recognition%'
)
AND t.category_id != 'image-analysis'
LIMIT 20;

-- Update tools to correct category IDs based on their content
-- Image Analysis tools
UPDATE tools 
SET category_id = 'image-analysis'
WHERE (
  LOWER(name) LIKE '%image%' OR
  LOWER(name) LIKE '%vision%' OR  
  LOWER(name) LIKE '%visual%' OR
  LOWER(description) LIKE '%image analysis%' OR
  LOWER(description) LIKE '%computer vision%' OR
  LOWER(description) LIKE '%visual recognition%' OR
  LOWER(description) LIKE '%image processing%' OR
  LOWER(description) LIKE '%object detection%' OR
  LOWER(description) LIKE '%face recognition%'
)
AND category_id != 'image-analysis';

-- Business Management tools
UPDATE tools 
SET category_id = 'business-management'
WHERE (
  LOWER(name) LIKE '%business%' OR
  LOWER(name) LIKE '%management%' OR
  LOWER(name) LIKE '%enterprise%' OR
  LOWER(description) LIKE '%business management%' OR
  LOWER(description) LIKE '%project management%' OR
  LOWER(description) LIKE '%team management%'
)
AND category_id != 'business-management'
AND category_id != 'business-research';

-- Marketing & Advertising tools  
UPDATE tools 
SET category_id = 'marketing-advertising'
WHERE (
  LOWER(name) LIKE '%marketing%' OR
  LOWER(name) LIKE '%advertising%' OR
  LOWER(name) LIKE '%campaign%' OR
  LOWER(description) LIKE '%marketing%' OR
  LOWER(description) LIKE '%advertising%' OR
  LOWER(description) LIKE '%social media marketing%'
)
AND category_id != 'marketing-advertising'
AND category_id != 'social-media';

-- Update category tool counts after fixing
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE tools.category_id = categories.id
);

-- Verify the fix
SELECT 'VERIFICATION - Image Analysis tools count' as result,
       COUNT(*) as tools_found
FROM tools 
WHERE category_id = 'image-analysis';

SELECT 'SAMPLE IMAGE ANALYSIS TOOLS' as result,
       name, category_id
FROM tools 
WHERE category_id = 'image-analysis'
LIMIT 10;
