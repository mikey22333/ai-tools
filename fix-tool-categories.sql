-- FIX TOOL CATEGORY ASSIGNMENTS
-- This script will reassign tools to their correct categories based on their names and descriptions

-- First, let's see the current distribution
SELECT 'CURRENT TOOL DISTRIBUTION' as info, category_id, COUNT(*) as tool_count
FROM tools
GROUP BY category_id
ORDER BY tool_count DESC;

-- Update tools to correct categories based on their content
-- Image Analysis tools
UPDATE tools 
SET category_id = 'image-analysis'
WHERE category_id != 'image-analysis'
AND (
  LOWER(name) LIKE '%image analysis%' OR
  LOWER(name) LIKE '%computer vision%' OR
  LOWER(name) LIKE '%visual recognition%' OR
  LOWER(name) LIKE '%image recognition%' OR
  LOWER(name) LIKE '%photo analysis%' OR
  LOWER(description) LIKE '%image analysis%' OR
  LOWER(description) LIKE '%computer vision%' OR
  LOWER(description) LIKE '%visual recognition%' OR
  LOWER(description) LIKE '%analyze images%' OR
  LOWER(description) LIKE '%image processing%'
);

-- Image Generation & Editing tools
UPDATE tools 
SET category_id = 'image-generation-editing'
WHERE category_id != 'image-generation-editing'
AND (
  LOWER(name) LIKE '%image generation%' OR
  LOWER(name) LIKE '%image editing%' OR
  LOWER(name) LIKE '%photo editing%' OR
  LOWER(name) LIKE '%ai art%' OR
  LOWER(name) LIKE '%dalle%' OR
  LOWER(name) LIKE '%midjourney%' OR
  LOWER(name) LIKE '%stable diffusion%' OR
  LOWER(description) LIKE '%generate images%' OR
  LOWER(description) LIKE '%create images%' OR
  LOWER(description) LIKE '%edit photos%' OR
  LOWER(description) LIKE '%ai art%' OR
  LOWER(description) LIKE '%image creation%'
);

-- Writing & Editing tools
UPDATE tools 
SET category_id = 'writing-editing'
WHERE category_id != 'writing-editing'
AND (
  LOWER(name) LIKE '%writing%' OR
  LOWER(name) LIKE '%editor%' OR
  LOWER(name) LIKE '%grammar%' OR
  LOWER(name) LIKE '%copywriting%' OR
  LOWER(name) LIKE '%content%' OR
  LOWER(description) LIKE '%writing%' OR
  LOWER(description) LIKE '%content creation%' OR
  LOWER(description) LIKE '%copywriting%' OR
  LOWER(description) LIKE '%grammar%' OR
  LOWER(description) LIKE '%text generation%'
);

-- Coding & Development tools
UPDATE tools 
SET category_id = 'coding-development'
WHERE category_id != 'coding-development'
AND (
  LOWER(name) LIKE '%code%' OR
  LOWER(name) LIKE '%programming%' OR
  LOWER(name) LIKE '%development%' OR
  LOWER(name) LIKE '%github%' OR
  LOWER(description) LIKE '%coding%' OR
  LOWER(description) LIKE '%programming%' OR
  LOWER(description) LIKE '%development%' OR
  LOWER(description) LIKE '%software%' OR
  LOWER(description) LIKE '%developer%'
);

-- Business Management tools
UPDATE tools 
SET category_id = 'business-management'
WHERE category_id != 'business-management'
AND (
  LOWER(name) LIKE '%business%' OR
  LOWER(name) LIKE '%management%' OR
  LOWER(name) LIKE '%productivity%' OR
  LOWER(name) LIKE '%workflow%' OR
  LOWER(description) LIKE '%business management%' OR
  LOWER(description) LIKE '%project management%' OR
  LOWER(description) LIKE '%team management%' OR
  LOWER(description) LIKE '%workflow%'
) AND category_id NOT IN ('business-research');

-- Marketing & Advertising tools
UPDATE tools 
SET category_id = 'marketing-advertising'
WHERE category_id != 'marketing-advertising'
AND (
  LOWER(name) LIKE '%marketing%' OR
  LOWER(name) LIKE '%advertising%' OR
  LOWER(name) LIKE '%seo%' OR
  LOWER(name) LIKE '%social media%' OR
  LOWER(description) LIKE '%marketing%' OR
  LOWER(description) LIKE '%advertising%' OR
  LOWER(description) LIKE '%promotion%' OR
  LOWER(description) LIKE '%campaign%'
) AND category_id NOT IN ('social-media');

-- Video & Animation tools
UPDATE tools 
SET category_id = 'video-animation'
WHERE category_id != 'video-animation'
AND (
  LOWER(name) LIKE '%video%' OR
  LOWER(name) LIKE '%animation%' OR
  LOWER(name) LIKE '%motion%' OR
  LOWER(description) LIKE '%video%' OR
  LOWER(description) LIKE '%animation%' OR
  LOWER(description) LIKE '%motion graphics%'
);

-- Music & Audio tools
UPDATE tools 
SET category_id = 'music-audio'
WHERE category_id != 'music-audio'
AND (
  LOWER(name) LIKE '%music%' OR
  LOWER(name) LIKE '%audio%' OR
  LOWER(name) LIKE '%sound%' OR
  LOWER(description) LIKE '%music%' OR
  LOWER(description) LIKE '%audio%' OR
  LOWER(description) LIKE '%sound%'
);

-- Update category tool counts
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE tools.category_id = categories.id
);

-- Show final distribution
SELECT 'FINAL DISTRIBUTION' as info, 
  c.id, 
  c.name, 
  c.tool_count,
  COUNT(t.id) as actual_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY c.tool_count DESC;
