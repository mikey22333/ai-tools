-- Add PlanSpark - AI-Powered Business Planning Tool
-- PlanSpark helps entrepreneurs turn ideas into comprehensive, investor-ready business plans
-- Uses AI and real market data for business planning, competitive analysis, and financial projections

INSERT INTO tools (
  id, 
  name, 
  description, 
  short_description,
  logo_url,
  url, 
  category_id, 
  pricing, 
  tags, 
  featured, 
  trending,
  rating
) VALUES (
  'planspark',
  'PlanSpark',
  'AI-powered business planning platform that generates comprehensive, investor-ready business plans in minutes. Features include automated business plan generation, real-time market data analysis, competitive analysis, financial projections, and professional PDF export. Turn your business idea into a detailed execution roadmap with AI-driven insights, market research, and strategic recommendations.',
  'Turn your idea into a business plan with AI-powered planning, market data, and financial projections',
  'https://www.planspark.app/logo.png',
  'https://www.planspark.app/',
  'business-management',
  'Freemium',
  ARRAY['business-planning', 'market-research', 'financial-projections', 'competitive-analysis', 'business-strategy', 'ai-advisor', 'startup-tools', 'entrepreneur', 'pdf-export', 'market-data'],
  false,
  true,
  4.8
) ON CONFLICT (id, category_id) DO NOTHING;
