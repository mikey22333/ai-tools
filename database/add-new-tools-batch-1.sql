-- Add New AI Tools to Coding & Development Category (8 tools)
-- This script adds newly identified AI tools to the coding-development category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, rating, featured, trending, logo_url
) VALUES 
  ('coding-open-webui', 'Open WebUI', 'Self-host and manage AI language models offline with a user-friendly web interface for complete control over your AI infrastructure.', 'https://openwebui.com', 'coding-development', 'Free', ARRAY['self-hosting', 'language-models', 'offline-ai', 'web-interface'], 4.5, false, true, 'https://openwebui.com/favicon.ico'),
  ('coding-theneo-2', 'Theneo 2.0', 'Advanced tool for creating and managing comprehensive API documentation with AI-powered generation and interactive features.', 'https://theneo.io', 'coding-development', 'Freemium', ARRAY['api-documentation', 'documentation-generation', 'interactive-docs', 'api-management'], 4.3, false, false, 'https://theneo.io/favicon.ico'),
  ('coding-n8n-platform', 'N8N', 'Open-source platform to connect and automate tasks across multiple applications and services with visual workflow builder.', 'https://n8n.io', 'coding-development', 'Freemium', ARRAY['workflow-automation', 'task-automation', 'visual-builder', 'open-source'], 4.6, false, true, 'https://n8n.io/favicon.ico'),
  ('coding-hyperbrowser', 'Hyperbrowser', 'Automate and scale web tasks using containerized headless browsers for efficient web scraping and testing.', 'https://hyperbrowser.ai', 'coding-development', 'Freemium', ARRAY['web-automation', 'headless-browsers', 'web-scraping', 'containerized'], 4.2, false, false, 'https://hyperbrowser.ai/favicon.ico'),
  ('coding-cades-dev', 'Cades.dev', 'Comprehensive web development platform with integrated debugging, API management, and optimization tools for developers.', 'https://cades.dev', 'coding-development', 'Freemium', ARRAY['web-development', 'debugging-tools', 'api-management', 'optimization'], 4.1, false, false, 'https://cades.dev/favicon.ico'),
  ('coding-codeant-ai', 'CodeAnt AI', 'AI-powered tool to detect, fix, and optimize code issues automatically to improve software quality and security.', 'https://codeant.ai', 'coding-development', 'Freemium', ARRAY['code-analysis', 'security-fixes', 'code-optimization', 'quality-improvement'], 4.4, false, true, 'https://codeant.ai/favicon.ico'),
  ('coding-cognikeep', 'Cognikeep', 'On-premises AI solution for enterprise data security with custom integrations and complete data control.', 'https://cognikeep.com', 'coding-development', 'Paid', ARRAY['on-premises-ai', 'enterprise-security', 'custom-integrations', 'data-control'], 4.3, false, false, 'https://cognikeep.com/favicon.ico'),
  ('coding-side-space', 'Side Space', 'Google Chrome Extension to organize Chrome tabs vertically with intelligent grouping and cloud synchronization features.', 'https://sidespace.app', 'coding-development', 'Freemium', ARRAY['chrome-extension', 'tab-management', 'productivity', 'cloud-sync'], 4.0, false, false, 'https://sidespace.app/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'coding-development'
) 
WHERE id = 'coding-development';
