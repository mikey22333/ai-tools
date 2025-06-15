-- Tool submissions table for review process
CREATE TABLE tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name VARCHAR(100) NOT NULL,
  tagline VARCHAR(200),
  description TEXT NOT NULL,
  website VARCHAR(500) NOT NULL,
  category_id VARCHAR(50) REFERENCES categories(id),
  pricing VARCHAR(20) CHECK (pricing IN ('Free', 'Freemium', 'Paid', 'Lifetime Deal')),
  pricing_details TEXT,
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(100),
  features TEXT,
  logo_url VARCHAR(500),
  tags TEXT[],
  target_audience TEXT,
  use_case TEXT,
  key_benefits TEXT,
  technical_details TEXT,
  integrations TEXT,
  languages TEXT,
  platforms TEXT,  request_featured BOOLEAN DEFAULT FALSE,
  featured_reason TEXT,
  featured_type VARCHAR(20) DEFAULT 'basic',
  social_media JSONB,
  screenshots TEXT,
  demo_video VARCHAR(500),
  founding_year VARCHAR(4),
  team_size VARCHAR(20),
  funding VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'needs_revision')),
  payment_status VARCHAR(20) DEFAULT 'none' CHECK (payment_status IN ('none', 'pending', 'completed', 'failed')),
  payment_session_id VARCHAR(255),
  rejection_reason TEXT,
  admin_notes TEXT,
  submitted_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tool_submissions_status ON tool_submissions(status);
CREATE INDEX idx_tool_submissions_submitted ON tool_submissions(submitted_at DESC);
CREATE INDEX idx_tool_submissions_email ON tool_submissions(email);
CREATE INDEX idx_tool_submissions_payment ON tool_submissions(payment_status);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tool_submissions_updated_at 
  BEFORE UPDATE ON tool_submissions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
