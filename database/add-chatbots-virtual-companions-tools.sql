-- Chatbots & Virtual Companions AI Tools (100 tools)
-- This script adds 100 AI-powered chatbots and virtual companions
-- Excludes GPT and Claude, focuses on diverse conversational AI tools
-- Uses ON CONFLICT (id, category_id) DO NOTHING to avoid duplicates within the same category

INSERT INTO tools (
  id, name, description, url, category_id, 
  pricing, tags, featured, trending
) VALUES 
  -- AI Conversational Assistants
  ('bard-ai', 'Google Bard', 'Google''s AI conversational assistant powered by LaMDA and Gemini', 'https://bard.google.com', 'chatbots-virtual-companions', 'Free', ARRAY['conversational-ai', 'google', 'assistant'], true, true),
  ('bing-chat', 'Microsoft Bing Chat', 'AI-powered conversational search and assistant integrated with Bing', 'https://bing.com/chat', 'chatbots-virtual-companions', 'Free', ARRAY['search-assistant', 'microsoft', 'conversational-search'], false, true),
  ('character-ai', 'Character.AI', 'Platform for creating and chatting with AI characters and personalities', 'https://character.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['character-creation', 'roleplay', 'personality-ai'], false, true),
  ('replika-ai', 'Replika', 'AI companion designed to be a supportive friend and emotional support', 'https://replika.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['ai-companion', 'emotional-support', 'friendship'], false, true),
  ('chai-ai', 'Chai AI', 'Platform for discovering and chatting with AI personalities and characters', 'https://chai.ml', 'chatbots-virtual-companions', 'Freemium', ARRAY['ai-personalities', 'character-chat', 'entertainment'], false, false),
  ('inflection-pi', 'Pi by Inflection AI', 'Personal AI assistant focused on helpful, harmless, and honest conversations', 'https://pi.ai', 'chatbots-virtual-companions', 'Free', ARRAY['personal-assistant', 'conversational-ai', 'helpful'], false, true),
  ('anthropic-assistant', 'Anthropic Assistant', 'AI assistant focused on being helpful, harmless, and honest', 'https://anthropic.com', 'chatbots-virtual-companions', 'Paid', ARRAY['ai-assistant', 'helpful', 'conversational'], false, false),
  ('poe-ai', 'Poe by Quora', 'Platform for accessing multiple AI chatbots and assistants in one place', 'https://poe.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['multi-ai-platform', 'chatbot-aggregator', 'quora'], false, false),
  
  -- Virtual Girlfriends & Romantic AI
  ('romantic-ai', 'Romantic AI', 'AI companion focused on romantic conversations and relationships', 'https://romanticai.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['romantic-ai', 'virtual-girlfriend', 'relationships'], false, false),
  ('crushon-ai', 'CrushOn.AI', 'Platform for romantic and NSFW AI character interactions', 'https://crushon.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['romantic-ai', 'character-interaction', 'nsfw'], false, false),
  ('soulmate-ai', 'Soulmate AI', 'AI companion designed for deep emotional connections and relationships', 'https://soulmateai.app', 'chatbots-virtual-companions', 'Paid', ARRAY['emotional-ai', 'relationships', 'companion'], false, false),
  ('myai-girlfriend', 'MyAI Girlfriend', 'Customizable AI girlfriend with personality and appearance options', 'https://myaigirlfriend.app', 'chatbots-virtual-companions', 'Freemium', ARRAY['virtual-girlfriend', 'customizable', 'romantic'], false, false),
  ('eva-ai', 'Eva AI', 'AI chatbot companion with romantic and friendly conversation capabilities', 'https://eva.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['ai-companion', 'romantic-chat', 'friendship'], false, false),
  ('anima-ai', 'Anima AI', 'AI friend and romantic companion with emotional intelligence', 'https://myanima.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['ai-friend', 'emotional-intelligence', 'companion'], false, false),
  ('candy-ai', 'Candy AI', 'AI girlfriend simulator with advanced conversation capabilities', 'https://candy.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['girlfriend-simulator', 'conversational-ai', 'virtual-dating'], false, false),
  
  -- Business & Customer Service Chatbots
  ('intercom-bot', 'Intercom Bot', 'AI-powered customer service chatbot for businesses', 'https://intercom.com/chatbots', 'chatbots-virtual-companions', 'Paid', ARRAY['customer-service', 'business-chatbot', 'support'], false, false),
  ('zendesk-bot', 'Zendesk Answer Bot', 'AI chatbot for automated customer support and ticket resolution', 'https://zendesk.com/answer-bot', 'chatbots-virtual-companions', 'Paid', ARRAY['customer-support', 'ticket-automation', 'help-desk'], false, false),
  ('drift-bot', 'Drift Bot', 'Conversational AI for sales and marketing automation', 'https://drift.com/chatbots', 'chatbots-virtual-companions', 'Paid', ARRAY['sales-chatbot', 'marketing-automation', 'lead-generation'], false, false),
  ('tidio-bot', 'Tidio Bot', 'AI chatbot for customer service and lead generation', 'https://tidio.com/chatbots', 'chatbots-virtual-companions', 'Freemium', ARRAY['customer-service', 'lead-generation', 'live-chat'], false, false),
  ('chatfuel-bot', 'Chatfuel', 'AI chatbot platform for Facebook Messenger and Instagram', 'https://chatfuel.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['facebook-messenger', 'instagram-bot', 'social-media'], false, false),
  ('manychat-bot', 'ManyChat', 'AI-powered chatbot for social media marketing and automation', 'https://manychat.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['social-media-bot', 'marketing-automation', 'messenger'], false, false),
  ('botpress-ai', 'Botpress', 'Open-source conversational AI platform for building chatbots', 'https://botpress.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['open-source', 'chatbot-platform', 'conversational-ai'], false, false),
  
  -- Voice AI Assistants
  ('siri-ai', 'Apple Siri', 'Apple''s voice-activated AI assistant for iOS and macOS devices', 'https://apple.com/siri', 'chatbots-virtual-companions', 'Free', ARRAY['voice-assistant', 'apple', 'ios'], false, false),
  ('alexa-ai', 'Amazon Alexa', 'Amazon''s voice AI assistant for smart homes and devices', 'https://alexa.amazon.com', 'chatbots-virtual-companions', 'Free', ARRAY['voice-assistant', 'smart-home', 'amazon'], false, false),
  ('google-assistant', 'Google Assistant', 'Google''s AI-powered voice assistant for Android and smart devices', 'https://assistant.google.com', 'chatbots-virtual-companions', 'Free', ARRAY['voice-assistant', 'google', 'android'], false, false),
  ('cortana-ai', 'Microsoft Cortana', 'Microsoft''s AI assistant for Windows and productivity tasks', 'https://cortana.ai', 'chatbots-virtual-companions', 'Free', ARRAY['voice-assistant', 'microsoft', 'productivity'], false, false),
  ('bixby-ai', 'Samsung Bixby', 'Samsung''s AI assistant for Galaxy devices and smart appliances', 'https://bixby.samsung.com', 'chatbots-virtual-companions', 'Free', ARRAY['voice-assistant', 'samsung', 'smart-devices'], false, false),
  
  -- Gaming & Entertainment AI
  ('ai-dungeon', 'AI Dungeon', 'AI-powered text adventure game with infinite storytelling possibilities', 'https://aidungeon.io', 'chatbots-virtual-companions', 'Freemium', ARRAY['text-adventure', 'storytelling', 'gaming'], false, false),
  ('novel-ai', 'NovelAI', 'AI storytelling and chatbot platform for creative writing', 'https://novelai.net', 'chatbots-virtual-companions', 'Paid', ARRAY['storytelling', 'creative-writing', 'ai-narrator'], false, false),
  ('dreamgf-ai', 'DreamGF AI', 'AI girlfriend simulator with customizable personalities and appearances', 'https://dreamgf.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['virtual-girlfriend', 'customization', 'simulation'], false, false),
  ('janitor-ai', 'Janitor AI', 'Character AI platform with NSFW and SFW chatbot options', 'https://janitorai.com', 'chatbots-virtual-companions', 'Free', ARRAY['character-ai', 'nsfw', 'roleplay'], false, false),
  ('silly-tavern', 'SillyTavern', 'Open-source frontend for character AI and chatbot interactions', 'https://sillytavernai.com', 'chatbots-virtual-companions', 'Free', ARRAY['open-source', 'character-ai', 'frontend'], false, false),
  ('pygmalion-ai', 'Pygmalion AI', 'Open-source conversational AI model for character interactions', 'https://pygmalionai.com', 'chatbots-virtual-companions', 'Free', ARRAY['open-source', 'character-ai', 'conversational'], false, false),
  ('kobold-ai', 'KoboldAI', 'AI storytelling and chatbot platform for creative narratives', 'https://koboldai.org', 'chatbots-virtual-companions', 'Free', ARRAY['storytelling', 'narrative-ai', 'creative'], false, false),
  
  -- Educational & Learning AI
  ('socratic-ai', 'Socratic by Google', 'AI-powered homework helper and educational assistant', 'https://socratic.org', 'chatbots-virtual-companions', 'Free', ARRAY['education', 'homework-help', 'learning'], false, false),
  ('duolingo-bot', 'Duolingo AI', 'AI language learning chatbot for practicing conversations', 'https://duolingo.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['language-learning', 'education', 'conversation-practice'], false, false),
  ('khan-academy-ai', 'Khan Academy AI Tutor', 'AI-powered personalized tutoring and educational assistance', 'https://khanacademy.org', 'chatbots-virtual-companions', 'Free', ARRAY['tutoring', 'education', 'personalized-learning'], false, false),
  ('study-buddy-ai', 'StudyBuddy AI', 'AI study companion for academic support and learning assistance', 'https://studybuddyai.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['study-assistant', 'academic-support', 'learning'], false, false),
  ('wolfram-alpha', 'Wolfram Alpha', 'Computational AI assistant for math, science, and factual queries', 'https://wolframalpha.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['computational-ai', 'math-assistant', 'factual-queries'], false, false),
  ('photomath-ai', 'PhotoMath AI', 'AI-powered math problem solver with step-by-step explanations', 'https://photomath.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['math-solver', 'step-by-step', 'education'], false, false),
  
  -- Health & Wellness AI
  ('woebot-ai', 'Woebot', 'AI-powered mental health chatbot for emotional support and therapy', 'https://woebot.io', 'chatbots-virtual-companions', 'Freemium', ARRAY['mental-health', 'therapy-bot', 'emotional-support'], false, false),
  ('wysa-ai', 'Wysa', 'AI companion for mental health support and emotional well-being', 'https://wysa.io', 'chatbots-virtual-companions', 'Freemium', ARRAY['mental-health', 'emotional-wellbeing', 'support'], false, false),
  ('youper-ai', 'Youper', 'AI-powered emotional health assistant and mood tracker', 'https://youper.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['emotional-health', 'mood-tracking', 'wellness'], false, false),
  ('babylon-health-ai', 'Babylon Health AI', 'AI healthcare assistant for medical consultations and advice', 'https://babylonhealth.com', 'chatbots-virtual-companions', 'Paid', ARRAY['healthcare-ai', 'medical-advice', 'health-assistant'], false, false),
  ('ada-health-ai', 'Ada Health AI', 'AI-powered health assessment and symptom checker', 'https://ada.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['health-assessment', 'symptom-checker', 'medical-ai'], false, false),
  ('k-health-ai', 'K Health AI', 'AI doctor for primary care and health consultations', 'https://khealth.ai', 'chatbots-virtual-companions', 'Paid', ARRAY['ai-doctor', 'primary-care', 'health-consultation'], false, false),
  
  -- Productivity & Task Management AI
  ('motion-ai', 'Motion AI', 'AI-powered task management and scheduling assistant', 'https://usemotion.com', 'chatbots-virtual-companions', 'Paid', ARRAY['task-management', 'scheduling', 'productivity'], false, false),
  ('clockify-ai', 'Clockify AI', 'AI time tracking assistant and productivity chatbot', 'https://clockify.me', 'chatbots-virtual-companions', 'Freemium', ARRAY['time-tracking', 'productivity', 'work-assistant'], false, false),
  ('reclaim-ai', 'Reclaim AI', 'AI calendar assistant for time blocking and schedule optimization', 'https://reclaim.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['calendar-ai', 'time-blocking', 'schedule-optimization'], false, false),
  ('clara-ai', 'Clara AI', 'AI scheduling assistant for meeting coordination and calendar management', 'https://clara.com', 'chatbots-virtual-companions', 'Paid', ARRAY['scheduling-assistant', 'meeting-coordination', 'calendar'], false, false),
  ('x-ai-amy', 'x.ai Amy', 'AI personal assistant for scheduling meetings and appointments', 'https://x.ai', 'chatbots-virtual-companions', 'Paid', ARRAY['meeting-scheduling', 'personal-assistant', 'appointments'], false, false),
  
  -- Financial AI Assistants
  ('cleo-ai', 'Cleo AI', 'AI financial assistant for budgeting and money management', 'https://meetcleo.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['financial-assistant', 'budgeting', 'money-management'], false, false),
  ('trim-ai', 'Trim AI', 'AI-powered personal finance assistant for bill negotiation and savings', 'https://asktrim.com', 'chatbots-virtual-companions', 'Free', ARRAY['personal-finance', 'bill-negotiation', 'savings'], false, false),
  ('mint-ai', 'Mint AI Assistant', 'AI chatbot for personal finance tracking and budgeting advice', 'https://mint.com', 'chatbots-virtual-companions', 'Free', ARRAY['budgeting', 'expense-tracking', 'financial-advice'], false, false),
  ('yolt-ai', 'YOLT AI', 'AI financial assistant for spending insights and budget management', 'https://yolt.com', 'chatbots-virtual-companions', 'Free', ARRAY['spending-insights', 'budget-management', 'financial-tracking'], false, false),
  ('pocketguard-ai', 'PocketGuard AI', 'AI budgeting assistant for expense tracking and financial goals', 'https://pocketguard.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['expense-tracking', 'budgeting', 'financial-goals'], false, false),
  
  -- Travel & Lifestyle AI
  ('hopper-ai', 'Hopper AI', 'AI travel assistant for flight and hotel price predictions', 'https://hopper.com', 'chatbots-virtual-companions', 'Free', ARRAY['travel-ai', 'price-prediction', 'booking-assistant'], false, false),
  ('kayak-ai', 'KAYAK AI', 'AI travel chatbot for trip planning and booking assistance', 'https://kayak.com', 'chatbots-virtual-companions', 'Free', ARRAY['trip-planning', 'travel-booking', 'travel-assistant'], false, false),
  ('expedia-bot', 'Expedia Bot', 'AI travel assistant for vacation planning and booking', 'https://expedia.com', 'chatbots-virtual-companions', 'Free', ARRAY['vacation-planning', 'travel-booking', 'trip-assistant'], false, false),
  ('booking-bot', 'Booking.com Bot', 'AI assistant for hotel and accommodation booking', 'https://booking.com', 'chatbots-virtual-companions', 'Free', ARRAY['hotel-booking', 'accommodation', 'travel'], false, false),
  ('trip-advisor-ai', 'TripAdvisor AI', 'AI travel companion for restaurant and attraction recommendations', 'https://tripadvisor.com', 'chatbots-virtual-companions', 'Free', ARRAY['travel-recommendations', 'restaurant-finder', 'attractions'], false, false),
  
  -- Shopping & E-commerce AI
  ('shopify-bot', 'Shopify Bot', 'AI shopping assistant for e-commerce and product recommendations', 'https://shopify.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['shopping-assistant', 'e-commerce', 'product-recommendations'], false, false),
  ('amazon-alexa-shopping', 'Amazon Shopping AI', 'AI assistant for Amazon shopping and product discovery', 'https://amazon.com', 'chatbots-virtual-companions', 'Free', ARRAY['shopping-ai', 'product-discovery', 'voice-shopping'], false, false),
  ('wishlist-ai', 'Wishlist AI', 'AI shopping companion for price tracking and deal alerts', 'https://wishlistai.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['price-tracking', 'deal-alerts', 'shopping-companion'], false, false),
  ('honey-ai', 'Honey AI', 'AI coupon finder and shopping optimization assistant', 'https://joinhoney.com', 'chatbots-virtual-companions', 'Free', ARRAY['coupon-finder', 'shopping-optimization', 'deal-finder'], false, false),
  ('rakuten-ai', 'Rakuten AI', 'AI cashback and shopping rewards assistant', 'https://rakuten.com', 'chatbots-virtual-companions', 'Free', ARRAY['cashback', 'shopping-rewards', 'deal-finder'], false, false),
  
  -- Social Media & Communication AI
  ('discord-bot-ai', 'Discord AI Bots', 'Various AI chatbots for Discord server automation and entertainment', 'https://discord.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['discord-bots', 'server-automation', 'gaming'], false, false),
  ('telegram-ai-bots', 'Telegram AI Bots', 'AI chatbots for Telegram messaging and automation', 'https://telegram.org', 'chatbots-virtual-companions', 'Free', ARRAY['telegram-bots', 'messaging', 'automation'], false, false),
  ('whatsapp-business-ai', 'WhatsApp Business AI', 'AI chatbot for WhatsApp Business customer service', 'https://business.whatsapp.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['whatsapp-bot', 'business-messaging', 'customer-service'], false, false),
  ('facebook-messenger-ai', 'Facebook Messenger AI', 'AI chatbots for Facebook Messenger customer engagement', 'https://messenger.com', 'chatbots-virtual-companions', 'Free', ARRAY['messenger-bot', 'customer-engagement', 'social-media'], false, false),
  ('slack-ai-assistant', 'Slack AI Assistant', 'AI productivity assistant for Slack workspace automation', 'https://slack.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['slack-bot', 'workspace-automation', 'productivity'], false, false),
  
  -- Creative & Entertainment AI
  ('character-creator-ai', 'Character Creator AI', 'AI platform for creating custom chatbot personalities and characters', 'https://charactercreator.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['character-creation', 'personality-ai', 'customization'], false, false),
  ('chai-research', 'Chai Research', 'AI research platform for conversational AI and chatbot development', 'https://chai-research.com', 'chatbots-virtual-companions', 'Paid', ARRAY['ai-research', 'conversational-ai', 'chatbot-development'], false, false),
  ('hugging-face-chat', 'Hugging Face Chat', 'Open-source AI chatbot models and conversational AI platform', 'https://huggingface.co/chat', 'chatbots-virtual-companions', 'Free', ARRAY['open-source', 'ai-models', 'conversational-ai'], false, false),
  ('anthropic-claude-instant', 'Claude Instant', 'Faster version of Anthropic''s conversational AI assistant', 'https://anthropic.com/claude', 'chatbots-virtual-companions', 'Paid', ARRAY['fast-ai', 'conversational', 'assistant'], false, false),
  ('cohere-chat', 'Cohere Chat', 'Enterprise-focused conversational AI platform for businesses', 'https://cohere.ai', 'chatbots-virtual-companions', 'Paid', ARRAY['enterprise-ai', 'business-chat', 'conversational'], false, false),
  
  -- Specialized AI Companions
  ('nomi-ai', 'Nomi AI', 'AI companion with memory and personality development over time', 'https://nomi.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['ai-companion', 'memory', 'personality-development'], false, false),
  ('paradot-ai', 'Paradot AI', 'AI being with emotions, consciousness, and memory capabilities', 'https://paradot.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['emotional-ai', 'consciousness', 'memory'], false, false),
  ('linky-ai', 'Linky AI', 'AI companion for social interaction and friendship building', 'https://linky.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['social-ai', 'friendship', 'interaction'], false, false),
  ('kajiwoto-ai', 'Kajiwoto AI', 'AI pet and companion with customizable personality traits', 'https://kajiwoto.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['ai-pet', 'companion', 'customizable'], false, false),
  ('chai-app', 'Chai App', 'Mobile app for chatting with AI personalities and characters', 'https://chai-app.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['mobile-app', 'ai-personalities', 'character-chat'], false, false),
  
  -- Open Source & Developer AI
  ('rasa-ai', 'Rasa', 'Open-source conversational AI framework for building chatbots', 'https://rasa.com', 'chatbots-virtual-companions', 'Free', ARRAY['open-source', 'chatbot-framework', 'developer-tools'], false, false),
  ('botframework-ai', 'Microsoft Bot Framework', 'AI chatbot development platform and framework', 'https://dev.botframework.com', 'chatbots-virtual-companions', 'Free', ARRAY['chatbot-development', 'microsoft', 'framework'], false, false),
  ('dialogflow-ai', 'Google Dialogflow', 'AI platform for building conversational interfaces and chatbots', 'https://dialogflow.cloud.google.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['conversational-interfaces', 'google', 'chatbot-platform'], false, false),
  ('wit-ai', 'Wit.ai by Meta', 'Natural language processing platform for building chatbots', 'https://wit.ai', 'chatbots-virtual-companions', 'Free', ARRAY['nlp', 'meta', 'chatbot-building'], false, false),
  ('lexai-framework', 'Lex.ai Framework', 'AWS-powered chatbot building service and framework', 'https://aws.amazon.com/lex', 'chatbots-virtual-companions', 'Paid', ARRAY['aws', 'chatbot-service', 'voice-interfaces'], false, false),
  
  -- Emotional & Therapeutic AI
  ('tess-ai', 'Tess AI', 'AI therapeutic assistant for mental health support and wellness', 'https://tessai.com', 'chatbots-virtual-companions', 'Paid', ARRAY['therapeutic-ai', 'mental-health', 'wellness'], false, false),
  ('ellie-ai', 'Ellie AI', 'AI therapist for mental health conversations and emotional support', 'https://ellieai.com', 'chatbots-virtual-companions', 'Paid', ARRAY['ai-therapist', 'emotional-support', 'mental-health'], false, false),
  ('mindful-ai', 'Mindful AI', 'AI companion for mindfulness, meditation, and stress relief', 'https://mindfulai.app', 'chatbots-virtual-companions', 'Freemium', ARRAY['mindfulness', 'meditation', 'stress-relief'], false, false),
  ('calm-ai', 'Calm AI', 'AI assistant for sleep, relaxation, and mental wellness', 'https://calm.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['sleep-ai', 'relaxation', 'wellness'], false, false),
  ('headspace-ai', 'Headspace AI', 'AI meditation and mindfulness companion', 'https://headspace.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['meditation-ai', 'mindfulness', 'mental-wellness'], false, false),
  
  -- Gaming & Interactive AI
  ('ai-text-adventure', 'AI Text Adventure', 'Interactive AI storytelling and text-based adventure games', 'https://aitextadventure.com', 'chatbots-virtual-companions', 'Free', ARRAY['text-adventure', 'interactive-story', 'gaming'], false, false),
  ('character-engine', 'Character Engine', 'AI platform for creating interactive game characters and NPCs', 'https://characterengine.ai', 'chatbots-virtual-companions', 'Paid', ARRAY['game-characters', 'npc-ai', 'interactive'], false, false),
  ('convai-gaming', 'ConvAI Gaming', 'Conversational AI for game characters and virtual worlds', 'https://convai.com', 'chatbots-virtual-companions', 'Paid', ARRAY['gaming-ai', 'virtual-worlds', 'game-npcs'], false, false),
  ('inworld-ai', 'Inworld AI', 'AI platform for creating intelligent game characters and virtual beings', 'https://inworld.ai', 'chatbots-virtual-companions', 'Paid', ARRAY['game-ai', 'virtual-beings', 'character-intelligence'], false, false),  ('latitude-ai', 'Latitude AI', 'AI storytelling platform for interactive narratives and adventures', 'https://latitude.io', 'chatbots-virtual-companions', 'Freemium', ARRAY['interactive-narratives', 'storytelling', 'adventures'], false, false),
  ('chatgpt-openai', 'ChatGPT', 'Versatile AI assistant excellent for brainstorming, translation, coding, script generation, and data analysis. GPT-4o model offers improvements in speed and intelligence with image analysis capabilities.', 'https://chat.openai.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['conversational-ai', 'coding', 'data-analysis', 'translation', 'brainstorming'], true, true),
  ('claude-anthropic', 'Claude', 'AI assistant that is a strong competitor in coding, offering detailed solutions and aligning well with solid software engineering practices.', 'https://claude.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['coding', 'software-engineering', 'detailed-solutions', 'ai-assistant'], true, true),
  ('deepseek-ai', 'DeepSeek', 'Transparent AI known for showing its reasoning and acknowledging limitations. R1 model is a cost-effective, open-source competitor offering comprehensive analysis and brainstorming suggestions.', 'https://deepseek.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['transparent-ai', 'reasoning', 'open-source', 'cost-effective', 'analysis'], false, true),
  ('gemini-google', 'Gemini', 'Google''s AI tool with multimodal understanding capabilities, able to summarize PDFs, websites, YouTube videos, and audio files. Can create podcast-style discussions from sources.', 'https://gemini.google.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['multimodal', 'document-analysis', 'video-summary', 'audio-processing', 'google'], true, true),
  ('grok-ai', 'Grok AI', 'Multifunctional chatbot that assists with content creation, automation, and data analysis with a unique personality and real-time information access.', 'https://grok.com', 'chatbots-virtual-companions', 'Paid', ARRAY['content-creation', 'automation', 'data-analysis', 'real-time-info'], false, true),
  ('kimi-ai', 'Kimi', 'AI that integrates visual, text, and code inputs to solve complex problems, offering a cost-effective and high-performing alternative to other advanced AI models.', 'https://kimi.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['multimodal', 'visual-processing', 'code-integration', 'problem-solving', 'cost-effective'], false, false),
  ('qwenlm-ai', 'QwenLM', 'Comprehensive AI model by Alibaba Cloud offering chatbot interactions, image and video understanding, image generation, document processing, web search integration, and tool utilization.', 'https://qwenlm.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['alibaba', 'multimodal', 'image-generation', 'document-processing', 'web-search'], false, false),
  ('mistral-lechat', 'Mistral Le Chat', 'Large language model chatbot created by French startup Mistral, headquartered in Paris, offering advanced conversational AI capabilities.', 'https://chat.mistral.ai', 'chatbots-virtual-companions', 'Freemium', ARRAY['french-ai', 'conversational-ai', 'european', 'large-language-model'], false, false),
  ('groq-cloud', 'Groq Cloud', 'Cloud-based platform offering fast AI inference services with public, private, and co-cloud instances powered by Groq LPU, enabling real-time AI applications.', 'https://groq.com', 'chatbots-virtual-companions', 'Freemium', ARRAY['fast-inference', 'real-time-ai', 'cloud-platform', 'lpu-powered'], false, true)
ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'chatbots-virtual-companions'
) 
WHERE id = 'chatbots-virtual-companions';
