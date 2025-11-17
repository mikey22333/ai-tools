-- Add 50 New AI Tools - Batch 7
-- Collection of latest and trending AI tools across multiple categories
-- Last updated: October 2025
-- 
-- NOTE: Uses ON CONFLICT DO NOTHING to safely skip any tools that already exist
-- Will not create duplicates or throw errors if tools are already in the database

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
) VALUES 
  -- Coding & Development Tools
  ('dreamflow', 'Dreamflow', 'AI-powered Flutter app builder with tri-surface editing that seamlessly switches between AI prompts, visual canvas, and code. Build production-ready mobile apps with Firebase/Supabase integration and one-click deployment to App Store, Play Store & Web. Features context-aware AI generation that understands patterns and best practices.', 'The fastest way to build real mobile apps with AI, visual design, and code control', 'https://dreamflow.app/assets/DF_Logo_Small.svg', 'https://dreamflow.app/', 'coding-development', 'Freemium', ARRAY['app-builder', 'flutter', 'mobile-development', 'ai-coding', 'no-code', 'visual-development', 'firebase', 'supabase', 'app-deployment'], false, true, 4.7),
  
  ('kilocode', 'Kilo Code', 'Open-source AI coding assistant designed for planning, building, and fixing code with intelligent suggestions. Helps developers write better code faster with context-aware recommendations, automated debugging, and code optimization suggestions.', 'OSS AI coding assistant for planning, building & fixing code', NULL, 'https://kilocode.dev/', 'coding-development', 'Free', ARRAY['coding-assistant', 'open-source', 'code-generation', 'debugging', 'code-optimization', 'developer-tools'], false, true, 4.5),
  
  ('buildrrr', 'Buildrrr', 'AI-powered web development platform that helps you build and deploy websites faster. Features intelligent code generation, responsive design automation, and seamless deployment workflows for modern web applications.', 'Build and deploy websites faster with AI-powered development', NULL, 'https://buildrrr.com/', 'coding-development', 'Freemium', ARRAY['web-development', 'website-builder', 'ai-coding', 'deployment', 'responsive-design'], false, false, 4.3),
  
  ('tight-studio', 'Tight Studio', 'AI-enhanced design-to-code platform that converts designs into production-ready code. Streamlines the development workflow by automatically generating clean, maintainable code from design files with pixel-perfect accuracy.', 'Transform designs into production-ready code with AI', NULL, 'https://tight.studio/', 'coding-development', 'Paid', ARRAY['design-to-code', 'frontend-development', 'code-generation', 'design-tools', 'automation'], false, false, 4.4),
  
  ('crepal', 'CrePal', 'AI-powered creative development assistant for designers and developers. Combines design thinking with code generation to help create beautiful, functional digital products with intelligent automation and smart suggestions.', 'Creative development assistant combining design and code with AI', NULL, 'https://crepal.com/', 'coding-development', 'Freemium', ARRAY['creative-development', 'design-tools', 'code-generation', 'ai-assistant', 'productivity'], false, false, 4.2),

  -- Business & HR Management Tools
  ('voxcruit', 'Voxcruit', '24/7 AI interviewer that automates first-round candidate screening with async voice interviews. Features resume-aware AI questions, automated scoring with detailed summaries, and smart analytics dashboard. Reduces recruiter screening time by 40% and speeds up hiring 2.5x faster with bias-free candidate assessment.', 'Your 24/7 AI interviewer for automated candidate screening', 'https://www.voxcruit.com/logo.png', 'https://www.voxcruit.com/', 'business-management', 'Freemium', ARRAY['recruitment', 'ai-interviewer', 'hiring', 'hr-automation', 'candidate-screening', 'voice-interview', 'talent-acquisition', 'hr-tech'], false, true, 4.6),
  
  ('justpaid', 'JustPaid', 'AI-powered accounts receivable automation platform that streamlines invoice management, payment tracking, and collections. Automates follow-ups, predicts payment delays, and optimizes cash flow with intelligent insights.', 'Automate accounts receivable with AI-powered payment tracking', NULL, 'https://justpaid.io/', 'business-management', 'Paid', ARRAY['accounting', 'invoicing', 'payment-tracking', 'collections', 'cash-flow', 'financial-automation'], false, true, 4.5),
  
  ('assembly-ai-business', 'Assembly', 'AI-powered employee recognition and engagement platform. Automates team celebrations, tracks achievements, and builds company culture with intelligent recognition suggestions and analytics.', 'Build company culture with AI-powered employee recognition', NULL, 'https://assembly.com/', 'business-management', 'Freemium', ARRAY['employee-engagement', 'recognition', 'company-culture', 'hr-management', 'team-building'], false, false, 4.4),

  -- Office & Productivity Tools
  ('echo-now-ai', 'Echo Now AI', 'Intelligent Slack summaries that help you reclaim your day. Automatically generates concise summaries of Slack conversations, channels, and threads so you can stay updated without reading every message. Features smart prioritization and customizable digest schedules.', 'Intelligent Slack summaries to reclaim your day', 'https://echonow.ai/logo.png', 'https://echonow.ai/', 'office-productivity', 'Freemium', ARRAY['slack', 'productivity', 'summaries', 'team-communication', 'workflow-automation', 'time-management'], false, true, 4.5),
  
  ('timefly-dev', 'TimeFly Dev', 'AI-powered time tracking and project management tool specifically designed for developers. Automatically tracks coding time, analyzes productivity patterns, and provides insights to optimize development workflows.', 'AI time tracking and productivity insights for developers', NULL, 'https://timefly.dev/', 'office-productivity', 'Freemium', ARRAY['time-tracking', 'productivity', 'project-management', 'developer-tools', 'analytics'], false, false, 4.3),
  
  ('station-workspace', 'Station', 'AI-enhanced unified workspace that brings all your apps and tools into one place. Smart organization, intelligent search, and automated workflows to boost productivity and reduce context switching.', 'Unified workspace with AI-powered app organization', NULL, 'https://getstation.com/', 'office-productivity', 'Freemium', ARRAY['workspace', 'productivity', 'app-organization', 'workflow-automation', 'focus-tools'], false, false, 4.4),

  -- Education & Translation Tools
  ('creatium', 'Creatium', 'AI-powered platform for creating interactive learning experiences that engage students. Transform boring content into interactive lessons, quizzes, and educational materials with intelligent content generation and gamification features.', 'Make interactive learning content that actually engages students', 'https://creatium.io/logo.png', 'https://creatium.io/', 'education-translation', 'Freemium', ARRAY['education', 'e-learning', 'interactive-content', 'course-creation', 'gamification', 'student-engagement'], false, true, 4.6),
  
  ('latitude-learning', 'Latitude', 'AI-driven learning platform that personalizes educational content based on student performance and learning style. Adaptive algorithms create customized learning paths and provide real-time feedback.', 'Personalized learning with AI-driven adaptive education', NULL, 'https://latitude.so/', 'education-translation', 'Paid', ARRAY['adaptive-learning', 'personalized-education', 'student-analytics', 'learning-platform', 'ai-tutor'], false, false, 4.4),

  -- Marketing & Advertising Tools
  ('vidau-ai', 'VidAU', 'AI-powered video creation platform that generates professional marketing videos from text. Create engaging video content with AI avatars, voiceovers, and automatic editing for social media, ads, and product demos.', 'Generate professional marketing videos from text with AI', 'https://vidau.ai/logo.png', 'https://vidau.ai/', 'marketing-advertising', 'Freemium', ARRAY['video-creation', 'ai-video', 'marketing-videos', 'text-to-video', 'social-media', 'content-creation'], false, true, 4.5),
  
  ('prohostai', 'ProhostAI', 'AI-powered Airbnb and vacation rental management assistant. Automates guest communication, pricing optimization, and booking management with intelligent responses and dynamic pricing strategies.', 'AI assistant for vacation rental management and optimization', NULL, 'https://prohost.ai/', 'marketing-advertising', 'Paid', ARRAY['property-management', 'airbnb', 'automation', 'pricing-optimization', 'guest-communication'], false, false, 4.3),
  
  ('chargeflow-prevent', 'Chargeflow', 'AI-powered chargeback prevention and recovery platform for e-commerce businesses. Automatically fights chargebacks, reduces fraud, and recovers lost revenue with intelligent dispute management.', 'Automated chargeback prevention and recovery with AI', NULL, 'https://chargeflow.io/', 'marketing-advertising', 'Paid', ARRAY['chargeback-prevention', 'fraud-detection', 'e-commerce', 'payment-protection', 'revenue-recovery'], false, true, 4.6),

  -- Writing & Editing Tools
  ('dad-reply', 'Dad Reply', 'AI writing assistant that helps craft perfect dad jokes and humorous responses. Uses GPT technology to generate witty, family-friendly comebacks and conversational humor for any situation.', 'Generate perfect dad jokes and witty responses with AI', NULL, 'https://dadreply.com/', 'writing-editing', 'Free', ARRAY['humor', 'jokes', 'creative-writing', 'entertainment', 'conversation'], false, false, 4.2),
  
  ('mailtester-ai', 'MailTester.AI', 'AI-powered email testing and optimization tool. Analyzes email content, subject lines, and deliverability to improve open rates and engagement. Provides intelligent suggestions for better email marketing performance.', 'Test and optimize emails with AI-powered analysis', NULL, 'https://mailtester.ai/', 'writing-editing', 'Freemium', ARRAY['email-testing', 'email-marketing', 'optimization', 'deliverability', 'subject-lines'], false, false, 4.4),

  -- Image Generation & Editing Tools
  ('creao-ai', 'CREAO', 'AI-powered creative design platform for generating stunning visuals, graphics, and artwork. Features intelligent design suggestions, template customization, and brand-consistent asset creation.', 'Create stunning visuals with AI-powered design platform', 'https://creao.ai/logo.png', 'https://creao.ai/', 'image-generation-editing', 'Freemium', ARRAY['graphic-design', 'image-generation', 'creative-tools', 'branding', 'templates'], false, true, 4.5),
  
  ('atla-design', 'Atla', 'AI-enhanced design tool that helps create professional graphics and visual content. Combines machine learning with intuitive design tools for rapid prototyping and creative exploration.', 'Professional graphics and visual content with AI assistance', NULL, 'https://atla.design/', 'image-generation-editing', 'Freemium', ARRAY['design-tools', 'graphics', 'visual-content', 'prototyping', 'creative-ai'], false, false, 4.3),

  -- Research & Data Analysis Tools
  ('qa-tech', 'QA.tech', 'AI-powered automated testing platform that continuously monitors your web applications for bugs and issues. Self-maintaining tests that adapt to UI changes and provide intelligent bug detection.', 'Automated QA testing with self-maintaining AI tests', NULL, 'https://qa.tech/', 'research-data-analysis', 'Paid', ARRAY['automated-testing', 'qa-automation', 'bug-detection', 'web-testing', 'continuous-testing'], false, true, 4.6),
  
  ('trace-analytics', 'Trace', 'AI-driven analytics platform that provides deep insights into user behavior and product performance. Intelligent data visualization and predictive analytics for better decision-making.', 'Deep analytics and user insights powered by AI', NULL, 'https://trace.zip/', 'research-data-analysis', 'Freemium', ARRAY['analytics', 'user-behavior', 'data-visualization', 'predictive-analytics', 'insights'], false, false, 4.4),

  -- Social Media Tools
  ('memories-ai-video', 'Memories.ai', 'AI-powered video marketing platform that transforms memories and content into engaging social media videos. Automatic editing, music selection, and optimization for different social platforms.', 'Transform content into engaging social media videos with AI', NULL, 'https://memories.ai/', 'social-media', 'Freemium', ARRAY['video-marketing', 'social-media', 'content-creation', 'video-editing', 'automation'], false, false, 4.3),

  -- Daily Life & Productivity Tools
  ('tycal', 'TyCal', 'Tiny calendar AI assistant for your menu bar. Smart scheduling, natural language event creation, and intelligent calendar management that lives in your system tray for quick access.', 'Tiny AI calendar assistant for your menu bar', NULL, 'https://tycal.app/', 'daily-life', 'Freemium', ARRAY['calendar', 'scheduling', 'productivity', 'menu-bar', 'time-management'], false, false, 4.2),
  
  ('everyday-app', 'Everyday', 'AI-powered daily planner and habit tracker that helps you build better routines. Intelligent scheduling suggestions, habit formation insights, and personalized productivity coaching.', 'Build better routines with AI-powered daily planning', NULL, 'https://everyday.app/', 'daily-life', 'Freemium', ARRAY['habit-tracking', 'daily-planner', 'productivity', 'routines', 'self-improvement'], false, false, 4.4),

  -- Chatbots & Virtual Companions
  ('caesr-ai', 'Caesr AI', 'Advanced AI chatbot platform for businesses that provides intelligent customer support and engagement. Features multi-language support, context-aware responses, and seamless integration with existing systems.', 'Enterprise AI chatbot for intelligent customer support', NULL, 'https://caesr.ai/', 'chatbots-virtual-companions', 'Paid', ARRAY['chatbot', 'customer-support', 'ai-assistant', 'enterprise', 'multi-language'], false, true, 4.5),
  
  ('lyra-ai-companion', 'Lyra', 'AI-powered virtual companion designed for emotional support and meaningful conversations. Empathetic AI that learns from interactions to provide personalized companionship and mental wellness support.', 'AI companion for emotional support and meaningful conversations', NULL, 'https://lyra.ai/', 'chatbots-virtual-companions', 'Freemium', ARRAY['virtual-companion', 'emotional-support', 'mental-wellness', 'conversation-ai', 'empathy'], false, false, 4.3),

  -- Voice Generation & Conversion Tools
  ('newsprint-audio', 'Newsprint', 'AI-powered personalized daily news briefs with natural voice narration. Delivers curated news summaries in audio format tailored to your interests and preferences for on-the-go listening.', 'Personalized daily news briefs powered by AI voice', NULL, 'https://newsprint.app/', 'voice-generation-conversion', 'Freemium', ARRAY['news', 'audio', 'voice-synthesis', 'personalization', 'news-summary'], false, false, 4.3),

  -- Music & Audio Tools
  ('songbird-news-audio', 'Songbird News', 'AI news platform that speaks to you. Converts written news into natural-sounding audio summaries with voice customization and smart content curation for audio news consumption.', 'News that speaks to you with AI-generated audio', NULL, 'https://songbird.news/', 'music-audio', 'Free', ARRAY['news-audio', 'text-to-speech', 'audio-news', 'voice-generation', 'content-curation'], false, false, 4.2),

  -- Video & Animation Tools
  ('doraverse', 'Doraverse', 'AI-powered 3D animation and video creation platform. Create professional 3D animations, motion graphics, and video content without complex software using intelligent automation and templates.', 'Create 3D animations and videos with AI automation', NULL, 'https://doraverse.com/', 'video-animation', 'Freemium', ARRAY['3d-animation', 'video-creation', 'motion-graphics', 'animation-tools', 'automation'], false, false, 4.4),

  -- Business Research Tools
  ('intryc', 'Intryc', 'AI-powered market research and competitive intelligence platform. Provides automated insights, trend analysis, and competitor tracking to help businesses make data-driven strategic decisions.', 'Market research and competitive intelligence with AI', NULL, 'https://intryc.com/', 'business-research', 'Paid', ARRAY['market-research', 'competitive-intelligence', 'trend-analysis', 'business-insights', 'strategy'], false, false, 4.5),

  -- Additional Productivity & Automation Tools
  ('duet-mail', 'Duet Mail', 'AI-powered Gmail superpower that saves 4+ hours every day. Intelligent email management with smart categorization, auto-responses, priority inbox, and automated email workflows for maximum productivity.', 'Your Gmail superpower - Save 4+ hours daily with AI', 'https://duetmail.com/logo.png', 'https://duetmail.com/', 'office-productivity', 'Freemium', ARRAY['email-management', 'gmail', 'productivity', 'automation', 'inbox-management', 'time-saving'], true, true, 4.7),
  
  ('netlify-agents', 'Netlify Agent Runners', 'AI-powered deployment and hosting optimization for web applications. Intelligent build processes, automated performance optimization, and smart CDN routing for faster websites.', 'AI-powered deployment optimization for web applications', NULL, 'https://www.netlify.com/products/agent-runners/', 'coding-development', 'Paid', ARRAY['deployment', 'hosting', 'optimization', 'web-performance', 'cdn', 'automation'], false, true, 4.6),

  -- Writing & Content Creation Tools
  ('article-writer-mavis', 'Mavis AI Article Writer', 'Generate SEO-friendly news articles in minutes with AI. Advanced content generation that creates well-researched, engaging articles optimized for search engines and reader engagement.', 'Generate SEO-friendly articles in minutes with AI', NULL, 'https://mavisai.com/article-writer', 'writing-editing', 'Paid', ARRAY['article-writing', 'seo', 'content-generation', 'blog-writing', 'copywriting'], false, false, 4.3),

  -- News & Information Tools
  ('timio-news', 'TIMIO News', 'AI-powered fake news detector and news verification platform. Analyzes news articles for credibility, bias, and factual accuracy using advanced machine learning to spot misinformation and fake news.', 'Spot fake news with AI-powered verification', 'https://timio.news/logo.svg', 'https://timio.news/', 'research-data-analysis', 'Freemium', ARRAY['news-verification', 'fake-news-detection', 'fact-checking', 'media-literacy', 'credibility-analysis'], false, true, 4.4),
  
  ('readpartner', 'ReadPartner', 'AI-driven media intelligence suite designed for businesses. Monitors news, analyzes trends, tracks brand mentions, and provides actionable insights from global media sources for strategic decision-making.', 'Media intelligence suite for business insights', 'https://readpartner.com/logo.svg', 'https://readpartner.com/', 'business-research', 'Paid', ARRAY['media-monitoring', 'brand-tracking', 'news-analysis', 'business-intelligence', 'trend-tracking'], false, true, 4.4),
  
  ('stocknewsai', 'StockNewsAI', 'AI-powered stock market news analyzer that provides investment insights. Analyzes financial news, market sentiment, and stock trends to help investors make informed decisions with real-time alerts.', 'Stock market news analyzed for investment insights', 'https://stocknewsai.com/logo.svg', 'https://stocknewsai.com/', 'legal-finance', 'Freemium', ARRAY['stock-market', 'investment', 'financial-news', 'market-analysis', 'trading', 'sentiment-analysis'], false, true, 4.1),
  
  ('syft-news', 'Syft', 'AI-powered news tracking for any topic worldwide. Create custom news feeds, get instant alerts, and track stories as they develop with intelligent news aggregation and summarization.', 'AI-powered news tracking for any topic worldwide', 'https://justsyft.com/logo.svg', 'https://justsyft.com/', 'research-data-analysis', 'Free', ARRAY['news-tracking', 'news-aggregation', 'alerts', 'topic-monitoring', 'news-summary'], false, true, 4.4),
  
  ('last24-ai', 'Last24.ai', 'Visualize todays news in clear AI summaries. Transforms the flood of daily news into concise, visual summaries that help you understand world events at a glance.', 'Visualize todays news with clear AI summaries', 'https://last24.ai/logo.svg', 'https://last24.ai/', 'research-data-analysis', 'Freemium', ARRAY['news-summary', 'visualization', 'daily-news', 'news-digest', 'information'], false, false, 4.2),
  
  ('goatstack', 'GoatStack', 'AI-curated news delivered to your inbox. Personalized news digest that learns from your reading habits to deliver the most relevant stories and insights tailored to your interests.', 'AI-curated news delivered to your inbox daily', 'https://goatstack.com/logo.svg', 'https://goatstack.com/', 'office-productivity', 'Freemium', ARRAY['news-curation', 'newsletter', 'personalization', 'email-digest', 'news-summary'], false, false, 4.0),

  -- More Business & Finance Tools
  ('planful-predict', 'Planful', 'AI-powered financial planning and analysis platform for enterprises. Automated budgeting, forecasting, and financial modeling with intelligent insights and scenario planning capabilities.', 'Enterprise financial planning with AI-powered analytics', NULL, 'https://planful.com/', 'legal-finance', 'Paid', ARRAY['financial-planning', 'budgeting', 'forecasting', 'enterprise', 'financial-modeling', 'fpa'], false, false, 4.5),

  -- Health & Wellness Tools
  ('new-resilience', 'New Resilience', 'AI-powered mental resilience platform with expert guidance. Provides personalized mental health support, stress management techniques, and resilience training using AI-driven therapeutic approaches.', 'Unlock mental resilience with AI-guided expert support', NULL, 'https://newresilience.com/', 'health-wellness', 'Paid', ARRAY['mental-health', 'resilience', 'stress-management', 'wellness', 'therapy', 'self-care'], false, false, 4.3),

  -- Automation Tools
  ('newo-digital', 'Newo', 'AI-powered digital employee solutions for business automation. Virtual workforce that handles repetitive tasks, data entry, customer inquiries, and business processes with intelligent automation.', 'Empower business with AI digital employee solutions', NULL, 'https://newo.ai/', 'automations', 'Paid', ARRAY['digital-employees', 'business-automation', 'virtual-workforce', 'process-automation', 'rpa'], false, false, 4.2),

  -- Interior & Design Tools
  ('new-cult-design', 'New Cult', 'SaaS toolkit with built-in AI co-founder for design and development. Complete suite of tools for building and launching SaaS products with AI-powered design assistance and recommendations.', 'SaaS toolkit with built-in AI co-founder', 'https://newcult.co/logo.svg', 'https://newcult.co/', 'interior-architectural-design', 'Paid', ARRAY['saas-tools', 'design-toolkit', 'ai-assistant', 'product-development', 'startup-tools'], false, false, 4.5),

  -- Additional Development Tools
  ('vectara-search', 'Vectara', 'AI-powered conversational search platform for smarter data queries. Neural search technology that understands context and intent to deliver accurate results from your data sources.', 'Conversational search for smarter data queries', 'https://vectara.com/logo.svg', 'https://vectara.com/', 'research-data-analysis', 'Freemium', ARRAY['search', 'conversational-ai', 'data-query', 'neural-search', 'semantic-search'], false, false, 4.5),

  -- Enterprise Solutions
  ('new-dialogue', 'New Dialogue', 'AI-powered private enterprise assistant platform. Secure, on-premise AI assistants that help teams collaborate, automate workflows, and access company knowledge without data leaving your infrastructure.', 'Empower teamwork with private AI assistance', NULL, 'https://newdialogue.ai/', 'business-management', 'Paid', ARRAY['enterprise-ai', 'team-collaboration', 'private-ai', 'knowledge-management', 'security'], false, false, 4.4),

  -- Additional Image Tools
  ('particle-news-visual', 'Particle News', 'AI-powered personalized news with visual summaries. Understand more, faster with news that adapts to your interests and presents information in visually engaging formats.', 'Understand more, faster with personalized visual news', 'https://particle.news/logo.png', 'https://particle.news/', 'research-data-analysis', 'Free', ARRAY['news', 'personalization', 'visual-content', 'news-summary', 'information'], false, false, 5.0),

  -- Additional Writing Tools  
  ('quill-news-digest', 'Quill News Digest', 'Apple news summaries app powered by AI. Clean, elegant news digest app for iOS that delivers personalized news summaries with beautiful typography and user-friendly interface.', 'Beautiful AI-powered news summaries for Apple devices', 'https://quillnews.app/logo.svg', 'https://quillnews.app/', 'writing-editing', 'Free', ARRAY['news-summary', 'ios', 'apple', 'news-digest', 'mobile-app'], false, false, 4.0),

  -- Research & Verification Tools
  ('i-doubt-news', 'I Doubt News', 'AI-powered news analysis and fact-checking platform. Analyzes news articles for accuracy, verifies claims, and provides context to help readers distinguish between reliable and questionable information.', 'AI-powered news analysis and fact-checking platform', 'https://idoubtnews.com/logo.svg', 'https://idoubtnews.com/', 'research-data-analysis', 'Free', ARRAY['fact-checking', 'news-verification', 'media-literacy', 'analysis', 'credibility'], false, false, 5.0),

  -- Content Creation Tools
  ('boring-report', 'Boring Report', 'AI-powered news platform that removes sensationalism and delivers information without emotional manipulation. Pure facts and objective reporting using AI to strip away bias and clickbait.', 'AI-powered news without sensationalism - just facts', 'https://boringreport.org/logo.svg', 'https://boringreport.org/', 'writing-editing', 'Free', ARRAY['news', 'objective-reporting', 'fact-based', 'unbiased', 'journalism'], false, false, 4.0),

  -- Additional Social Tools
  ('techpresso-news', 'Techpresso', 'Tech essentials in 5 minutes with AI-summarized daily digest. Stay updated on technology news, startup developments, and tech industry trends with concise, intelligent summaries.', 'Tech essentials in 5 minutes - AI-summarized daily', 'https://techpresso.co/logo.svg', 'https://techpresso.co/', 'social-media', 'Freemium', ARRAY['tech-news', 'newsletter', 'summaries', 'startup-news', 'technology'], false, false, 4.0)

ON CONFLICT (id, category_id) DO NOTHING;
