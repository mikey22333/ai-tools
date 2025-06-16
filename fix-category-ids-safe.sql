-- SAFE FIX FOR CATEGORY ID MISMATCHES (NO DELETE)
-- This script will identify and fix category mismatches without deleting anything

-- Step 1: Check current state
SELECT 'CURRENT CATEGORIES TABLE' as info, id, name FROM categories ORDER BY id;

-- Step 2: Check if tools categories already exist in categories table
SELECT 
  'TOOLS CATEGORY IDS STATUS' as info,
  t.category_id,
  COUNT(*) as tool_count,
  CASE 
    WHEN EXISTS (SELECT 1 FROM categories WHERE id = t.category_id) 
    THEN 'EXISTS IN CATEGORIES' 
    ELSE 'MISSING FROM CATEGORIES'
  END as status
FROM tools t
GROUP BY t.category_id
ORDER BY t.category_id;

-- Step 3: Insert missing categories (only the ones that don't exist)
INSERT INTO categories (id, name, description, tool_count)
SELECT DISTINCT 
  t.category_id,
  CASE 
    WHEN t.category_id = 'ai-detection-anti-detection' THEN 'AI Detection & Anti-Detection'
    WHEN t.category_id = 'art-creative-design' THEN 'Art & Creative Design'
    WHEN t.category_id = 'automations' THEN 'Automations'
    WHEN t.category_id = 'business-management' THEN 'Business Management'
    WHEN t.category_id = 'business-research' THEN 'Business Research'
    WHEN t.category_id = 'chatbots-virtual-companions' THEN 'Chatbots & Virtual Companions'
    WHEN t.category_id = 'coding-development' THEN 'Coding & Development'
    WHEN t.category_id = 'daily-life' THEN 'Daily Life'
    WHEN t.category_id = 'education-translation' THEN 'Education & Translation'
    WHEN t.category_id = 'health-wellness' THEN 'Health & Wellness'
    WHEN t.category_id = 'image-analysis' THEN 'Image Analysis'
    WHEN t.category_id = 'image-generation-editing' THEN 'Image Generation & Editing'
    WHEN t.category_id = 'interior-architectural-design' THEN 'Interior & Architectural Design'
    WHEN t.category_id = 'legal-finance' THEN 'Legal & Finance'
    WHEN t.category_id = 'marketing-advertising' THEN 'Marketing & Advertising'
    WHEN t.category_id = 'music-audio' THEN 'Music & Audio'
    WHEN t.category_id = 'office-productivity' THEN 'Office & Productivity'
    WHEN t.category_id = 'research-data-analysis' THEN 'Research & Data Analysis'
    WHEN t.category_id = 'social-media' THEN 'Social Media'
    WHEN t.category_id = 'video-animation' THEN 'Video & Animation'
    WHEN t.category_id = 'voice-generation-conversion' THEN 'Voice Generation & Conversion'
    WHEN t.category_id = 'writing-editing' THEN 'Writing & Editing'
    ELSE INITCAP(REPLACE(t.category_id, '-', ' '))
  END as name,
  'AI tools category',
  0
FROM tools t
WHERE NOT EXISTS (SELECT 1 FROM categories c WHERE c.id = t.category_id);

-- Step 4: Update tool counts for all categories
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE tools.category_id = categories.id
);

-- Step 5: Final verification
SELECT 
  'FINAL RESULT' as status,
  c.id,
  c.name,
  c.tool_count,
  COUNT(t.id) as actual_count,
  CASE 
    WHEN c.tool_count = COUNT(t.id) THEN '✅ FIXED'
    ELSE '❌ MISMATCH'
  END as result
FROM categories c
LEFT JOIN tools t ON c.id = t.category_id
GROUP BY c.id, c.name, c.tool_count
ORDER BY c.tool_count DESC;
