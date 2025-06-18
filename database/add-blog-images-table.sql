-- Create blog_images table for storing additional images per blog post
CREATE TABLE IF NOT EXISTS blog_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by post_slug
CREATE INDEX IF NOT EXISTS idx_blog_images_post_slug ON blog_images(post_slug);

-- Add RLS policies for blog_images table
ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users
CREATE POLICY "Allow read access to blog_images" ON blog_images
  FOR SELECT USING (true);

-- Allow insert/update/delete for authenticated users (you can modify this based on your auth setup)
CREATE POLICY "Allow write access to blog_images" ON blog_images
  FOR ALL USING (true);

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_blog_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_images_updated_at
  BEFORE UPDATE ON blog_images
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_images_updated_at();
