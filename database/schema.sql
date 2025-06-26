-- Categories table
CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  tool_count INTEGER DEFAULT 0,
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tools table
CREATE TABLE tools (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(200),
  logo_url VARCHAR(500),
  category_id VARCHAR(50) REFERENCES categories(id),
  tags TEXT[], -- PostgreSQL array
  rating DECIMAL(2,1),
  pricing VARCHAR(20) CHECK (pricing IN ('Free', 'Freemium', 'Paid', 'Lifetime Deal')),
  url VARCHAR(500),
  affiliate_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  trending BOOLEAN DEFAULT FALSE,
  new BOOLEAN DEFAULT FALSE,
  clicks INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_tools_trending ON tools(trending);
CREATE INDEX idx_tools_rating ON tools(rating DESC);
CREATE INDEX idx_tools_views ON tools(views DESC);
CREATE INDEX idx_tools_created ON tools(created_at DESC);

-- Function to increment tool stats
CREATE OR REPLACE FUNCTION increment_tool_stat(tool_id VARCHAR(50), stat_field VARCHAR(10))
RETURNS VOID AS $$
BEGIN
  IF stat_field = 'clicks' THEN
    UPDATE tools SET clicks = clicks + 1 WHERE id = tool_id;
  ELSIF stat_field = 'views' THEN
    UPDATE tools SET views = views + 1 WHERE id = tool_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to update category tool counts
CREATE OR REPLACE FUNCTION update_category_tool_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update count for old category (if tool was moved)
  IF TG_OP = 'UPDATE' AND OLD.category_id IS DISTINCT FROM NEW.category_id THEN
    UPDATE categories 
    SET tool_count = (SELECT COUNT(*) FROM tools WHERE category_id = OLD.category_id)
    WHERE id = OLD.category_id;
  END IF;
  
  -- Update count for new/current category
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE categories 
    SET tool_count = (SELECT COUNT(*) FROM tools WHERE category_id = NEW.category_id)
    WHERE id = NEW.category_id;
  END IF;
  
  -- Update count for deleted tool's category
  IF TG_OP = 'DELETE' THEN
    UPDATE categories 
    SET tool_count = (SELECT COUNT(*) FROM tools WHERE category_id = OLD.category_id)
    WHERE id = OLD.category_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update category tool counts
CREATE TRIGGER update_category_tool_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_category_tool_count();
