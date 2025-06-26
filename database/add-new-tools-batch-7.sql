-- Add New AI Tools to Individual Categories (Single Tools)
-- This script adds the remaining tools to their respective categories

-- Marketing & Advertising (1 tool)
INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('marketing-seo-optimizer', 'SEO Optimizer', 'Comprehensive AI-powered tool for website SEO optimization to improve search engine rankings and organic traffic.', 'https://seooptimizer.ai', 'marketing-advertising', 'Freemium', ARRAY['seo-optimization', 'search-rankings', 'organic-traffic', 'website-analysis'], false, false, 'https://seooptimizer.ai/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Education & Translation (1 tool)
INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('education-vocadapt', 'VocAdapt', 'Intelligent language learning tool that personalizes content to match user proficiency levels for optimal learning outcomes.', 'https://vocadapt.com', 'education-translation', 'Freemium', ARRAY['language-learning', 'personalized-content', 'proficiency-matching', 'adaptive-learning'], false, false, 'https://vocadapt.com/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Voice Generation & Conversion (1 tool)
INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('voice-aircaption', 'AirCaption', 'AI-powered transcription tool to convert audio and video content into accurate captions, transcripts, and subtitles.', 'https://aircaption.com', 'voice-generation-conversion', 'Freemium', ARRAY['transcription', 'captions', 'subtitles', 'audio-video'], false, true, 'https://aircaption.com/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update tool counts for all affected categories
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'marketing-advertising'
) 
WHERE id = 'marketing-advertising';

UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'education-translation'
) 
WHERE id = 'education-translation';

UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'voice-generation-conversion'
) 
WHERE id = 'voice-generation-conversion';
