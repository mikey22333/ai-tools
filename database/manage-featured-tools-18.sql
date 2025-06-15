-- Remove all featured flags and set only 18 tools as featured across all categories
-- This ensures we have exactly 18 featured tools total

-- First, remove all featured flags
UPDATE tools SET featured = false WHERE featured = true;

-- Then set exactly 18 tools as featured (mix from different categories)
UPDATE tools SET featured = true WHERE id IN (
  -- Daily Life (3 tools)
  'daily-life-notion-ai',
  'daily-life-alexa',
  'daily-life-myfitnesspal',
  
  -- Education & Translation (3 tools)
  'edu-duolingo',
  'edu-google-translate',
  'edu-khan-academy',
  
  -- Health & Wellness (3 tools)
  'health-fitbit',
  'health-headspace',
  'health-ada-health',
  
  -- Chatbots & Virtual Companions (3 tools)
  'bard-ai',
  'character-ai',
  'replika-ai',
  
  -- Business & Management (3 tools)
  'business-hubspot',
  'business-salesforce-einstein',
  'business-monday-ai',
  
  -- Coding & Development (3 tools)
  'coding-github-copilot',
  'coding-openai-codex',
  'coding-replit-ghostwriter'
);

-- Verify the count
SELECT COUNT(*) as featured_count FROM tools WHERE featured = true;
