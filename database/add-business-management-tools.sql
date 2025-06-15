-- Business Management AI Tools (100 tools)
-- This script adds 100 AI-powered tools specifically for business management
-- Uses ON CONFLICT (id, category_id) DO NOTHING to avoid duplicates within the same category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending
) VALUES   -- CRM & Sales AI Tools
  ('salesforce-einstein', 'Salesforce Einstein', 'AI-powered CRM analytics and automation platform', 'https://salesforce.com/products/einstein', 'business-management', 'Paid', ARRAY['crm', 'sales-automation', 'analytics'], false, true),
  ('hubspot-ai', 'HubSpot AI', 'AI-powered marketing, sales, and service automation', 'https://hubspot.com/products/artificial-intelligence', 'business-management', 'Freemium', ARRAY['crm', 'marketing-automation', 'lead-generation'], false, true),
  ('pipedrive-ai', 'Pipedrive AI Sales Assistant', 'AI-powered sales pipeline management and forecasting', 'https://pipedrive.com/en/features/ai-sales-assistant', 'business-management', 'Paid', ARRAY['sales-pipeline', 'forecasting', 'deal-management'], false, false),
  ('zoho-zia', 'Zoho Zia', 'AI assistant for business process automation and analytics', 'https://zoho.com/zia', 'business-management', 'Paid', ARRAY['business-automation', 'analytics', 'voice-assistant'], false, false),
  ('monday-ai', 'Monday.com AI', 'AI-powered project management and workflow automation', 'https://monday.com/ai', 'business-management', 'Paid', ARRAY['project-management', 'workflow-automation', 'team-collaboration'], false, true),
  ('clickup-ai', 'ClickUp AI', 'AI writing assistant and task automation for project management', 'https://clickup.com/ai', 'business-management', 'Freemium', ARRAY['project-management', 'task-automation', 'ai-writing'], false, false),
  ('asana-intelligence', 'Asana Intelligence', 'AI-powered project insights and workflow optimization', 'https://asana.com/intelligence', 'business-management', 'Paid', ARRAY['project-insights', 'workflow-optimization', 'team-productivity'], false, false),
  ('notion-ai-business', 'Notion AI for Business', 'AI-powered workspace for business documentation and planning', 'https://notion.so/product/ai', 'business-management', 'Paid', ARRAY['documentation', 'business-planning', 'knowledge-management'], false, false),
    -- Financial AI Tools
  ('quickbooks-ai', 'QuickBooks AI', 'AI-powered accounting and financial management', 'https://quickbooks.intuit.com/ai', 'business-management', 'Paid', ARRAY['accounting', 'financial-management', 'expense-tracking'], false, false),
  ('xero-ai', 'Xero AI', 'Intelligent accounting software with AI-powered insights', 'https://xero.com/features/artificial-intelligence', 'business-management', 'Paid', ARRAY['accounting', 'financial-insights', 'invoice-automation'], false, false),
  ('sage-ai', 'Sage AI', 'AI-powered business management and accounting solutions', 'https://sage.com/en-us/sage-business-cloud/artificial-intelligence', 'business-management', 'Paid', ARRAY['accounting', 'business-intelligence', 'financial-planning'], false, false),
  ('fathom-ai', 'Fathom AI', 'AI-powered financial analysis and reporting', 'https://fathomhq.com', 'business-management', 'Paid', ARRAY['financial-analysis', 'reporting', 'business-intelligence'], false, false),
  ('botsify-finance', 'Botsify Finance', 'AI chatbots for financial services and customer support', 'https://botsify.com/finance', 'business-management', 'Freemium', ARRAY['chatbots', 'customer-support', 'financial-services'], false, false),
  ('planful-ai', 'Planful AI', 'AI-powered financial planning and analysis platform', 'https://planful.com/ai', 'business-management', 'Paid', ARRAY['financial-planning', 'budgeting', 'forecasting'], false, false),
  ('anaplan-ai', 'Anaplan AI', 'AI-driven business planning and performance management', 'https://anaplan.com/hyperblock/ai', 'business-management', 'Paid', ARRAY['business-planning', 'performance-management', 'predictive-analytics'], false, false),
  
  -- HR & Talent Management AI
  ('workday-ai', 'Workday AI', 'AI-powered human capital management and HR analytics', 'https://workday.com/en-us/products/artificial-intelligence.html', 'business-management', 'Paid', ARRAY['hr-management', 'talent-analytics', 'workforce-planning'], false, false),
  ('bamboohr-ai', 'BambooHR AI', 'AI-enhanced HR software for small and medium businesses', 'https://bamboohr.com/ai', 'business-management', 'Paid', ARRAY['hr-software', 'employee-management', 'performance-tracking'], false, false),
  ('indeed-ai-hiring', 'Indeed AI Hiring', 'AI-powered recruitment and talent acquisition', 'https://indeed.com/hire/ai-hiring', 'business-management', 'Freemium', ARRAY['recruitment', 'talent-acquisition', 'candidate-screening'], false, false),
  ('linkedin-talent-ai', 'LinkedIn Talent AI', 'AI-driven recruiting and talent insights', 'https://business.linkedin.com/talent-solutions/ai', 'business-management', 'Paid', ARRAY['recruiting', 'talent-insights', 'candidate-matching'], false, false),
  ('pymetrics-ai', 'Pymetrics AI', 'AI-powered talent assessment and job matching', 'https://pymetrics.ai', 'business-management', 'Paid', ARRAY['talent-assessment', 'job-matching', 'bias-reduction'], false, false),
  ('hirevue-ai', 'HireVue AI', 'AI-powered video interviewing and assessment platform', 'https://hirevue.com/products/ai-powered-hiring', 'business-management', 'Paid', ARRAY['video-interviewing', 'candidate-assessment', 'hiring-automation'], false, false),
  ('textio-ai', 'Textio AI', 'AI-powered writing platform for better job postings and communications', 'https://textio.com', 'business-management', 'Paid', ARRAY['job-postings', 'inclusive-language', 'communication-optimization'], false, false),
  
  -- Customer Service AI
  ('zendesk-ai', 'Zendesk AI', 'AI-powered customer service and support automation', 'https://zendesk.com/ai', 'business-management', 'Paid', ARRAY['customer-service', 'support-automation', 'ticket-routing'], false, false),
  ('freshdesk-ai', 'Freshdesk AI', 'AI-enhanced customer support and helpdesk software', 'https://freshdesk.com/ai', 'business-management', 'Freemium', ARRAY['helpdesk', 'customer-support', 'ai-automation'], false, false),
  ('intercom-ai', 'Intercom AI', 'AI-powered customer messaging and support platform', 'https://intercom.com/ai', 'business-management', 'Paid', ARRAY['customer-messaging', 'live-chat', 'support-automation'], false, false),
  ('drift-ai', 'Drift AI', 'AI-powered conversational marketing and sales platform', 'https://drift.com/ai', 'business-management', 'Paid', ARRAY['conversational-marketing', 'lead-qualification', 'sales-automation'], false, false),
  ('ada-ai', 'Ada AI', 'AI-powered customer service automation platform', 'https://ada.cx', 'business-management', 'Paid', ARRAY['customer-service-automation', 'chatbots', 'self-service'], false, false),
  ('helpshift-ai', 'Helpshift AI', 'AI-driven mobile-first customer support platform', 'https://helpshift.com/ai', 'business-management', 'Paid', ARRAY['mobile-support', 'in-app-messaging', 'ai-automation'], false, false),
  
  -- Business Intelligence & Analytics AI
  ('tableau-ai', 'Tableau AI', 'AI-powered data visualization and business intelligence', 'https://tableau.com/products/ai-analytics', 'business-management', 'Paid', ARRAY['data-visualization', 'business-intelligence', 'predictive-analytics'], false, false),
  ('power-bi-ai', 'Microsoft Power BI AI', 'AI-enhanced business analytics and reporting', 'https://powerbi.microsoft.com/ai', 'business-management', 'Paid', ARRAY['business-analytics', 'reporting', 'data-insights'], false, false),
  ('qlik-ai', 'Qlik AI', 'AI-powered associative analytics and business intelligence', 'https://qlik.com/ai', 'business-management', 'Paid', ARRAY['associative-analytics', 'data-discovery', 'augmented-intelligence'], false, false),
  ('looker-ai', 'Looker AI', 'AI-driven business intelligence and data platform', 'https://looker.com/ai', 'business-management', 'Paid', ARRAY['business-intelligence', 'data-modeling', 'automated-insights'], false, false),
  ('sisense-ai', 'Sisense AI', 'AI-powered analytics platform for complex data', 'https://sisense.com/ai', 'business-management', 'Paid', ARRAY['complex-analytics', 'data-fusion', 'automated-insights'], false, false),
  ('alteryx-ai', 'Alteryx AI', 'AI and machine learning platform for data analytics', 'https://alteryx.com/products/alteryx-ai-platform', 'business-management', 'Paid', ARRAY['data-analytics', 'machine-learning', 'predictive-modeling'], false, false),
  ('dataiku-ai', 'Dataiku AI', 'Collaborative data science and AI platform', 'https://dataiku.com', 'business-management', 'Paid', ARRAY['data-science', 'collaborative-ai', 'model-deployment'], false, false),
  
  -- Marketing AI Tools
  ('marketo-ai', 'Marketo AI', 'AI-powered marketing automation and lead management', 'https://marketo.com/ai', 'business-management', 'Paid', ARRAY['marketing-automation', 'lead-management', 'personalization'], false, false),
  ('pardot-ai', 'Pardot AI', 'AI-enhanced B2B marketing automation platform', 'https://pardot.com/ai', 'business-management', 'Paid', ARRAY['b2b-marketing', 'lead-nurturing', 'marketing-analytics'], false, false),
  ('mailchimp-ai', 'Mailchimp AI', 'AI-powered email marketing and audience insights', 'https://mailchimp.com/features/ai', 'business-management', 'Freemium', ARRAY['email-marketing', 'audience-insights', 'campaign-optimization'], false, false),
  ('constant-contact-ai', 'Constant Contact AI', 'AI-enhanced email marketing and automation', 'https://constantcontact.com/ai', 'business-management', 'Paid', ARRAY['email-marketing', 'automation', 'social-media-marketing'], false, false),
  ('adobe-sensei-marketing', 'Adobe Sensei Marketing', 'AI-powered marketing analytics and personalization', 'https://adobe.com/sensei/marketing-cloud.html', 'business-management', 'Paid', ARRAY['marketing-analytics', 'personalization', 'customer-journey'], false, false),
  ('optimizely-ai', 'Optimizely AI', 'AI-powered experimentation and optimization platform', 'https://optimizely.com/ai', 'business-management', 'Paid', ARRAY['a-b-testing', 'experimentation', 'conversion-optimization'], false, false),
  
  -- Supply Chain & Operations AI
  ('oracle-ai-scm', 'Oracle AI SCM', 'AI-powered supply chain management and logistics', 'https://oracle.com/scm/ai', 'business-management', 'Paid', ARRAY['supply-chain', 'logistics', 'demand-planning'], false, false),
  ('sap-ai-operations', 'SAP AI Operations', 'AI-driven enterprise operations and planning', 'https://sap.com/products/artificial-intelligence', 'business-management', 'Paid', ARRAY['enterprise-operations', 'resource-planning', 'process-optimization'], false, false),
  ('kinaxis-ai', 'Kinaxis AI', 'AI-powered supply chain planning and optimization', 'https://kinaxis.com/ai', 'business-management', 'Paid', ARRAY['supply-chain-planning', 'demand-sensing', 'risk-management'], false, false),
  ('blue-yonder-ai', 'Blue Yonder AI', 'AI-driven supply chain and retail optimization', 'https://blueyonder.com/solutions/ai', 'business-management', 'Paid', ARRAY['retail-optimization', 'inventory-management', 'demand-forecasting'], false, false),
  ('llamasoft-ai', 'Llamasoft AI', 'AI-powered supply chain design and optimization', 'https://llamasoft.com/ai', 'business-management', 'Paid', ARRAY['supply-chain-design', 'network-optimization', 'scenario-planning'], false, false),
  
  -- E-commerce AI Tools
  ('shopify-ai', 'Shopify AI', 'AI-powered e-commerce platform and tools', 'https://shopify.com/ai', 'business-management', 'Freemium', ARRAY['e-commerce', 'online-store', 'sales-optimization'], false, false),
  ('bigcommerce-ai', 'BigCommerce AI', 'AI-enhanced e-commerce platform and analytics', 'https://bigcommerce.com/ai', 'business-management', 'Paid', ARRAY['e-commerce-platform', 'sales-analytics', 'customer-insights'], false, false),
  ('magento-ai', 'Magento AI', 'AI-powered e-commerce solutions and personalization', 'https://magento.com/ai', 'business-management', 'Paid', ARRAY['e-commerce-solutions', 'personalization', 'recommendation-engine'], false, false),
  ('dynamic-yield-ai', 'Dynamic Yield AI', 'AI-powered personalization and optimization for e-commerce', 'https://dynamicyield.com', 'business-management', 'Paid', ARRAY['personalization', 'product-recommendations', 'conversion-optimization'], false, false),
  ('yotpo-ai', 'Yotpo AI', 'AI-powered customer reviews and loyalty platform', 'https://yotpo.com/ai', 'business-management', 'Paid', ARRAY['customer-reviews', 'loyalty-programs', 'user-generated-content'], false, false),
  
  -- Business Process Automation AI
  ('uipath-ai', 'UiPath AI', 'AI-powered robotic process automation platform', 'https://uipath.com/product/ai', 'business-management', 'Paid', ARRAY['robotic-process-automation', 'workflow-automation', 'document-processing'], false, false),
  ('automation-anywhere-ai', 'Automation Anywhere AI', 'AI-driven intelligent automation platform', 'https://automationanywhere.com/products/ai', 'business-management', 'Paid', ARRAY['intelligent-automation', 'bot-development', 'process-discovery'], false, false),
  ('blue-prism-ai', 'Blue Prism AI', 'AI-enhanced digital workforce and automation', 'https://blueprism.com/products/ai', 'business-management', 'Paid', ARRAY['digital-workforce', 'intelligent-automation', 'cognitive-automation'], false, false),
  ('microsoft-power-automate-ai', 'Microsoft Power Automate AI', 'AI-powered workflow automation and integration', 'https://powerautomate.microsoft.com/ai', 'business-management', 'Paid', ARRAY['workflow-automation', 'integration', 'ai-builder'], false, false),
  ('zapier-ai', 'Zapier AI', 'AI-enhanced app integration and workflow automation', 'https://zapier.com/ai', 'business-management', 'Freemium', ARRAY['app-integration', 'workflow-automation', 'no-code-automation'], false, true),
  
  -- Communication & Collaboration AI
  ('microsoft-teams-ai', 'Microsoft Teams AI', 'AI-powered collaboration and communication platform', 'https://microsoft.com/microsoft-teams/ai', 'business-management', 'Paid', ARRAY['team-collaboration', 'communication', 'meeting-intelligence'], false, false),
  ('slack-ai', 'Slack AI', 'AI-enhanced team communication and workflow platform', 'https://slack.com/ai', 'business-management', 'Freemium', ARRAY['team-communication', 'workflow-automation', 'knowledge-management'], false, false),
  ('zoom-ai', 'Zoom AI', 'AI-powered video conferencing and communication tools', 'https://zoom.us/ai', 'business-management', 'Freemium', ARRAY['video-conferencing', 'meeting-transcription', 'communication-analytics'], false, false),
  ('webex-ai', 'Webex AI', 'AI-enhanced video conferencing and collaboration suite', 'https://webex.com/ai', 'business-management', 'Paid', ARRAY['video-collaboration', 'meeting-insights', 'real-time-translation'], false, false),
  ('google-workspace-ai', 'Google Workspace AI', 'AI-powered productivity and collaboration tools', 'https://workspace.google.com/ai', 'business-management', 'Paid', ARRAY['productivity-suite', 'collaboration', 'document-intelligence'], false, false),
  
  -- Risk Management & Compliance AI
  ('thomson-reuters-ai', 'Thomson Reuters AI', 'AI-powered risk management and compliance solutions', 'https://thomsonreuters.com/ai', 'business-management', 'Paid', ARRAY['risk-management', 'compliance', 'regulatory-intelligence'], false, false),
  ('sas-ai-risk', 'SAS AI Risk', 'AI-driven risk analytics and fraud detection', 'https://sas.com/solutions/ai-risk', 'business-management', 'Paid', ARRAY['risk-analytics', 'fraud-detection', 'credit-risk'], false, false),
  ('fico-ai', 'FICO AI', 'AI-powered decision management and analytics', 'https://fico.com/en/products/fico-platform', 'business-management', 'Paid', ARRAY['decision-management', 'credit-scoring', 'fraud-prevention'], false, false),
  ('palantir-ai', 'Palantir AI', 'AI-powered data integration and analysis platform', 'https://palantir.com', 'business-management', 'Paid', ARRAY['data-integration', 'analytics', 'decision-support'], false, false),
  ('nice-actimize-ai', 'NICE Actimize AI', 'AI-driven financial crime and compliance solutions', 'https://niceactimize.com/ai', 'business-management', 'Paid', ARRAY['financial-crime', 'compliance', 'anti-money-laundering'], false, false),
  
  -- Business Intelligence Specialized AI
  ('sisense-for-cloud', 'Sisense for Cloud', 'AI-powered cloud analytics platform', 'https://sisense.com/platform/sisense-fusion', 'business-management', 'Paid', ARRAY['cloud-analytics', 'data-fusion', 'embedded-analytics'], false, false),
  ('thoughtspot-ai', 'ThoughtSpot AI', 'AI-powered search-driven analytics platform', 'https://thoughtspot.com/ai', 'business-management', 'Paid', ARRAY['search-analytics', 'natural-language-queries', 'augmented-analytics'], false, false),
  ('domo-ai', 'Domo AI', 'AI-enhanced business intelligence and data platform', 'https://domo.com/ai', 'business-management', 'Paid', ARRAY['business-intelligence', 'data-visualization', 'predictive-insights'], false, false),
  ('klipfolio-ai', 'Klipfolio AI', 'AI-powered dashboard and reporting platform', 'https://klipfolio.com/ai', 'business-management', 'Paid', ARRAY['dashboard-creation', 'kpi-monitoring', 'automated-reporting'], false, false),
  ('chartio-ai', 'Chartio AI', 'AI-driven business intelligence and data exploration', 'https://chartio.com/ai', 'business-management', 'Paid', ARRAY['data-exploration', 'visual-sql', 'collaborative-analytics'], false, false),
  
  -- Specialized Business AI Tools
  ('lexisnexis-ai', 'LexisNexis AI', 'AI-powered legal and business research platform', 'https://lexisnexis.com/ai', 'business-management', 'Paid', ARRAY['legal-research', 'compliance', 'business-intelligence'], false, false),
  ('kensho-ai', 'Kensho AI', 'AI-powered analytics for financial and business intelligence', 'https://kensho.com', 'business-management', 'Paid', ARRAY['financial-analytics', 'market-intelligence', 'document-analysis'], false, false),
  ('ayasdi-ai', 'Ayasdi AI', 'AI-powered machine intelligence for enterprise applications', 'https://ayasdi.com', 'business-management', 'Paid', ARRAY['machine-intelligence', 'automated-discovery', 'enterprise-ai'], false, false),
  ('h2o-ai-business', 'H2O.ai Business', 'AI and machine learning platform for business applications', 'https://h2o.ai/platform', 'business-management', 'Freemium', ARRAY['machine-learning', 'automl', 'model-deployment'], false, false),
  ('datarobot-business', 'DataRobot Business', 'Automated machine learning platform for business', 'https://datarobot.com', 'business-management', 'Paid', ARRAY['automated-ml', 'predictive-modeling', 'business-intelligence'], false, false),
  
  -- Inventory & Asset Management AI
  ('netstock-ai', 'Netstock AI', 'AI-powered inventory optimization and demand planning', 'https://netstock.com/ai', 'business-management', 'Paid', ARRAY['inventory-optimization', 'demand-planning', 'supply-chain'], false, false),
  ('lokad-ai', 'Lokad AI', 'AI-driven supply chain optimization and forecasting', 'https://lokad.com', 'business-management', 'Paid', ARRAY['supply-chain-optimization', 'probabilistic-forecasting', 'inventory-management'], false, false),
  ('relex-ai', 'RELEX AI', 'AI-powered retail planning and optimization', 'https://relexsolutions.com/ai', 'business-management', 'Paid', ARRAY['retail-planning', 'demand-forecasting', 'price-optimization'], false, false),
  ('toolsgroup-ai', 'ToolsGroup AI', 'AI-driven demand and inventory planning', 'https://toolsgroup.com/ai', 'business-management', 'Paid', ARRAY['demand-planning', 'inventory-optimization', 'service-optimization'], false, false),
  ('antuit-ai', 'Antuit.ai', 'AI-powered demand forecasting and inventory optimization', 'https://antuit.ai', 'business-management', 'Paid', ARRAY['demand-forecasting', 'price-optimization', 'promotion-planning'], false, false),
  
  -- Document Management AI
  ('abbyy-ai', 'ABBYY AI', 'AI-powered document processing and digital intelligence', 'https://abbyy.com/solutions/ai', 'business-management', 'Paid', ARRAY['document-processing', 'ocr', 'process-intelligence'], false, false),
  ('kofax-ai', 'Kofax AI', 'AI-enhanced document capture and process automation', 'https://kofax.com/products/ai', 'business-management', 'Paid', ARRAY['document-capture', 'process-automation', 'robotic-process-automation'], false, false),
  ('extractable-ai', 'Extractable AI', 'AI-powered document data extraction and processing', 'https://extractable.com', 'business-management', 'Paid', ARRAY['data-extraction', 'document-processing', 'workflow-automation'], false, false),
  ('rossum-ai', 'Rossum AI', 'AI-powered document processing and data extraction', 'https://rossum.ai', 'business-management', 'Paid', ARRAY['invoice-processing', 'document-automation', 'cognitive-data-capture'], false, false),
  ('hyperscience-ai', 'Hyperscience AI', 'AI-powered document processing and automation platform', 'https://hyperscience.com', 'business-management', 'Paid', ARRAY['document-automation', 'machine-learning', 'data-processing'], false, false),
  
  -- Quality Management AI
  ('minitab-ai', 'Minitab AI', 'AI-enhanced statistical software for quality improvement', 'https://minitab.com/ai', 'business-management', 'Paid', ARRAY['statistical-analysis', 'quality-improvement', 'predictive-analytics'], false, false),
  ('jmp-ai', 'JMP AI', 'AI-powered statistical discovery and quality management', 'https://jmp.com/ai', 'business-management', 'Paid', ARRAY['statistical-discovery', 'quality-management', 'data-visualization'], false, false),
  ('iqms-ai', 'IQMS AI', 'AI-enhanced manufacturing execution system', 'https://iqms.com/ai', 'business-management', 'Paid', ARRAY['manufacturing-execution', 'quality-control', 'production-optimization'], false, false),
  ('sight-machine-ai', 'Sight Machine AI', 'AI-powered manufacturing analytics and optimization', 'https://sightmachine.com', 'business-management', 'Paid', ARRAY['manufacturing-analytics', 'production-optimization', 'quality-intelligence'], false, false),
  ('augury-ai', 'Augury AI', 'AI-powered machine health and predictive maintenance', 'https://augury.com', 'business-management', 'Paid', ARRAY['predictive-maintenance', 'machine-health', 'industrial-iot'], false, false),
  
  -- Business Strategy AI
  ('mckinsey-lilli', 'McKinsey Lilli', 'AI-powered business insights and knowledge platform', 'https://mckinsey.com/capabilities/mckinsey-digital/our-insights/introducing-lilli', 'business-management', 'Paid', ARRAY['business-insights', 'knowledge-management', 'strategic-planning'], false, false),
  ('bcg-gamma-ai', 'BCG GAMMA AI', 'AI and advanced analytics for business transformation', 'https://bcg.com/x/artificial-intelligence', 'business-management', 'Paid', ARRAY['business-transformation', 'advanced-analytics', 'ai-strategy'], false, false),
  ('bain-ai', 'Bain AI', 'AI-powered business consulting and analytics tools', 'https://bain.com/consulting-services/advanced-analytics', 'business-management', 'Paid', ARRAY['business-consulting', 'performance-improvement', 'data-analytics'], false, false),
  ('ey-ai', 'EY AI', 'AI-powered business advisory and transformation services', 'https://ey.com/en_gl/artificial-intelligence', 'business-management', 'Paid', ARRAY['business-advisory', 'digital-transformation', 'risk-management'], false, false),
  ('deloitte-ai', 'Deloitte AI', 'AI-enhanced business consulting and technology solutions', 'https://deloitte.com/global/en/services/consulting/artificial-intelligence.html', 'business-management', 'Paid', ARRAY['business-consulting', 'technology-solutions', 'innovation-strategy'], false, false),
  
  -- Performance Management AI
  ('lattice-ai', 'Lattice AI', 'AI-powered performance management and people analytics', 'https://lattice.com/ai', 'business-management', 'Paid', ARRAY['performance-management', 'people-analytics', 'employee-engagement'], false, false),
  ('betterworks-ai', 'BetterWorks AI', 'AI-enhanced performance management and goal tracking', 'https://betterworks.com/ai', 'business-management', 'Paid', ARRAY['goal-tracking', 'performance-reviews', 'team-alignment'], false, false),
  ('15five-ai', '15Five AI', 'AI-powered employee engagement and performance platform', 'https://15five.com/ai', 'business-management', 'Paid', ARRAY['employee-engagement', 'performance-tracking', 'team-communication'], false, false),
  ('culture-amp-ai', 'Culture Amp AI', 'AI-driven employee feedback and culture analytics', 'https://cultureamp.com/ai', 'business-management', 'Paid', ARRAY['employee-feedback', 'culture-analytics', 'engagement-surveys'], false, false),
  ('glint-ai', 'Glint AI', 'AI-powered employee engagement and people analytics', 'https://glint.com/ai', 'business-management', 'Paid', ARRAY['employee-engagement', 'people-analytics', 'pulse-surveys'], false, false)
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'business-management'
) 
WHERE id = 'business-management';
