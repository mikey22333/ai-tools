-- Update all tools with random views and clicks between 0 and 1000
-- This makes the tools look more realistic with engagement metrics

UPDATE public.tools
SET 
  views = floor(random() * 1000)::integer,
  clicks = floor(random() * 1000)::integer,
  updated_at = now()
WHERE 
  views = 0 OR clicks = 0 OR views IS NULL OR clicks IS NULL;

-- Verify the update
SELECT 
  COUNT(*) as total_tools,
  MIN(views) as min_views,
  MAX(views) as max_views,
  AVG(views)::integer as avg_views,
  MIN(clicks) as min_clicks,
  MAX(clicks) as max_clicks,
  AVG(clicks)::integer as avg_clicks
FROM public.tools;

-- Show sample of updated tools
SELECT 
  id,
  name,
  views,
  clicks,
  category_id
FROM public.tools
ORDER BY views DESC
LIMIT 20;
