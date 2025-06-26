-- Business Research AI Tools (100 tools)
-- This script adds 100 AI-powered tools specifically for business research
-- Uses ON CONFLICT (id, category_id) DO NOTHING to avoid duplicates within the same category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending
) VALUES 
  -- Market Research & Intelligence AI Tools
  ('perplexity-research', 'Perplexity for Research', 'AI-powered search engine for comprehensive business research and analysis', 'https://perplexity.ai', 'business-research', 'Freemium', ARRAY['ai-search', 'research', 'analysis'], true, true),
  ('consensus-ai', 'Consensus AI', 'AI-powered search engine for scientific research and business insights', 'https://consensus.app', 'business-research', 'Freemium', ARRAY['scientific-research', 'evidence-based', 'citations'], false, true),
  ('elicit-research', 'Elicit Research', 'AI research assistant for literature reviews and research questions', 'https://elicit.org', 'business-research', 'Freemium', ARRAY['literature-review', 'research-assistant', 'academic'], false, true),
  ('semantic-scholar-ai', 'Semantic Scholar AI', 'AI-powered academic search engine for research papers', 'https://semanticscholar.org', 'business-research', 'Free', ARRAY['academic-search', 'research-papers', 'citations'], false, false),
  ('you-com-research', 'You.com Research', 'AI-powered search engine with research capabilities', 'https://you.com', 'business-research', 'Freemium', ARRAY['ai-search', 'personalized-results', 'research'], false, false),
  ('metaphor-search', 'Metaphor Search', 'AI-powered search engine for discovering relevant content and insights', 'https://metaphor.systems', 'business-research', 'Paid', ARRAY['content-discovery', 'ai-search', 'insights'], false, false),
  ('research-rabbit', 'ResearchRabbit', 'AI-powered research discovery and collaboration platform', 'https://researchrabbit.ai', 'business-research', 'Free', ARRAY['research-discovery', 'collaboration', 'literature-mapping'], false, false),
  ('scite-ai', 'Scite AI', 'AI platform for discovering and evaluating scientific articles', 'https://scite.ai', 'business-research', 'Freemium', ARRAY['scientific-articles', 'citation-analysis', 'research-evaluation'], false, false),
  
  -- Business Intelligence & Market Analysis AI
  ('chartmetric-ai', 'Chartmetric AI', 'AI-powered music industry analytics and market research', 'https://chartmetric.com', 'business-research', 'Paid', ARRAY['music-analytics', 'market-research', 'industry-insights'], false, false),
  ('similarweb-ai', 'SimilarWeb AI', 'AI-powered digital market intelligence and website analytics', 'https://similarweb.com', 'business-research', 'Freemium', ARRAY['market-intelligence', 'website-analytics', 'competitor-analysis'], false, true),
  ('semrush-ai', 'SEMrush AI', 'AI-enhanced digital marketing and competitive research platform', 'https://semrush.com', 'business-research', 'Paid', ARRAY['seo-research', 'competitor-analysis', 'market-insights'], false, true),
  ('ahrefs-ai', 'Ahrefs AI', 'AI-powered SEO and market research tools', 'https://ahrefs.com', 'business-research', 'Paid', ARRAY['seo-research', 'backlink-analysis', 'market-research'], false, false),
  ('buzzsumo-ai', 'BuzzSumo AI', 'AI-powered content research and social media analytics', 'https://buzzsumo.com', 'business-research', 'Paid', ARRAY['content-research', 'social-media-analytics', 'trend-analysis'], false, false),
  ('brandwatch-ai', 'Brandwatch AI', 'AI-powered social listening and market research platform', 'https://brandwatch.com', 'business-research', 'Paid', ARRAY['social-listening', 'brand-monitoring', 'sentiment-analysis'], false, false),
  ('sprout-social-ai', 'Sprout Social AI', 'AI-enhanced social media management and research tools', 'https://sproutsocial.com', 'business-research', 'Paid', ARRAY['social-media-research', 'audience-insights', 'competitive-analysis'], false, false),
  ('hootsuite-insights', 'Hootsuite Insights', 'AI-powered social media analytics and market research', 'https://hootsuite.com/products/insights', 'business-research', 'Paid', ARRAY['social-analytics', 'market-research', 'trend-monitoring'], false, false),
  
  -- Financial Research & Analysis AI
  ('bloomberg-terminal-ai', 'Bloomberg Terminal AI', 'AI-enhanced financial research and market data platform', 'https://bloomberg.com/professional/solution/bloomberg-terminal', 'business-research', 'Paid', ARRAY['financial-research', 'market-data', 'trading-insights'], false, false),
  ('refinitiv-ai', 'Refinitiv AI', 'AI-powered financial market data and research platform', 'https://refinitiv.com', 'business-research', 'Paid', ARRAY['financial-data', 'market-research', 'risk-analytics'], false, false),
  ('factset-ai', 'FactSet AI', 'AI-enhanced financial data and analytics platform', 'https://factset.com', 'business-research', 'Paid', ARRAY['financial-analytics', 'investment-research', 'portfolio-analysis'], false, false),
  ('morningstar-ai', 'Morningstar AI', 'AI-powered investment research and analysis platform', 'https://morningstar.com', 'business-research', 'Freemium', ARRAY['investment-research', 'fund-analysis', 'financial-planning'], false, false),
  ('s-p-capital-iq', 'S&P Capital IQ AI', 'AI-enhanced financial intelligence and market research', 'https://capitaliq.com', 'business-research', 'Paid', ARRAY['financial-intelligence', 'market-research', 'credit-analysis'], false, false),
  ('pitchbook-ai', 'PitchBook AI', 'AI-powered private market research and analysis', 'https://pitchbook.com', 'business-research', 'Paid', ARRAY['private-markets', 'venture-capital', 'market-research'], false, false),
  ('crunchbase-ai', 'Crunchbase AI', 'AI-enhanced startup and business research platform', 'https://crunchbase.com', 'business-research', 'Freemium', ARRAY['startup-research', 'funding-analysis', 'company-insights'], false, false),
  
  -- Consumer & Market Research AI
  ('qualtrics-ai', 'Qualtrics AI', 'AI-powered experience management and market research platform', 'https://qualtrics.com', 'business-research', 'Paid', ARRAY['market-research', 'survey-analysis', 'customer-insights'], false, false),
  ('surveymonkey-ai', 'SurveyMonkey AI', 'AI-enhanced survey platform for market research', 'https://surveymonkey.com', 'business-research', 'Freemium', ARRAY['survey-research', 'market-insights', 'data-analysis'], false, false),
  ('typeform-ai', 'Typeform AI', 'AI-powered form builder for research and data collection', 'https://typeform.com', 'business-research', 'Freemium', ARRAY['data-collection', 'interactive-forms', 'research-tools'], false, false),
  ('google-surveys-ai', 'Google Surveys AI', 'AI-enhanced market research and consumer insights platform', 'https://surveys.withgoogle.com', 'business-research', 'Paid', ARRAY['market-research', 'consumer-insights', 'survey-analytics'], false, false),
  ('uservoice-ai', 'UserVoice AI', 'AI-powered customer feedback and research platform', 'https://uservoice.com', 'business-research', 'Paid', ARRAY['customer-feedback', 'product-research', 'user-insights'], false, false),
  ('hotjar-ai', 'Hotjar AI', 'AI-enhanced user behavior analytics and research tools', 'https://hotjar.com', 'business-research', 'Freemium', ARRAY['user-behavior', 'heatmap-analysis', 'session-recording'], false, false),
  ('fullstory-ai', 'FullStory AI', 'AI-powered digital experience analytics and research', 'https://fullstory.com', 'business-research', 'Paid', ARRAY['digital-analytics', 'user-research', 'behavior-analysis'], false, false),
  
  -- Competitive Intelligence AI
  ('owler-ai', 'Owler AI', 'AI-powered competitive intelligence and business insights', 'https://owler.com', 'business-research', 'Freemium', ARRAY['competitive-intelligence', 'company-insights', 'market-monitoring'], false, false),
  ('klenty-research', 'Klenty Research', 'AI-powered sales intelligence and prospect research', 'https://klenty.com', 'business-research', 'Paid', ARRAY['sales-intelligence', 'prospect-research', 'lead-generation'], false, false),
  ('zoominfo-ai', 'ZoomInfo AI', 'AI-enhanced business intelligence and contact research', 'https://zoominfo.com', 'business-research', 'Paid', ARRAY['business-intelligence', 'contact-research', 'sales-insights'], false, false),
  ('apollo-ai', 'Apollo AI', 'AI-powered sales intelligence and lead research platform', 'https://apollo.io', 'business-research', 'Freemium', ARRAY['sales-intelligence', 'lead-research', 'contact-discovery'], false, false),
  ('hunter-ai', 'Hunter AI', 'AI-enhanced email finder and company research tool', 'https://hunter.io', 'business-research', 'Freemium', ARRAY['email-research', 'contact-discovery', 'company-insights'], false, false),
  ('clearbit-ai', 'Clearbit AI', 'AI-powered business intelligence and data enrichment', 'https://clearbit.com', 'business-research', 'Paid', ARRAY['data-enrichment', 'company-research', 'lead-intelligence'], false, false),
  ('lusha-ai', 'Lusha AI', 'AI-enhanced prospect research and contact discovery', 'https://lusha.com', 'business-research', 'Freemium', ARRAY['prospect-research', 'contact-discovery', 'sales-intelligence'], false, false),
  
  -- Industry Research & Analysis AI
  ('gartner-ai', 'Gartner AI Research', 'AI-enhanced technology research and market analysis', 'https://gartner.com', 'business-research', 'Paid', ARRAY['technology-research', 'market-analysis', 'industry-insights'], false, false),
  ('forrester-ai', 'Forrester AI', 'AI-powered business and technology research platform', 'https://forrester.com', 'business-research', 'Paid', ARRAY['business-research', 'technology-insights', 'market-trends'], false, false),
  ('idc-ai', 'IDC AI Research', 'AI-enhanced IT market research and analysis', 'https://idc.com', 'business-research', 'Paid', ARRAY['it-research', 'market-sizing', 'technology-trends'], false, false),
  ('mckinsey-insights-ai', 'McKinsey Insights AI', 'AI-powered business research and strategic insights', 'https://mckinsey.com/insights', 'business-research', 'Free', ARRAY['strategic-insights', 'business-research', 'industry-analysis'], false, false),
  ('bcg-insights-ai', 'BCG Insights AI', 'AI-enhanced business strategy and market research', 'https://bcg.com/insights', 'business-research', 'Free', ARRAY['strategy-research', 'market-insights', 'business-trends'], false, false),
  ('deloitte-insights-ai', 'Deloitte Insights AI', 'AI-powered business and industry research platform', 'https://deloitte.com/insights', 'business-research', 'Free', ARRAY['industry-research', 'business-insights', 'trend-analysis'], false, false),
  ('pwc-research-ai', 'PwC Research AI', 'AI-enhanced business research and market intelligence', 'https://pwc.com/insights', 'business-research', 'Free', ARRAY['business-research', 'market-intelligence', 'industry-trends'], false, false),
  
  -- Patent & IP Research AI
  ('google-patents-ai', 'Google Patents AI', 'AI-powered patent search and research platform', 'https://patents.google.com', 'business-research', 'Free', ARRAY['patent-search', 'ip-research', 'innovation-analysis'], false, false),
  ('patentscope-ai', 'PATENTSCOPE AI', 'AI-enhanced international patent search and analysis', 'https://patentscope.wipo.int', 'business-research', 'Free', ARRAY['patent-research', 'ip-analysis', 'global-patents'], false, false),
  ('lens-ai', 'The Lens AI', 'AI-powered patent and scholarly research platform', 'https://lens.org', 'business-research', 'Freemium', ARRAY['patent-analysis', 'scholarly-research', 'innovation-mapping'], false, false),
  ('clarivate-ai', 'Clarivate AI', 'AI-enhanced intellectual property and research analytics', 'https://clarivate.com', 'business-research', 'Paid', ARRAY['ip-analytics', 'research-intelligence', 'patent-analysis'], false, false),
  ('questel-ai', 'Questel AI', 'AI-powered intellectual property research and analytics', 'https://questel.com', 'business-research', 'Paid', ARRAY['ip-research', 'patent-analytics', 'trademark-search'], false, false),
  
  -- Academic & Scientific Research AI
  ('connected-papers', 'Connected Papers AI', 'AI-powered research paper discovery and visualization', 'https://connectedpapers.com', 'business-research', 'Freemium', ARRAY['research-discovery', 'paper-visualization', 'literature-mapping'], false, false),
  ('iris-ai', 'IRIS.AI', 'AI-powered research and knowledge discovery platform', 'https://iris.ai', 'business-research', 'Paid', ARRAY['knowledge-discovery', 'research-assistant', 'content-analysis'], false, false),
  ('scholarcy-ai', 'Scholarcy AI', 'AI-powered research paper summarization and analysis', 'https://scholarcy.com', 'business-research', 'Freemium', ARRAY['paper-summarization', 'research-analysis', 'key-insights'], false, false),
  ('scispace-ai', 'SciSpace AI', 'AI-enhanced research paper reading and analysis platform', 'https://scispace.com', 'business-research', 'Freemium', ARRAY['paper-analysis', 'research-assistant', 'scientific-reading'], false, false),
  ('paperpal-ai', 'Paperpal AI', 'AI-powered academic writing and research assistance', 'https://paperpal.com', 'business-research', 'Freemium', ARRAY['academic-writing', 'research-assistance', 'language-enhancement'], false, false),
  ('zeta-alpha-ai', 'Zeta Alpha AI', 'AI-powered research discovery and knowledge management', 'https://zeta-alpha.com', 'business-research', 'Paid', ARRAY['research-discovery', 'knowledge-management', 'ai-insights'], false, false),
  
  -- News & Media Research AI
  ('moreover-ai', 'Moreover AI', 'AI-powered news and media intelligence platform', 'https://moreover.com', 'business-research', 'Paid', ARRAY['news-intelligence', 'media-monitoring', 'content-analysis'], false, false),
  ('factiva-ai', 'Factiva AI', 'AI-enhanced news and business information research', 'https://factiva.com', 'business-research', 'Paid', ARRAY['news-research', 'business-intelligence', 'content-discovery'], false, false),
  ('lexisnexis-news-ai', 'LexisNexis News AI', 'AI-powered news research and media analysis', 'https://lexisnexis.com/en-us/products/nexis.page', 'business-research', 'Paid', ARRAY['news-analysis', 'media-research', 'legal-intelligence'], false, false),
  ('meltwater-ai', 'Meltwater AI', 'AI-enhanced media intelligence and social listening', 'https://meltwater.com', 'business-research', 'Paid', ARRAY['media-intelligence', 'social-listening', 'brand-monitoring'], false, false),
  ('cision-ai', 'Cision AI', 'AI-powered media monitoring and research platform', 'https://cision.com', 'business-research', 'Paid', ARRAY['media-monitoring', 'pr-research', 'influencer-analysis'], false, false),
  ('critical-mention-ai', 'Critical Mention AI', 'AI-enhanced broadcast and online media monitoring', 'https://criticalmention.com', 'business-research', 'Paid', ARRAY['broadcast-monitoring', 'media-analysis', 'content-tracking'], false, false),
  
  -- Data Mining & Web Research AI
  ('import-io-ai', 'Import.io AI', 'AI-powered web data extraction and research platform', 'https://import.io', 'business-research', 'Paid', ARRAY['web-scraping', 'data-extraction', 'automated-research'], false, false),
  ('octoparse-ai', 'Octoparse AI', 'AI-enhanced web scraping and data collection tool', 'https://octoparse.com', 'business-research', 'Freemium', ARRAY['web-scraping', 'data-collection', 'automated-extraction'], false, false),
  ('diffbot-ai', 'Diffbot AI', 'AI-powered web data extraction and knowledge graph', 'https://diffbot.com', 'business-research', 'Paid', ARRAY['web-extraction', 'knowledge-graph', 'structured-data'], false, false),
  ('scrapehero-ai', 'ScrapeHero AI', 'AI-enhanced web scraping and data research services', 'https://scrapehero.com', 'business-research', 'Paid', ARRAY['web-scraping', 'data-research', 'custom-extraction'], false, false),
  ('apify-ai', 'Apify AI', 'AI-powered web scraping and automation platform', 'https://apify.com', 'business-research', 'Freemium', ARRAY['web-automation', 'data-extraction', 'scraping-tools'], false, false),
  ('bright-data-ai', 'Bright Data AI', 'AI-enhanced web data collection and research platform', 'https://brightdata.com', 'business-research', 'Paid', ARRAY['web-data', 'proxy-networks', 'data-collection'], false, false),
  
  -- Survey & Research Analytics AI
  ('survicate-ai', 'Survicate AI', 'AI-powered customer research and feedback platform', 'https://survicate.com', 'business-research', 'Freemium', ARRAY['customer-research', 'feedback-analysis', 'survey-automation'], false, false),
  ('asknicely-ai', 'AskNicely AI', 'AI-enhanced customer experience research and NPS tracking', 'https://asknicely.com', 'business-research', 'Paid', ARRAY['nps-research', 'customer-experience', 'feedback-automation'], false, false),
  ('delighted-ai', 'Delighted AI', 'AI-powered customer feedback and research platform', 'https://delighted.com', 'business-research', 'Freemium', ARRAY['customer-feedback', 'satisfaction-research', 'experience-tracking'], false, false),
  ('usabilla-ai', 'Usabilla AI', 'AI-enhanced user experience research and feedback collection', 'https://usabilla.com', 'business-research', 'Paid', ARRAY['ux-research', 'user-feedback', 'experience-optimization'], false, false),
  ('userreport-ai', 'UserReport AI', 'AI-powered website research and user insights platform', 'https://userreport.com', 'business-research', 'Freemium', ARRAY['website-research', 'user-insights', 'audience-analysis'], false, false),
  ('pollfish-ai', 'Pollfish AI', 'AI-enhanced mobile survey platform for market research', 'https://pollfish.com', 'business-research', 'Paid', ARRAY['mobile-surveys', 'market-research', 'real-time-insights'], false, false),
  
  -- Trend Analysis & Forecasting AI
  ('google-trends-ai', 'Google Trends AI', 'AI-enhanced search trend analysis and market insights', 'https://trends.google.com', 'business-research', 'Free', ARRAY['trend-analysis', 'search-insights', 'market-trends'], false, true),
  ('exploding-topics-ai', 'Exploding Topics AI', 'AI-powered trend discovery and market research platform', 'https://explodingtopics.com', 'business-research', 'Freemium', ARRAY['trend-discovery', 'market-insights', 'emerging-trends'], false, false),
  ('trendhunter-ai', 'TrendHunter AI', 'AI-enhanced trend research and innovation platform', 'https://trendhunter.com', 'business-research', 'Freemium', ARRAY['trend-research', 'innovation-insights', 'market-analysis'], false, false),
  ('sparktoro-ai', 'SparkToro AI', 'AI-powered audience research and trend analysis', 'https://sparktoro.com', 'business-research', 'Freemium', ARRAY['audience-research', 'trend-analysis', 'market-intelligence'], false, false),
  ('trendscope-ai', 'TrendScope AI', 'AI-enhanced social media trend analysis and research', 'https://trendscope.co', 'business-research', 'Paid', ARRAY['social-trends', 'trend-analysis', 'influencer-research'], false, false),
  ('glimpse-ai', 'Glimpse AI', 'AI-powered trend discovery and market research platform', 'https://meetglimpse.com', 'business-research', 'Paid', ARRAY['trend-discovery', 'market-research', 'consumer-insights'], false, false),
  
  -- B2B Research & Lead Intelligence AI
  ('leadiq-ai', 'LeadIQ AI', 'AI-powered prospecting and lead research platform', 'https://leadiq.com', 'business-research', 'Paid', ARRAY['lead-research', 'prospecting', 'sales-intelligence'], false, false),
  ('outreach-ai', 'Outreach AI', 'AI-enhanced sales intelligence and prospect research', 'https://outreach.io', 'business-research', 'Paid', ARRAY['sales-intelligence', 'prospect-research', 'account-insights'], false, false),
  ('salesloft-ai', 'SalesLoft AI', 'AI-powered sales research and engagement platform', 'https://salesloft.com', 'business-research', 'Paid', ARRAY['sales-research', 'prospect-intelligence', 'account-analysis'], false, false),
  ('seamless-ai', 'Seamless.AI', 'AI-powered sales intelligence and lead research platform', 'https://seamless.ai', 'business-research', 'Freemium', ARRAY['lead-research', 'contact-discovery', 'sales-intelligence'], false, false),
  ('rocketreach-ai', 'RocketReach AI', 'AI-enhanced contact research and lead generation', 'https://rocketreach.co', 'business-research', 'Freemium', ARRAY['contact-research', 'lead-generation', 'prospect-discovery'], false, false),
  ('cognism-ai', 'Cognism AI', 'AI-powered B2B research and lead intelligence platform', 'https://cognism.com', 'business-research', 'Paid', ARRAY['b2b-research', 'lead-intelligence', 'contact-discovery'], false, false),
  
  -- Real Estate & Property Research AI
  ('realty-mole-ai', 'Realty Mole AI', 'AI-powered real estate research and property analysis', 'https://realtymole.com', 'business-research', 'Freemium', ARRAY['real-estate-research', 'property-analysis', 'market-data'], false, false),
  ('propstream-ai', 'PropStream AI', 'AI-enhanced real estate investment research platform', 'https://propstream.com', 'business-research', 'Paid', ARRAY['real-estate-investing', 'property-research', 'market-analysis'], false, false),
  ('reonomy-ai', 'Reonomy AI', 'AI-powered commercial real estate research and analytics', 'https://reonomy.com', 'business-research', 'Paid', ARRAY['commercial-real-estate', 'property-intelligence', 'market-research'], false, false),
  ('costar-ai', 'CoStar AI', 'AI-enhanced commercial real estate research and analysis', 'https://costar.com', 'business-research', 'Paid', ARRAY['commercial-real-estate', 'market-research', 'property-analytics'], false, false),
  ('crexi-ai', 'CREXi AI', 'AI-powered commercial real estate marketplace and research', 'https://crexi.com', 'business-research', 'Freemium', ARRAY['commercial-real-estate', 'property-research', 'market-intelligence'], false, false),
  
  -- E-commerce & Retail Research AI
  ('jungle-scout-ai', 'Jungle Scout AI', 'AI-powered Amazon and e-commerce market research', 'https://junglescout.com', 'business-research', 'Paid', ARRAY['amazon-research', 'product-research', 'market-analysis'], false, false),
  ('helium10-ai', 'Helium 10 AI', 'AI-enhanced Amazon seller research and analytics platform', 'https://helium10.com', 'business-research', 'Freemium', ARRAY['amazon-analytics', 'product-research', 'keyword-research'], false, false),
  ('viral-launch-ai', 'Viral Launch AI', 'AI-powered Amazon product research and market intelligence', 'https://virallaunch.com', 'business-research', 'Paid', ARRAY['amazon-research', 'product-intelligence', 'competitor-analysis'], false, false),
  ('sellics-ai', 'Sellics AI', 'AI-enhanced Amazon optimization and research platform', 'https://sellics.com', 'business-research', 'Paid', ARRAY['amazon-optimization', 'market-research', 'competitor-intelligence'], false, false),
  ('amzscout-ai', 'AMZScout AI', 'AI-powered Amazon product research and analysis tool', 'https://amzscout.net', 'business-research', 'Paid', ARRAY['amazon-research', 'product-analysis', 'market-intelligence'], false, false),
  
  -- Specialized Research AI Tools
  ('research-gate-ai', 'ResearchGate AI', 'AI-enhanced academic research network and collaboration', 'https://researchgate.net', 'business-research', 'Free', ARRAY['academic-research', 'research-collaboration', 'scientific-networking'], false, false),
  ('academia-ai', 'Academia.edu AI', 'AI-powered academic research sharing and discovery platform', 'https://academia.edu', 'business-research', 'Freemium', ARRAY['academic-research', 'research-sharing', 'scholarly-networking'], false, false),
  ('mendeley-ai', 'Mendeley AI', 'AI-enhanced reference management and research collaboration', 'https://mendeley.com', 'business-research', 'Freemium', ARRAY['reference-management', 'research-collaboration', 'academic-networking'], false, false),
  ('zotero-ai', 'Zotero AI', 'AI-powered research tool for collecting and organizing sources', 'https://zotero.org', 'business-research', 'Free', ARRAY['research-organization', 'citation-management', 'source-collection'], false, false),
  ('dimensions-ai', 'Dimensions AI', 'AI-enhanced research analytics and discovery platform', 'https://dimensions.ai', 'business-research', 'Freemium', ARRAY['research-analytics', 'citation-analysis', 'research-metrics'], false, false)
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'business-research'
) 
WHERE id = 'business-research';
