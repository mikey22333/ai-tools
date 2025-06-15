-- Set Featured Tools (Only 18 tools total across all categories)
-- This script ensures only 18 tools are marked as featured across the entire platform

-- First, unset all featured tools
UPDATE tools SET featured = false;

-- Set exactly 18 tools as featured (3 from each major category)
UPDATE tools SET featured = true WHERE id IN (
  -- Daily Life (3 tools)
  'daily-life-notion-ai',
  'daily-life-google-assistant', 
  'daily-life-myfitnesspal',
  
  -- Education & Translation (3 tools)
  'edu-duolingo',
  'edu-google-translate',
  'edu-grammarly',
  
  -- Health & Wellness (3 tools)  
  'health-woebot',
  'health-ada-health',
  'health-myfitnesspal-ai',
  
  -- Chatbots & Virtual Companions (3 tools)
  'bard-ai',
  'character-ai',
  'replika-ai',
  
  -- Business & Management (3 tools)
  'business-slack-ai',
  'business-notion-ai',
  'business-zoom-ai',
  
  -- Coding & Development (3 tools)
  'github-copilot',
  'cursor-ai',
  'replit-ai'
);

-- Verify the count
SELECT COUNT(*) as featured_count FROM tools WHERE featured = true;
