-- =============================================
-- Blog Posts Database Setup with Multiple Images
-- =============================================

-- Drop existing tables if they exist (careful with this in production!)
DROP TABLE IF EXISTS public.blog_images;
DROP TABLE IF EXISTS public.posts;

-- =============================================
-- 1. Create Posts Table
-- =============================================

CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    thumbnail TEXT, -- Main featured image URL
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    
    -- SEO and metadata fields
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Additional fields
    author_name TEXT DEFAULT 'AllAiTools Team',
    reading_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    
    -- Constraints
    CONSTRAINT posts_slug_check CHECK (length(slug) > 0),
    CONSTRAINT posts_title_check CHECK (length(title) > 0),
    CONSTRAINT posts_content_check CHECK (length(content) > 0)
);

-- =============================================
-- 2. Create Blog Images Table (for multiple images per post)
-- =============================================

CREATE TABLE public.blog_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_slug TEXT NOT NULL REFERENCES public.posts(slug) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT blog_images_url_check CHECK (length(image_url) > 0),
    CONSTRAINT blog_images_post_slug_check CHECK (length(post_slug) > 0)
);

-- =============================================
-- 3. Create Indexes for Performance
-- =============================================

-- Posts table indexes
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_published ON public.posts(is_published);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_updated_at ON public.posts(updated_at DESC);

-- Blog images table indexes
CREATE INDEX idx_blog_images_post_slug ON public.blog_images(post_slug);
CREATE INDEX idx_blog_images_display_order ON public.blog_images(post_slug, display_order);

-- =============================================
-- 4. Create Updated At Trigger Function
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================
-- 5. Create Triggers
-- =============================================

-- Trigger to auto-update updated_at on posts
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 6. Set up Row Level Security (RLS)
-- =============================================

-- Enable RLS on both tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 7. Create RLS Policies
-- =============================================

-- Posts table policies
-- Allow public read access to published posts
CREATE POLICY "Public can read published posts" ON public.posts
    FOR SELECT USING (is_published = true);

-- Allow full access for authenticated users (admins)
CREATE POLICY "Authenticated users can manage posts" ON public.posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow service role full access
CREATE POLICY "Service role can manage posts" ON public.posts
    FOR ALL USING (auth.role() = 'service_role');

-- Blog images table policies
-- Allow public read access to images of published posts
CREATE POLICY "Public can read images of published posts" ON public.blog_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.slug = blog_images.post_slug 
            AND posts.is_published = true
        )
    );

-- Allow full access for authenticated users (admins)
CREATE POLICY "Authenticated users can manage blog images" ON public.blog_images
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow service role full access
CREATE POLICY "Service role can manage blog images" ON public.blog_images
    FOR ALL USING (auth.role() = 'service_role');

-- =============================================
-- 8. Grant Permissions
-- =============================================

-- Grant permissions to authenticated users
GRANT ALL ON public.posts TO authenticated;
GRANT ALL ON public.blog_images TO authenticated;

-- Grant permissions to service role
GRANT ALL ON public.posts TO service_role;
GRANT ALL ON public.blog_images TO service_role;

-- Grant read permissions to anonymous users (for published content)
GRANT SELECT ON public.posts TO anon;
GRANT SELECT ON public.blog_images TO anon;

-- =============================================
-- 9. Insert Sample Blog Post with Images
-- =============================================

-- Insert a sample blog post
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
    meta_keywords,
    reading_time
) VALUES (
    '5 Trending AI Tools Unveiled at SuperAI Singapore 2025',
    '5-trending-ai-tools-unveiled-at-superai-singapore-2025',
    'Discover the top 5 AI tools that stole the show at Asia''s premier AI event, featuring real-time agents, video generation, and breakthrough innovations.',
    '# 🚀 5 Trending AI Tools Unveiled at SuperAI Singapore 2025

## 🌏 Asia''s Premier AI Event Draws Global Eyes

The **SuperAI Singapore 2025** summit wasn''t just another tech gathering—it was **Asia''s largest AI event**, uniting **over 7,000 innovators from 100+ countries**. From live hackathons to robotic showcases, the future of artificial intelligence was on full display.

## 🤖 Why SuperAI 2025 Matters

This summit marked a turning point in the **global AI race**, spotlighting:
- Real-time autonomous agents
- Cross-industry AI adoption
- AI video generation at cinematic quality
- Human-agent collaboration in the enterprise

---

## **🔥 Top 5 AI Tools That Stole the Show**

### **1. Voxora AI** – Real-Time Agent Orchestration  
Orchestrates multiple AI agents in real time. Ideal for support automation, smart city systems, and workflow ops.

**🔍 Keywords:** AI automation, real-time AI agents, multi-agent orchestration  
👉 [Explore Voxora AI](https://allaitools.dev/tools/voxora-ai)

---

### **2. Synthoria** – Text-to-Video Generator  
Creates ultra-realistic videos from text prompts. Best for creators and brands using AI video storytelling.

**🔍 Keywords:** AI video generation, text-to-video, generative video  
👉 [Check out Synthoria](https://allaitools.dev/tools/synthoria)

---

### **3. GlobeMind** – Cultural Language Intelligence  
Breaks barriers with emotion-aware, culturally adaptive translations. Ideal for global brands.

**🔍 Keywords:** AI translation, multilingual LLM, localization AI  
👉 [Discover GlobeMind](https://allaitools.dev/tools/globemind)

---

### **4. AutoPilotHQ** – AI Growth Hacker for Startups  
Launch marketing experiments, cold email outreach, and A/B tests autonomously—no team required.

**🔍 Keywords:** AI growth hacking, autonomous SaaS tools, startup AI  
👉 [Try AutoPilotHQ](https://allaitools.dev/tools/autopilothq)

---

### **5. NeuralForge** – Developer''s AI Co‑Builder  
No-code to low-code app generation using natural language prompts. Great for indie devs and MVP launches.

**🔍 Keywords:** AI for developers, no-code AI tools, code generation  
👉 [Use NeuralForge](https://allaitools.dev/tools/neuralforge)

---

## 🧠 Final Thoughts

These tools from **SuperAI Singapore 2025** signal where AI is headed—more automation, creativity, and speed.  
From creators to coders, these tools are built to scale with you.

**Want more?** Check our full [SuperAI Tool Collection](https://allaitools.dev/tools?tag=superai2025) for in-depth reviews, user ratings, and real-time tool updates.

**📌 Stay updated**: We''ll be covering more tools revealed at global events every week on **AllAiTools.dev**.',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    true,
    NOW(),
    '5 Trending AI Tools from SuperAI Singapore 2025 | AllAiTools',
    'Discover the top 5 revolutionary AI tools unveiled at SuperAI Singapore 2025. From real-time agents to video generation - see what''s shaping the future of AI.',
    'AI tools, SuperAI Singapore 2025, artificial intelligence, AI agents, video generation, AI summit, technology trends',
    8
);

-- Get the inserted post's slug for adding images
-- Insert additional images for the sample post
INSERT INTO public.blog_images (
    post_slug,
    image_url,
    alt_text,
    caption,
    display_order
) VALUES 
(
    '5-trending-ai-tools-unveiled-at-superai-singapore-2025',
    'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    'AI Tools Showcase - Modern tech workspace with multiple screens',
    'Modern AI workspace displaying various tools and interfaces',
    1
),
(
    '5-trending-ai-tools-unveiled-at-superai-singapore-2025',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'Singapore Tech Skyline - Futuristic cityscape representing innovation',
    'Singapore''s futuristic skyline representing the city''s role as a tech hub',
    2
);

-- =============================================
-- 10. Verification Queries
-- =============================================

-- Check if everything was created successfully
SELECT 'Posts table created successfully' as status;
SELECT COUNT(*) as post_count FROM public.posts;
SELECT COUNT(*) as image_count FROM public.blog_images;

-- Show the sample post with its images
SELECT 
    p.title,
    p.slug,
    p.is_published,
    p.created_at,
    COUNT(bi.id) as image_count
FROM public.posts p
LEFT JOIN public.blog_images bi ON p.slug = bi.post_slug
GROUP BY p.id, p.title, p.slug, p.is_published, p.created_at
ORDER BY p.created_at DESC;

-- =============================================
-- 11. Useful Queries for Management
-- =============================================

-- Query to get all posts with their image counts
/*
SELECT 
    p.id,
    p.title,
    p.slug,
    p.is_published,
    p.published_at,
    COUNT(bi.id) as total_images
FROM public.posts p
LEFT JOIN public.blog_images bi ON p.slug = bi.post_slug
GROUP BY p.id, p.title, p.slug, p.is_published, p.published_at
ORDER BY p.created_at DESC;
*/

-- Query to get a specific post with all its images
/*
SELECT 
    p.*,
    bi.image_url,
    bi.alt_text,
    bi.caption,
    bi.display_order
FROM public.posts p
LEFT JOIN public.blog_images bi ON p.slug = bi.post_slug
WHERE p.slug = 'your-post-slug-here'
ORDER BY bi.display_order;
*/

-- =============================================
-- Setup Complete!
-- =============================================

SELECT 'Blog database setup with multiple images support completed successfully!' as final_status;
