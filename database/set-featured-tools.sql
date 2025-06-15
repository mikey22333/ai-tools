-- Featured Tools Management
-- This script manages the featured section with exactly 18 tools maximum
-- Ensures a good distribution across different categories

-- First, reset all featured tools
UPDATE tools SET featured = false;

-- Set exactly 18 tools as featured across different categories
UPDATE tools SET featured = true WHERE id IN (
  -- AI Assistants & Chat (3 tools)
  'chatgpt',
  'claude',
  'gemini',
  
  -- Art & Creative Design (5 tools)
  'midjourney',
  'dalle-2',
  'stable-diffusion',
  'runway-ml',
  'remove-bg',
  
  -- Coding & Development (3 tools)
  'github-copilot',
  'cursor',
  'replit',
  
  -- Writing & Editing (2 tools)
  'grammarly',
  'jasper',
  
  -- Productivity & Business (2 tools)
  'notion-ai',
  'clickup',
  
  -- Video & Audio (1 tool)
  'elevenlabs',
  
  -- Research & Analysis (1 tool)
  'perplexity',
  
  -- Automation (1 tool)
  'zapier'
);

-- Verify the featured tools count and distribution
SELECT 
  'Total Featured Tools' as metric,
  COUNT(*) as count
FROM tools 
WHERE featured = true

UNION ALL

SELECT 
  c.name as metric,
  COUNT(t.id) as count
FROM tools t
JOIN categories c ON t.category_id = c.id
WHERE t.featured = true
GROUP BY c.name, c.id
ORDER BY count DESC;

-- Show all featured tools with their details
SELECT 
  t.name,
  c.name as category,
  t.pricing,
  t.trending,
  ARRAY_TO_STRING(t.tags, ', ') as tags
FROM tools t
JOIN categories c ON t.category_id = c.id
WHERE t.featured = true
ORDER BY c.name, t.name;
