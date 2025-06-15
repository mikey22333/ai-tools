-- Add New AI Tools to Image Generation & Editing Category (2 tools)
-- This script adds newly identified AI tools to the image-generation-editing category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('image-postshot', 'Postshot', 'Advanced software to convert smartphone video footage into detailed 3D models using AI-powered photogrammetry.', 'https://postshot.app', 'image-generation-editing', 'Freemium', ARRAY['3d-modeling', 'smartphone-video', 'photogrammetry', 'ai-powered'], false, true, 'https://postshot.app/favicon.ico'),
  ('image-backflip-ai', 'Backflip AI', 'Creative AI tool to transform ideas into 3D-printable models with intelligent design generation and optimization.', 'https://backflip.ai', 'image-generation-editing', 'Freemium', ARRAY['3d-printing', 'idea-to-model', 'design-generation', 'creative-ai'], false, true, 'https://backflip.ai/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'image-generation-editing'
) 
WHERE id = 'image-generation-editing';
