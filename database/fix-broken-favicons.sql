-- Fix broken favicon URLs with working alternatives
-- Run this to update problematic favicon URLs in the database

-- Update Notion AI favicon (notion.so/favicon.ico returns 404)
UPDATE tools 
SET logo_url = 'https://www.notion.so/images/favicon.ico'
WHERE logo_url = 'https://notion.so/favicon.ico' OR logo_url = 'https://www.notion.so/favicon.ico';

-- Update Google Bard favicon (service discontinued, redirects to Gemini)
UPDATE tools 
SET logo_url = 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg'
WHERE logo_url = 'https://bard.google.com/favicon.ico';

-- Update Amazon Alexa favicon (alexa.amazon.com returns HTML instead of image)
UPDATE tools 
SET logo_url = 'https://d2eebagvwr542w.cloudfront.net/favicon.ico'
WHERE logo_url = 'https://alexa.amazon.com/favicon.ico';

-- Update Zapier favicon (zapier.com/favicon.ico returns 404)
UPDATE tools 
SET logo_url = 'https://res.cloudinary.com/zapier-media/image/upload/f_auto,q_auto/v1/Brand%20assets/zapier-logo-mark.svg'
WHERE logo_url = 'https://zapier.com/favicon.ico';

-- Update Duolingo favicon (duolingo.com/favicon.ico returns 404)
UPDATE tools 
SET logo_url = 'https://d35aaqx5ub95lt.cloudfront.net/favicon.ico'
WHERE logo_url = 'https://duolingo.com/favicon.ico';

-- Update Power Automate favicon (returns HTML instead of image)
UPDATE tools 
SET logo_url = 'https://powerautomate.microsoft.com/images/application-logos/svg/powerautomate.svg'
WHERE logo_url = 'https://powerautomate.microsoft.com/favicon.ico';

-- Remove invalid Google search URL
UPDATE tools 
SET logo_url = 'https://www.google.com/favicon.ico'
WHERE logo_url LIKE '%google.com/url%';

-- Update any bubble-users-assets URLs that return 404
UPDATE tools 
SET logo_url = 'https://bubble.io/favicon.ico'
WHERE logo_url LIKE '%bubble-users-assets.s3.amazonaws.com%';

-- ADDITIONAL FIXES FOR OTHER BROKEN FAVICONS

-- Update Microsoft Teams favicon (teams.microsoft.com/favicon.ico may be problematic)
UPDATE tools 
SET logo_url = 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/teams_32x1.svg'
WHERE logo_url = 'https://teams.microsoft.com/favicon.ico';

-- Update Azure/Microsoft services favicons that may be problematic
UPDATE tools 
SET logo_url = 'https://azure.microsoft.com/favicon.ico'
WHERE logo_url LIKE 'https://azure.microsoft.com/%/favicon.ico';

-- Update general Microsoft favicon URLs that may be problematic
UPDATE tools 
SET logo_url = 'https://c.s-microsoft.com/favicon.ico'
WHERE logo_url = 'https://microsoft.com/favicon.ico';

-- Update Atlassian favicon (may be problematic)
UPDATE tools 
SET logo_url = 'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.ico'
WHERE logo_url = 'https://atlassian.com/favicon.ico';

-- Update translator.microsoft.com favicon
UPDATE tools 
SET logo_url = 'https://translator.microsoft.com/images/icons/favicon.ico'
WHERE logo_url = 'https://translator.microsoft.com/favicon.ico';

-- Update any other potentially problematic Microsoft service favicons
UPDATE tools 
SET logo_url = 'https://c.s-microsoft.com/favicon.ico'
WHERE logo_url LIKE 'https://%.microsoft.com/favicon.ico' 
  AND logo_url NOT LIKE 'https://azure.microsoft.com/favicon.ico'
  AND logo_url NOT LIKE 'https://translator.microsoft.com/images/icons/favicon.ico';

-- Verify updates
SELECT name, logo_url 
FROM tools 
WHERE logo_url IN (
  'https://www.notion.so/images/favicon.ico',
  'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
  'https://d2eebagvwr542w.cloudfront.net/favicon.ico',
  'https://res.cloudinary.com/zapier-media/image/upload/f_auto,q_auto/v1/Brand%20assets/zapier-logo-mark.svg',
  'https://d35aaqx5ub95lt.cloudfront.net/favicon.ico',
  'https://powerautomate.microsoft.com/images/application-logos/svg/powerautomate.svg',
  'https://www.google.com/favicon.ico',
  'https://bubble.io/favicon.ico',
  'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/teams_32x1.svg',
  'https://azure.microsoft.com/favicon.ico',
  'https://c.s-microsoft.com/favicon.ico',
  'https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.ico',
  'https://translator.microsoft.com/images/icons/favicon.ico'
);

-- Check for any remaining potentially problematic favicon URLs
SELECT DISTINCT logo_url 
FROM tools 
WHERE logo_url LIKE '%favicon.ico' 
  AND (
    logo_url LIKE '%amazonaws.com%' OR
    logo_url LIKE '%google.com/url%' OR
    logo_url LIKE '%bard.google.com%' OR
    logo_url LIKE '%bubble-users-assets%' OR
    logo_url LIKE '%zapier.com/favicon.ico' OR
    logo_url LIKE '%duolingo.com/favicon.ico' OR
    logo_url LIKE '%notion.so/favicon.ico' OR
    logo_url LIKE '%alexa.amazon.com%' OR
    logo_url LIKE '%powerautomate.microsoft.com/favicon.ico'
  )
ORDER BY logo_url;
