-- Add New AI Tools to Business Management Category (4 tools)
-- This script adds newly identified AI tools to the business-management category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending, logo_url
) VALUES 
  ('business-erayaha-ai', 'Erayaha.AI', 'Advanced AI tool to analyze contracts for risks, financial impacts, and legal obligations with comprehensive risk assessment.', 'https://erayaha.ai', 'business-management', 'Freemium', ARRAY['contract-analysis', 'risk-assessment', 'legal-ai', 'financial-impact'], false, true, 'https://erayaha.ai/favicon.ico'),
  ('business-upbrains-ai', 'UpBrains AI', 'Comprehensive customer operations management tool for inbox management and document processing automation.', 'https://upbrains.ai', 'business-management', 'Freemium', ARRAY['customer-operations', 'inbox-management', 'document-processing', 'automation'], false, false, 'https://upbrains.ai/favicon.ico'),
  ('business-windispute-pro', 'WinDispute.pro', 'Automated dispute resolution platform specifically designed for Stripe merchants to handle payment disputes efficiently.', 'https://windispute.pro', 'business-management', 'Paid', ARRAY['dispute-resolution', 'stripe-integration', 'payment-disputes', 'merchant-tools'], false, false, 'https://windispute.pro/favicon.ico'),
  ('business-fingertip', 'Fingertip', 'All-in-one business platform to create websites, manage appointments, and sell products with integrated AI features.', 'https://fingertip.com', 'business-management', 'Freemium', ARRAY['website-creation', 'appointment-management', 'e-commerce', 'all-in-one'], false, false, 'https://fingertip.com/favicon.ico')
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'business-management'
) 
WHERE id = 'business-management';
