-- Create posts table for the blog system
-- This table will store all blog posts with proper indexing for performance

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  thumbnail TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to published posts
CREATE POLICY "Allow public read access to published posts" ON posts
  FOR SELECT USING (is_published = true);

-- Policy to allow authenticated users to manage all posts (for admin)
CREATE POLICY "Allow authenticated users to manage posts" ON posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample posts for testing
INSERT INTO posts (title, slug, excerpt, content, thumbnail, is_published, published_at) VALUES
(
  'Getting Started with AI Tools in 2024',
  'getting-started-ai-tools-2024',
  'Discover the most essential AI tools that are revolutionizing productivity and creativity in 2024.',
  '<h2>Introduction</h2><p>Artificial Intelligence has become an integral part of our daily workflows. In this comprehensive guide, we''ll explore the most impactful AI tools available in 2024.</p><h3>Top Categories</h3><ul><li><strong>Content Creation:</strong> From writing assistants to image generators</li><li><strong>Productivity:</strong> AI-powered scheduling and task management</li><li><strong>Development:</strong> Code completion and debugging tools</li></ul><p>Whether you''re a creative professional, developer, or business owner, there''s an AI tool designed to enhance your workflow.</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  true,
  NOW() - INTERVAL '2 days'
),
(
  'The Future of AI-Powered Content Creation',
  'future-ai-powered-content-creation',
  'Explore how AI is transforming the landscape of content creation across industries.',
  '<h2>The Revolution is Here</h2><p>AI-powered content creation tools are not just changing how we work—they''re redefining what''s possible in creative industries.</p><h3>Key Trends</h3><ol><li>Automated video editing and production</li><li>AI-generated music and soundscapes</li><li>Intelligent copywriting and marketing content</li><li>Personalized content at scale</li></ol><p>As these technologies continue to evolve, we''re seeing unprecedented opportunities for creativity and efficiency.</p>',
  'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=400&fit=crop',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Building Better Workflows with AI Automation',
  'building-better-workflows-ai-automation',
  'Learn how to integrate AI automation tools into your existing workflows for maximum efficiency.',
  '<h2>Streamlining Your Process</h2><p>The key to successful AI integration isn''t replacing human creativity—it''s augmenting it with intelligent automation.</p><h3>Best Practices</h3><ul><li>Start small with single-task automation</li><li>Focus on repetitive, time-consuming tasks</li><li>Maintain human oversight and quality control</li><li>Continuously optimize based on results</li></ul><p>By following these principles, you can create workflows that are both efficient and maintain the quality your audience expects.</p>',
  'https://images.unsplash.com/photo-1671726203449-34e4129e9d2f?w=800&h=400&fit=crop',
  true,
  NOW() - INTERVAL '1 week'
);

-- Add comment to the table
COMMENT ON TABLE posts IS 'Blog posts table with full content management capabilities including draft/published states and SEO optimization';
