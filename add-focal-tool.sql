-- Add Focal to business research category
-- Focal: AI-powered research platform for scientists and academics

INSERT INTO tools (
    id,
    name,
    description,
    short_description,
    logo_url,
    category_id,
    tags,
    rating,
    pricing,
    url,
    affiliate_url,
    featured,
    trending,
    new,
    clicks,
    views
) VALUES (
    'focal-research',
    'Focal',
    'AI-powered research platform for scientists and academics. Search semantically through millions of papers, get answers backed by citations, and summarize findings instantly. Perfect for researchers, students, and professionals who need evidence-based insights.',
    'AI-powered research platform with semantic search across millions of academic papers',
    'https://logo.clearbit.com/getfocal.co',
    'business-research',
    ARRAY['AI Research', 'Academic Papers', 'Citation Management', 'Literature Review', 'Data Analysis', 'Scientific Research'],
    4.5,
    'Freemium',
    'https://getfocal.co/',
    'https://getfocal.co/?red=allait',
    false,
    true,
    true,
    0,
    0
);

-- Update the tool count for business-research category
UPDATE categories 
SET tool_count = (
    SELECT COUNT(*) 
    FROM tools 
    WHERE category_id = 'business-research'
)
WHERE id = 'business-research';
