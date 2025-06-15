-- Add New AI Tools to Research & Data Analysis Category (2 tools)
-- This script adds newly identified AI tools to the research-data-analysis category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('research-humiris-ai', 'Humiris AI', 'Advanced tool to optimize Generative AI usage with intelligent model routing and performance enhancement.', 'https://humiris.ai', 'research-data-analysis', 'Freemium', ARRAY['ai-optimization', 'model-routing', 'performance-enhancement', 'generative-ai'], false, false, 'https://humiris.ai/favicon.ico'),
  ('research-tumeryk-ai', 'Tumeryk AI', 'Enterprise platform to optimize and secure Large Language Model usage for organizations with advanced governance.', 'https://tumeryk.ai', 'research-data-analysis', 'Paid', ARRAY['llm-optimization', 'enterprise-security', 'ai-governance', 'organizational-ai'], false, false, 'https://tumeryk.ai/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'research-data-analysis'
) 
WHERE id = 'research-data-analysis';
