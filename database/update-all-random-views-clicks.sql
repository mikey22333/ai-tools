-- Update ALL tools with random views and clicks between 0 and 1000
-- This version updates every tool regardless of current values
-- Run this if you want to refresh all engagement metrics

UPDATE public.tools
SET 
  views = floor(random() * 1001)::integer,  -- 0 to 1000 inclusive
  clicks = floor(random() * 1001)::integer,  -- 0 to 1000 inclusive
  updated_at = now();

-- Optional: Make featured/trending tools have higher engagement
UPDATE public.tools
SET 
  views = floor(500 + random() * 501)::integer,  -- 500 to 1000 for featured
  clicks = floor(300 + random() * 701)::integer   -- 300 to 1000 for featured
WHERE 
  featured = true OR trending = true;

-- Optional: Ensure clicks are proportional to views (roughly 10-30% click-through rate)
UPDATE public.tools
SET 
  clicks = floor(views * (0.1 + random() * 0.2))::integer  -- 10-30% of views
WHERE 
  views > 0;

-- Verify the update
SELECT 
  COUNT(*) as total_tools,
  MIN(views) as min_views,
  MAX(views) as max_views,
  ROUND(AVG(views)::numeric, 2) as avg_views,
  MIN(clicks) as min_clicks,
  MAX(clicks) as max_clicks,
  ROUND(AVG(clicks)::numeric, 2) as avg_clicks,
  ROUND(AVG(CASE WHEN views > 0 THEN (clicks::float / views::float) * 100 ELSE 0 END)::numeric, 2) as avg_ctr_percentage
FROM public.tools;

-- Show sample of updated tools by category
SELECT 
  t.category_id,
  c.name as category_name,
  COUNT(*) as tools_in_category,
  ROUND(AVG(t.views)::numeric, 0) as avg_views,
  ROUND(AVG(t.clicks)::numeric, 0) as avg_clicks
FROM public.tools t
LEFT JOIN public.categories c ON t.category_id = c.id
GROUP BY t.category_id, c.name
ORDER BY avg_views DESC;

-- Show top 20 most viewed tools
SELECT 
  name,
  category_id,
  views,
  clicks,
  CASE 
    WHEN views > 0 THEN ROUND((clicks::float / views::float * 100)::numeric, 1)
    ELSE 0 
  END as ctr_percentage,
  featured,
  trending
FROM public.tools
ORDER BY views DESC
LIMIT 20;
