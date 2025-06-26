-- COMPREHENSIVE CATEGORY FIX SCRIPT
-- This script will fix all category assignments and update counts

-- First, show current state
SELECT 'BEFORE_FIX' as status, category_id, COUNT(*) as tool_count
FROM tools
GROUP BY category_id
ORDER BY tool_count DESC;

-- Update Art & Creative tools (currently many tools are misassigned to this category)
UPDATE tools 
SET category_id = 'image-generation-editing'
WHERE category_id = 'art-creative'
AND (
  LOWER(name) LIKE '%image%' OR
  LOWER(name) LIKE '%photo%' OR
  LOWER(name) LIKE '%art%' OR
  LOWER(name) LIKE '%design%' OR
  LOWER(description) LIKE '%image%' OR
  LOWER(description) LIKE '%photo%' OR
  LOWER(description) LIKE '%visual%' OR
  LOWER(description) LIKE '%create%' OR
  LOWER(description) LIKE '%generate%'
);

-- Fix specific category assignments based on tool content
-- Image Analysis tools
UPDATE tools 
SET category_id = 'image-analysis'
WHERE (
  LOWER(name) LIKE '%analyze%' OR
  LOWER(name) LIKE '%detection%' OR
  LOWER(name) LIKE '%recognition%' OR
  LOWER(name) LIKE '%computer vision%' OR
  LOWER(description) LIKE '%analyze%' OR
  LOWER(description) LIKE '%detect%' OR  
  LOWER(description) LIKE '%recognition%' OR
  LOWER(description) LIKE '%computer vision%' OR
  LOWER(description) LIKE '%image analysis%'
) AND category_id != 'image-analysis';

-- Image Generation & Editing tools  
UPDATE tools 
SET category_id = 'image-generation-editing'
WHERE (
  LOWER(name) LIKE '%generate%' OR
  LOWER(name) LIKE '%create%' OR
  LOWER(name) LIKE '%edit%' OR
  LOWER(name) LIKE '%design%' OR
  LOWER(name) LIKE '%ai art%' OR
  LOWER(name) LIKE '%dalle%' OR
  LOWER(name) LIKE '%midjourney%' OR
  LOWER(name) LIKE '%stable diffusion%' OR
  LOWER(description) LIKE '%generate%' OR
  LOWER(description) LIKE '%create%' OR
  LOWER(description) LIKE '%edit%' OR
  LOWER(description) LIKE '%design%' OR
  LOWER(description) LIKE '%ai art%'
) AND category_id NOT IN ('image-generation-editing', 'image-analysis');

-- Writing & Editing tools
UPDATE tools 
SET category_id = 'writing-editing'
WHERE (
  LOWER(name) LIKE '%write%' OR
  LOWER(name) LIKE '%content%' OR
  LOWER(name) LIKE '%copy%' OR
  LOWER(name) LIKE '%grammar%' OR
  LOWER(name) LIKE '%text%' OR
  LOWER(description) LIKE '%write%' OR
  LOWER(description) LIKE '%content%' OR
  LOWER(description) LIKE '%copy%' OR
  LOWER(description) LIKE '%grammar%' OR
  LOWER(description) LIKE '%text%'
) AND category_id != 'writing-editing';

-- Coding & Development tools
UPDATE tools 
SET category_id = 'coding-development'
WHERE (
  LOWER(name) LIKE '%code%' OR
  LOWER(name) LIKE '%dev%' OR
  LOWER(name) LIKE '%program%' OR
  LOWER(name) LIKE '%github%' OR
  LOWER(name) LIKE '%api%' OR
  LOWER(description) LIKE '%code%' OR
  LOWER(description) LIKE '%dev%' OR
  LOWER(description) LIKE '%program%' OR
  LOWER(description) LIKE '%software%' OR
  LOWER(description) LIKE '%github%'
) AND category_id != 'coding-development';

-- Chatbots & Virtual Companions
UPDATE tools 
SET category_id = 'chatbots-virtual-companions'
WHERE (
  LOWER(name) LIKE '%chat%' OR
  LOWER(name) LIKE '%bot%' OR
  LOWER(name) LIKE '%assistant%' OR
  LOWER(name) LIKE '%companion%' OR
  LOWER(description) LIKE '%chat%' OR
  LOWER(description) LIKE '%bot%' OR
  LOWER(description) LIKE '%assistant%' OR
  LOWER(description) LIKE '%conversation%'
) AND category_id != 'chatbots-virtual-companions';

-- Video & Animation tools
UPDATE tools 
SET category_id = 'video-animation'
WHERE (
  LOWER(name) LIKE '%video%' OR
  LOWER(name) LIKE '%animation%' OR
  LOWER(name) LIKE '%motion%' OR
  LOWER(name) LIKE '%movie%' OR
  LOWER(description) LIKE '%video%' OR
  LOWER(description) LIKE '%animation%' OR
  LOWER(description) LIKE '%motion%' OR
  LOWER(description) LIKE '%film%'
) AND category_id != 'video-animation';

-- Music & Audio tools
UPDATE tools 
SET category_id = 'music-audio'
WHERE (
  LOWER(name) LIKE '%music%' OR
  LOWER(name) LIKE '%audio%' OR
  LOWER(name) LIKE '%sound%' OR
  LOWER(name) LIKE '%voice%' OR
  LOWER(description) LIKE '%music%' OR
  LOWER(description) LIKE '%audio%' OR
  LOWER(description) LIKE '%sound%' OR
  LOWER(description) LIKE '%voice%'
) AND category_id NOT IN ('music-audio', 'voice-generation-conversion');

-- Voice Generation & Conversion
UPDATE tools 
SET category_id = 'voice-generation-conversion'
WHERE (
  LOWER(name) LIKE '%voice%' OR
  LOWER(name) LIKE '%speech%' OR
  LOWER(name) LIKE '%tts%' OR
  LOWER(name) LIKE '%text to speech%' OR
  LOWER(description) LIKE '%voice%' OR
  LOWER(description) LIKE '%speech%' OR
  LOWER(description) LIKE '%text to speech%' OR
  LOWER(description) LIKE '%voice generation%'
) AND category_id != 'voice-generation-conversion';

-- Marketing & Advertising tools
UPDATE tools 
SET category_id = 'marketing-advertising'
WHERE (
  LOWER(name) LIKE '%marketing%' OR
  LOWER(name) LIKE '%advertising%' OR
  LOWER(name) LIKE '%seo%' OR
  LOWER(name) LIKE '%campaign%' OR
  LOWER(description) LIKE '%marketing%' OR
  LOWER(description) LIKE '%advertising%' OR
  LOWER(description) LIKE '%seo%' OR
  LOWER(description) LIKE '%campaign%'
) AND category_id NOT IN ('marketing-advertising', 'social-media');

-- Social Media tools
UPDATE tools 
SET category_id = 'social-media'
WHERE (
  LOWER(name) LIKE '%social%' OR
  LOWER(name) LIKE '%instagram%' OR
  LOWER(name) LIKE '%twitter%' OR
  LOWER(name) LIKE '%linkedin%' OR
  LOWER(name) LIKE '%facebook%' OR
  LOWER(description) LIKE '%social media%' OR
  LOWER(description) LIKE '%instagram%' OR
  LOWER(description) LIKE '%twitter%' OR
  LOWER(description) LIKE '%social%'
) AND category_id != 'social-media';

-- Business Management tools
UPDATE tools 
SET category_id = 'business-management'
WHERE (
  LOWER(name) LIKE '%business%' OR
  LOWER(name) LIKE '%management%' OR
  LOWER(name) LIKE '%productivity%' OR
  LOWER(name) LIKE '%workflow%' OR
  LOWER(name) LIKE '%project%' OR
  LOWER(description) LIKE '%business%' OR
  LOWER(description) LIKE '%management%' OR
  LOWER(description) LIKE '%productivity%' OR
  LOWER(description) LIKE '%workflow%'
) AND category_id NOT IN ('business-management', 'business-research', 'office-productivity');

-- Office Productivity tools
UPDATE tools 
SET category_id = 'office-productivity'
WHERE (
  LOWER(name) LIKE '%office%' OR
  LOWER(name) LIKE '%document%' OR
  LOWER(name) LIKE '%spreadsheet%' OR
  LOWER(name) LIKE '%presentation%' OR
  LOWER(description) LIKE '%office%' OR
  LOWER(description) LIKE '%document%' OR
  LOWER(description) LIKE '%spreadsheet%' OR
  LOWER(description) LIKE '%presentation%'
) AND category_id != 'office-productivity';

-- Update all category tool counts
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE tools.category_id = categories.id
);

-- Show final distribution
SELECT 'AFTER_FIX' as status, 
  c.id as category_id, 
  c.name as category_name, 
  c.tool_count as updated_count,
  COUNT(t.id) as actual_count
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY actual_count DESC;

-- Show any remaining tools with null categories
SELECT 'NULL_CATEGORIES' as status, COUNT(*) as count_with_null_category
FROM tools 
WHERE category_id IS NULL;
