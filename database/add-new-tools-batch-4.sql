-- Add New AI Tools to Office & Productivity Category (3 tools)
-- This script adds newly identified AI tools to the office-productivity category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('office-blurdata', 'BlurData', 'MacOS application to automatically detect and blur sensitive information in screenshots and PDFs for privacy protection.', 'https://blurdata.app', 'office-productivity', 'Paid', ARRAY['privacy-protection', 'sensitive-data', 'macos', 'automatic-detection'], false, false, 'https://blurdata.app/favicon.ico'),
  ('office-monkt', 'Monkt', 'Intelligent document conversion tool to transform documents into AI-ready Markdown or JSON formats for enhanced processing.', 'https://monkt.com', 'office-productivity', 'Freemium', ARRAY['document-conversion', 'markdown', 'json', 'ai-ready-formats'], false, false, 'https://monkt.com/favicon.ico'),
  ('office-apply-hero', 'Apply Hero', 'AI-powered job application automation tool that creates resumes and applies to positions automatically.', 'https://applyhero.com', 'office-productivity', 'Freemium', ARRAY['job-applications', 'resume-creation', 'automation', 'career-tools'], false, true, 'https://applyhero.com/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'office-productivity'
) 
WHERE id = 'office-productivity';
