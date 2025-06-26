-- =====================================================
-- BLOG SYSTEM UPDATE SCRIPT
-- Update existing posts table and add blog_images table
-- =====================================================

-- =====================================================
-- 1. UPDATE EXISTING POSTS TABLE
-- =====================================================

-- Add missing columns to existing posts table (only if they don't exist)
DO $$ 
BEGIN
    -- Add author_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'author_id') THEN
        ALTER TABLE public.posts ADD COLUMN author_id UUID;
    END IF;

    -- Add tags column if it doesn't exist  
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'tags') THEN
        ALTER TABLE public.posts ADD COLUMN tags TEXT[];
    END IF;

    -- Add meta_title column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'meta_title') THEN
        ALTER TABLE public.posts ADD COLUMN meta_title TEXT;
    END IF;

    -- Add meta_description column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'meta_description') THEN
        ALTER TABLE public.posts ADD COLUMN meta_description TEXT;
    END IF;

    -- Add reading_time column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'reading_time') THEN
        ALTER TABLE public.posts ADD COLUMN reading_time INTEGER;
    END IF;

    -- Add view_count column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'view_count') THEN
        ALTER TABLE public.posts ADD COLUMN view_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- =====================================================
-- 2. CREATE BLOG_IMAGES TABLE (for multiple images per post)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.blog_images (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  post_slug TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT blog_images_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- =====================================================
-- 3. ADD MISSING INDEXES FOR PERFORMANCE
-- =====================================================

-- Additional indexes for posts table (only create if they don't exist)
CREATE INDEX IF NOT EXISTS idx_posts_title_search ON public.posts USING gin(to_tsvector('english', title)) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_posts_content_search ON public.posts USING gin(to_tsvector('english', content)) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_posts_tags ON public.posts USING gin(tags) TABLESPACE pg_default;

-- Blog images table indexes
CREATE INDEX IF NOT EXISTS idx_blog_images_post_slug ON public.blog_images USING btree(post_slug) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_blog_images_sort_order ON public.blog_images USING btree(post_slug, sort_order) TABLESPACE pg_default;

-- =====================================================
-- 4. CREATE MISSING FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-set published_at when publishing
CREATE OR REPLACE FUNCTION public.set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- If is_published is being set to true and published_at is null, set it to now
  IF NEW.is_published = true AND (OLD.is_published IS NULL OR OLD.is_published = false) AND NEW.published_at IS NULL THEN
    NEW.published_at = NOW();
  END IF;
  
  -- If is_published is being set to false, clear published_at
  IF NEW.is_published = false AND OLD.is_published = true THEN
    NEW.published_at = NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 5. CREATE MISSING TRIGGERS
-- =====================================================

-- Trigger to automatically update updated_at for blog_images
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_images_updated_at') THEN
        CREATE TRIGGER update_blog_images_updated_at
          BEFORE UPDATE ON public.blog_images
          FOR EACH ROW
          EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;

-- Trigger to auto-set published_at (only create if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_posts_published_at') THEN
        CREATE TRIGGER set_posts_published_at
          BEFORE UPDATE ON public.posts
          FOR EACH ROW
          EXECUTE FUNCTION public.set_published_at();
    END IF;
END $$;

-- =====================================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on posts table (if not already enabled)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Enable RLS on blog_images table
ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 7. CREATE/UPDATE RLS POLICIES
-- =====================================================

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Allow read published posts" ON public.posts;
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON public.posts;
DROP POLICY IF EXISTS "Allow read blog images for published posts" ON public.blog_images;
DROP POLICY IF EXISTS "Allow all blog images operations for authenticated users" ON public.blog_images;

-- Posts table policies
-- Allow everyone to read published posts
CREATE POLICY "Allow read published posts" ON public.posts
  FOR SELECT USING (is_published = true);

-- Allow all operations for authenticated users (modify as needed for your auth setup)
CREATE POLICY "Allow all operations for authenticated users" ON public.posts
  FOR ALL USING (true);

-- Blog images table policies
-- Simple policy - allow read access to all blog images (you can restrict this later)
CREATE POLICY "Allow read blog images" ON public.blog_images
  FOR SELECT USING (true);

-- Allow all operations for authenticated users
CREATE POLICY "Allow all blog images operations for authenticated users" ON public.blog_images
  FOR ALL USING (true);

-- =====================================================
-- 8. CREATE USEFUL VIEWS (OPTIONAL)
-- =====================================================

-- Note: View creation commented out temporarily to avoid column reference issues
-- You can create this view manually after confirming the blog_images table exists

/*
-- View for published posts with image count
CREATE OR REPLACE VIEW public.published_posts_with_images AS
SELECT 
  p.*,
  COALESCE(img_count.image_count, 0) as additional_image_count
FROM public.posts p
LEFT JOIN (
  SELECT 
    bi.post_slug, 
    COUNT(*) as image_count
  FROM public.blog_images bi
  GROUP BY bi.post_slug
) img_count ON p.slug = img_count.post_slug
WHERE p.is_published = true
ORDER BY p.published_at DESC NULLS LAST;
*/

-- =====================================================
-- 9. INSERT SAMPLE DATA (OPTIONAL - UNCOMMENT TO USE)
-- =====================================================

/*
-- First, uncomment this section after confirming the script runs successfully

-- Sample blog post with our new content format
INSERT INTO public.posts (
  title, 
  slug, 
  excerpt, 
  content, 
  thumbnail, 
  is_published,
  published_at,
  meta_title,
  meta_description,
  reading_time,
  view_count
) VALUES (
  '5 Trending AI Tools Unveiled at SuperAI Singapore 2025',
  '5-trending-ai-tools-unveiled-at-superai-singapore-2025',
  'Discover the 5 most exciting AI tools revealed at Asia''s premier AI event - SuperAI Singapore 2025.',
  '# 🚀 5 Trending AI Tools Unveiled at SuperAI Singapore 2025

## 🌏 Asia''s Premier AI Event Draws Global Eyes

The **SuperAI Singapore 2025** summit wasn''t just another tech gathering—it was **Asia''s largest AI event**, uniting **over 7,000 innovators from 100+ countries**. From live hackathons to robotic showcases, the future of artificial intelligence was on full display.

## 🤖 Why SuperAI 2025 Matters

This summit marked a turning point in the **global AI race**, spotlighting:
- Real-time autonomous agents
- Cross-industry AI adoption
- AI video generation at cinematic quality
- Human-agent collaboration in the enterprise

## **🔥 Top 5 AI Tools That Stole the Show**

### **1. Voxora AI** – Real-Time Agent Orchestration  
Orchestrates multiple AI agents in real time. Ideal for support automation, smart city systems, and workflow ops.

### **2. Synthoria** – Text-to-Video Generator  
Creates ultra-realistic videos from text prompts. Best for creators and brands using AI video storytelling.

### **3. GlobeMind** – Cultural Language Intelligence  
Breaks barriers with emotion-aware, culturally adaptive translations. Ideal for global brands.

### **4. AutoPilotHQ** – AI Growth Hacker for Startups  
Launch marketing experiments, cold email outreach, and A/B tests autonomously—no team required.

### **5. NeuralForge** – Developer''s AI Co‑Builder  
No-code to low-code app generation using natural language prompts. Great for indie devs and MVP launches.

## 🧠 Final Thoughts

These tools from **SuperAI Singapore 2025** signal where AI is headed—more automation, creativity, and speed.  
From creators to coders, these tools are built to scale with you.',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  true,
  NOW(),
  '5 Trending AI Tools from SuperAI Singapore 2025 | AllAiTools',
  'Discover the 5 most exciting AI tools revealed at SuperAI Singapore 2025. From real-time agents to AI video generation - the future is here.',
  8,
  0
) ON CONFLICT (slug) DO NOTHING;

-- Sample additional images for the SuperAI post
INSERT INTO public.blog_images (post_slug, image_url, alt_text, caption, sort_order) VALUES
('5-trending-ai-tools-unveiled-at-superai-singapore-2025', 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80', 'AI Tools Showcase', 'Modern tech workspace showcasing AI tools', 1),
('5-trending-ai-tools-unveiled-at-superai-singapore-2025', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'Singapore Tech Scene', 'Singapore''s futuristic skyline representing innovation', 2)
ON CONFLICT DO NOTHING;
*/

-- =====================================================
-- 10. VERIFICATION QUERIES
-- =====================================================

-- Check posts table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check blog_images table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'blog_images' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check indexes
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes 
WHERE tablename IN ('posts', 'blog_images')
  AND schemaname = 'public'
ORDER BY tablename, indexname;

-- Check triggers
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('posts', 'blog_images')
ORDER BY event_object_table, trigger_name;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================

SELECT 'Blog system update completed successfully!' as status,
       'Your existing posts table has been enhanced and blog_images table added.' as details;
