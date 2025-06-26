-- Add New AI Tools to Daily Life Category (7 tools)
-- This script adds newly identified AI tools to the daily-life category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, rating, featured, trending, logo_url
) VALUES 
  ('daily-olypsys', 'Olypsys', 'AI-powered tool to measure and identify O-rings using smartphone-based machine learning for precise industrial measurements.', 'https://olypsys.com', 'daily-life', 'Freemium', ARRAY['measurement-tools', 'smartphone-ai', 'industrial', 'machine-learning'], 4.1, false, false, 'https://olypsys.com/favicon.ico'),
  ('daily-parky-ai', 'Parky.AI', 'Smart AI assistant that explains parking signs using smartphone photos to help drivers understand parking regulations instantly.', 'https://parky.ai', 'daily-life', 'Free', ARRAY['parking-assistance', 'photo-analysis', 'urban-navigation', 'mobile-ai'], 4.3, false, true, 'https://parky.ai/favicon.ico'),
  ('daily-simple-ai', 'Simple AI', 'AI-powered personal assistant to make calls, book appointments, and transcribe conversations for streamlined daily communication.', 'https://simple.ai', 'daily-life', 'Freemium', ARRAY['personal-assistant', 'call-automation', 'appointment-booking', 'transcription'], 4.2, false, true, 'https://simple.ai/favicon.ico'),
  ('daily-onetask', 'OneTask', 'Specialized task management tool with intelligent prioritization and reminders designed specifically for neurodivergent individuals.', 'https://onetask.app', 'daily-life', 'Freemium', ARRAY['task-management', 'neurodivergent-support', 'prioritization', 'accessibility'], 4.4, false, false, 'https://onetask.app/favicon.ico'),
  ('daily-ollie-ai', 'Ollie.ai', 'Comprehensive personal assistant app for daily tasks and lifestyle management with AI-powered scheduling and reminders.', 'https://ollie.ai', 'daily-life', 'Freemium', ARRAY['personal-assistant', 'lifestyle-management', 'daily-tasks', 'scheduling'], 4.0, false, false, 'https://ollie.ai/favicon.ico'),
  ('daily-timesentry', 'TimeSentry', 'Professional time-tracking and billing tool with AI-powered insights for freelancers and consultants.', 'https://timesentry.com', 'daily-life', 'Freemium', ARRAY['time-tracking', 'billing', 'professional-tools', 'freelancer'], 4.2, false, false, 'https://timesentry.com/favicon.ico'),
  ('daily-masterkey', 'MasterKey', 'AI-powered tool to analyze Zillow listings and assist homebuyers with property evaluation and market insights.', 'https://masterkey.ai', 'daily-life', 'Freemium', ARRAY['real-estate', 'property-analysis', 'homebuying', 'market-insights'], 4.1, false, false, 'https://masterkey.ai/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'daily-life'
) 
WHERE id = 'daily-life';
