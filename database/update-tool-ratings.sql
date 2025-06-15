-- Update Ratings for New Tools Added in Batches
-- This script adds ratings to tools that were inserted without rating values

-- Update Coding & Development tools (batch 1)
UPDATE tools SET rating = 4.5 WHERE id = 'coding-open-webui' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.2 WHERE id = 'coding-theneo-2' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.6 WHERE id = 'coding-n8n-platform' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.1 WHERE id = 'coding-hyperbrowser' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.3 WHERE id = 'coding-cades-dev' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.4 WHERE id = 'coding-codeant-ai' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.2 WHERE id = 'coding-cognikeep' AND category_id = 'coding-development';
UPDATE tools SET rating = 4.0 WHERE id = 'coding-side-space' AND category_id = 'coding-development';

-- Update Daily Life tools (batch 2)
UPDATE tools SET rating = 4.1 WHERE id = 'daily-olypsys' AND category_id = 'daily-life';
UPDATE tools SET rating = 4.3 WHERE id = 'daily-parky-ai' AND category_id = 'daily-life';
UPDATE tools SET rating = 4.5 WHERE id = 'daily-simple-ai' AND category_id = 'daily-life';
UPDATE tools SET rating = 4.2 WHERE id = 'daily-onetask' AND category_id = 'daily-life';
UPDATE tools SET rating = 4.1 WHERE id = 'daily-ollie-ai' AND category_id = 'daily-life';
UPDATE tools SET rating = 4.0 WHERE id = 'daily-timesentry' AND category_id = 'daily-life';
UPDATE tools SET rating = 4.2 WHERE id = 'daily-masterkey' AND category_id = 'daily-life';

-- Update Business Management tools (batch 3)
UPDATE tools SET rating = 4.4 WHERE id = 'business-erayaha-ai' AND category_id = 'business-management';
UPDATE tools SET rating = 4.1 WHERE id = 'business-upbrains-ai' AND category_id = 'business-management';
UPDATE tools SET rating = 4.0 WHERE id = 'business-windispute-pro' AND category_id = 'business-management';
UPDATE tools SET rating = 4.2 WHERE id = 'business-fingertip' AND category_id = 'business-management';

-- Update Office & Productivity tools (batch 4)
UPDATE tools SET rating = 4.3 WHERE id = 'office-blurdata' AND category_id = 'office-productivity';
UPDATE tools SET rating = 4.1 WHERE id = 'office-monkt' AND category_id = 'office-productivity';
UPDATE tools SET rating = 4.2 WHERE id = 'office-apply-hero' AND category_id = 'office-productivity';

-- Update Image Generation & Editing tools (batch 5)
UPDATE tools SET rating = 4.4 WHERE id = 'image-postshot' AND category_id = 'image-generation-editing';
UPDATE tools SET rating = 4.2 WHERE id = 'image-backflip-ai' AND category_id = 'image-generation-editing';

-- Update Research & Data Analysis tools (batch 6)
UPDATE tools SET rating = 4.3 WHERE id = 'research-humiris-ai' AND category_id = 'research-data-analysis';
UPDATE tools SET rating = 4.1 WHERE id = 'research-tumeryk-ai' AND category_id = 'research-data-analysis';

-- Update Individual Category tools (batch 7)
UPDATE tools SET rating = 4.2 WHERE id = 'marketing-seo-optimizer' AND category_id = 'marketing-advertising';
UPDATE tools SET rating = 4.1 WHERE id = 'education-vocadapt' AND category_id = 'education-translation';
UPDATE tools SET rating = 4.3 WHERE id = 'voice-aircaption' AND category_id = 'voice-generation-conversion';

-- Update any other tools that might be missing ratings (safety net)
UPDATE tools SET rating = 4.0 WHERE rating IS NULL OR rating = 0;
