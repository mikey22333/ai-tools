-- Manage Featured Tools (Maximum 18 across all categories)
-- This script helps you control which tools are featured

-- First, check current featured tools count
SELECT 
  COUNT(*) as total_featured_tools,
  STRING_AGG(name, ', ') as featured_tools
FROM tools 
WHERE featured = true;

-- View featured tools by category
SELECT 
  c.name as category,
  COUNT(t.id) as featured_count,
  STRING_AGG(t.name, ', ') as tools
FROM tools t
JOIN categories c ON t.category_id = c.id
WHERE t.featured = true
GROUP BY c.name, c.id
ORDER BY featured_count DESC;

-- If you need to remove some featured tools to stay under 18, use this:
-- UPDATE tools SET featured = false 
-- WHERE id IN ('tool-id-1', 'tool-id-2', 'tool-id-3');

-- Recommended featured tools (18 max across all categories):
-- 1. ChatGPT (AI Assistants)
-- 2. Midjourney (Art & Creative Design) 
-- 3. GitHub Copilot (Coding & Development)
-- 4. Grammarly (Writing & Editing)
-- 5. Claude (AI Assistants)
-- 6. DALL-E 2 (Art & Creative Design)
-- 7. VS Code (Coding & Development)
-- 8. Notion AI (Productivity)
-- 9. Canva (Art & Creative Design)
-- 10. Jasper (Writing & Editing)
-- 11. Stable Diffusion (Art & Creative Design)
-- 12. Figma (Design)
-- 13. Loom (Video & Audio)
-- 14. Zapier (Automation)
-- 15. Runway ML (Art & Creative Design)
-- 16. Copy.ai (Writing & Editing)
-- 17. Remove.bg (Art & Creative Design)
-- 18. Perplexity (Research & Analysis)

-- Example: Set specific tools as featured (adjust based on your needs)
/*
UPDATE tools SET featured = false; -- Reset all featured
UPDATE tools SET featured = true WHERE id IN (
  'chatgpt',
  'midjourney', 
  'github-copilot',
  'grammarly',
  'claude',
  'dall-e-2',
  'vscode',
  'notion-ai',
  'canva',
  'jasper',
  'stable-diffusion',
  'figma',
  'loom',
  'zapier',
  'runway-ml',
  'copy-ai',
  'remove-bg',
  'perplexity'
);
*/
