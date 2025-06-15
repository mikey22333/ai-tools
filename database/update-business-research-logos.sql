-- Update Business Research Tools with Logo URLs
-- This script adds logo URLs to the existing business research tools

-- Market Research & Intelligence AI Tools
UPDATE tools SET logo_url = 'https://www.perplexity.ai/favicon.ico' WHERE id = 'perplexity-research' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://consensus.app/favicon.ico' WHERE id = 'consensus-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://elicit.org/favicon.ico' WHERE id = 'elicit-research' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://semanticscholar.org/favicon.ico' WHERE id = 'semantic-scholar-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://you.com/favicon.ico' WHERE id = 'you-com-research' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://metaphor.systems/favicon.ico' WHERE id = 'metaphor-search' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://researchrabbit.ai/favicon.ico' WHERE id = 'research-rabbit' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://scite.ai/favicon.ico' WHERE id = 'scite-ai' AND category_id = 'business-research';

-- Business Intelligence & Market Analysis AI
UPDATE tools SET logo_url = 'https://chartmetric.com/favicon.ico' WHERE id = 'chartmetric-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://similarweb.com/favicon.ico' WHERE id = 'similarweb-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://semrush.com/favicon.ico' WHERE id = 'semrush-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://ahrefs.com/favicon.ico' WHERE id = 'ahrefs-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://buzzsumo.com/favicon.ico' WHERE id = 'buzzsumo-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://brandwatch.com/favicon.ico' WHERE id = 'brandwatch-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://sproutsocial.com/favicon.ico' WHERE id = 'sprout-social-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://hootsuite.com/favicon.ico' WHERE id = 'hootsuite-insights' AND category_id = 'business-research';

-- Financial Research & Analysis AI
UPDATE tools SET logo_url = 'https://bloomberg.com/favicon.ico' WHERE id = 'bloomberg-terminal-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://refinitiv.com/favicon.ico' WHERE id = 'refinitiv-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://factset.com/favicon.ico' WHERE id = 'factset-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://morningstar.com/favicon.ico' WHERE id = 'morningstar-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://capitaliq.com/favicon.ico' WHERE id = 's-p-capital-iq' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://pitchbook.com/favicon.ico' WHERE id = 'pitchbook-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://crunchbase.com/favicon.ico' WHERE id = 'crunchbase-ai' AND category_id = 'business-research';

-- Consumer & Market Research AI
UPDATE tools SET logo_url = 'https://qualtrics.com/favicon.ico' WHERE id = 'qualtrics-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://surveymonkey.com/favicon.ico' WHERE id = 'surveymonkey-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://typeform.com/favicon.ico' WHERE id = 'typeform-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://surveys.withgoogle.com/favicon.ico' WHERE id = 'google-surveys-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://uservoice.com/favicon.ico' WHERE id = 'uservoice-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://hotjar.com/favicon.ico' WHERE id = 'hotjar-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://fullstory.com/favicon.ico' WHERE id = 'fullstory-ai' AND category_id = 'business-research';

-- Competitive Intelligence AI
UPDATE tools SET logo_url = 'https://owler.com/favicon.ico' WHERE id = 'owler-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://klenty.com/favicon.ico' WHERE id = 'klenty-research' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://zoominfo.com/favicon.ico' WHERE id = 'zoominfo-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://apollo.io/favicon.ico' WHERE id = 'apollo-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://hunter.io/favicon.ico' WHERE id = 'hunter-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://clearbit.com/favicon.ico' WHERE id = 'clearbit-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://lusha.com/favicon.ico' WHERE id = 'lusha-ai' AND category_id = 'business-research';

-- Industry Research & Analysis AI
UPDATE tools SET logo_url = 'https://gartner.com/favicon.ico' WHERE id = 'gartner-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://forrester.com/favicon.ico' WHERE id = 'forrester-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://idc.com/favicon.ico' WHERE id = 'idc-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://mckinsey.com/favicon.ico' WHERE id = 'mckinsey-insights-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://bcg.com/favicon.ico' WHERE id = 'bcg-insights-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://deloitte.com/favicon.ico' WHERE id = 'deloitte-insights-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://pwc.com/favicon.ico' WHERE id = 'pwc-research-ai' AND category_id = 'business-research';

-- Patent & IP Research AI
UPDATE tools SET logo_url = 'https://patents.google.com/favicon.ico' WHERE id = 'google-patents-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://patentscope.wipo.int/favicon.ico' WHERE id = 'patentscope-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://lens.org/favicon.ico' WHERE id = 'lens-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://clarivate.com/favicon.ico' WHERE id = 'clarivate-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://questel.com/favicon.ico' WHERE id = 'questel-ai' AND category_id = 'business-research';

-- Academic & Scientific Research AI
UPDATE tools SET logo_url = 'https://connectedpapers.com/favicon.ico' WHERE id = 'connected-papers' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://iris.ai/favicon.ico' WHERE id = 'iris-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://scholarcy.com/favicon.ico' WHERE id = 'scholarcy-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://scispace.com/favicon.ico' WHERE id = 'scispace-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://paperpal.com/favicon.ico' WHERE id = 'paperpal-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://zeta-alpha.com/favicon.ico' WHERE id = 'zeta-alpha-ai' AND category_id = 'business-research';

-- News & Media Research AI
UPDATE tools SET logo_url = 'https://moreover.com/favicon.ico' WHERE id = 'moreover-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://factiva.com/favicon.ico' WHERE id = 'factiva-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://lexisnexis.com/favicon.ico' WHERE id = 'lexisnexis-news-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://meltwater.com/favicon.ico' WHERE id = 'meltwater-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://cision.com/favicon.ico' WHERE id = 'cision-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://criticalmention.com/favicon.ico' WHERE id = 'critical-mention-ai' AND category_id = 'business-research';

-- Data Mining & Web Research AI
UPDATE tools SET logo_url = 'https://import.io/favicon.ico' WHERE id = 'import-io-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://octoparse.com/favicon.ico' WHERE id = 'octoparse-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://diffbot.com/favicon.ico' WHERE id = 'diffbot-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://scrapehero.com/favicon.ico' WHERE id = 'scrapehero-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://apify.com/favicon.ico' WHERE id = 'apify-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://brightdata.com/favicon.ico' WHERE id = 'bright-data-ai' AND category_id = 'business-research';

-- Survey & Research Analytics AI
UPDATE tools SET logo_url = 'https://survicate.com/favicon.ico' WHERE id = 'survicate-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://asknicely.com/favicon.ico' WHERE id = 'asknicely-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://delighted.com/favicon.ico' WHERE id = 'delighted-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://usabilla.com/favicon.ico' WHERE id = 'usabilla-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://userreport.com/favicon.ico' WHERE id = 'userreport-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://pollfish.com/favicon.ico' WHERE id = 'pollfish-ai' AND category_id = 'business-research';

-- Trend Analysis & Forecasting AI
UPDATE tools SET logo_url = 'https://trends.google.com/favicon.ico' WHERE id = 'google-trends-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://explodingtopics.com/favicon.ico' WHERE id = 'exploding-topics-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://trendhunter.com/favicon.ico' WHERE id = 'trendhunter-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://sparktoro.com/favicon.ico' WHERE id = 'sparktoro-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://trendscope.co/favicon.ico' WHERE id = 'trendscope-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://meetglimpse.com/favicon.ico' WHERE id = 'glimpse-ai' AND category_id = 'business-research';

-- B2B Research & Lead Intelligence AI
UPDATE tools SET logo_url = 'https://leadiq.com/favicon.ico' WHERE id = 'leadiq-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://outreach.io/favicon.ico' WHERE id = 'outreach-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://salesloft.com/favicon.ico' WHERE id = 'salesloft-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://seamless.ai/favicon.ico' WHERE id = 'seamless-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://rocketreach.co/favicon.ico' WHERE id = 'rocketreach-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://cognism.com/favicon.ico' WHERE id = 'cognism-ai' AND category_id = 'business-research';

-- Real Estate & Property Research AI
UPDATE tools SET logo_url = 'https://realtymole.com/favicon.ico' WHERE id = 'realty-mole-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://propstream.com/favicon.ico' WHERE id = 'propstream-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://reonomy.com/favicon.ico' WHERE id = 'reonomy-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://costar.com/favicon.ico' WHERE id = 'costar-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://crexi.com/favicon.ico' WHERE id = 'crexi-ai' AND category_id = 'business-research';

-- E-commerce & Retail Research AI
UPDATE tools SET logo_url = 'https://junglescout.com/favicon.ico' WHERE id = 'jungle-scout-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://helium10.com/favicon.ico' WHERE id = 'helium10-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://virallaunch.com/favicon.ico' WHERE id = 'viral-launch-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://sellics.com/favicon.ico' WHERE id = 'sellics-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://amzscout.net/favicon.ico' WHERE id = 'amzscout-ai' AND category_id = 'business-research';

-- Specialized Research AI Tools
UPDATE tools SET logo_url = 'https://researchgate.net/favicon.ico' WHERE id = 'research-gate-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://academia.edu/favicon.ico' WHERE id = 'academia-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://mendeley.com/favicon.ico' WHERE id = 'mendeley-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://zotero.org/favicon.ico' WHERE id = 'zotero-ai' AND category_id = 'business-research';
UPDATE tools SET logo_url = 'https://dimensions.ai/favicon.ico' WHERE id = 'dimensions-ai' AND category_id = 'business-research';

-- Add AI-themed placeholders for tools that might not have accessible favicons
UPDATE tools SET logo_url = 'https://via.placeholder.com/64x64/6366f1/white?text=AI' WHERE logo_url IS NULL AND category_id = 'business-research';
