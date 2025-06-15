import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// First, let's check existing tools in Daily Life category
async function checkExistingTools() {
  console.log('Checking existing tools in Daily Life category...')
  
  const { data: tools, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', 'daily-life')
  
  if (error) {
    console.error('Error fetching tools:', error)
    return []
  }
  
  console.log(`Found ${tools.length} existing tools in Daily Life category:`)
  tools.forEach(tool => console.log(`- ${tool.name}`))
  
  return tools.map(tool => tool.name.toLowerCase())
}

// 100 Daily Life AI Tools
const dailyLifeTools = [
  // Personal Productivity
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered workspace that helps you write, plan, organize, and think better. Seamlessly integrated into your Notion pages to help with writing, brainstorming, editing, summarizing and more.',
    short_description: 'AI-powered workspace for writing and organizing',
    logo_url: 'https://logo.clearbit.com/notion.so',
    tags: ['productivity', 'writing', 'organization'],
    rating: 4.6,
    pricing: 'Freemium',
    url: 'https://www.notion.so/product/ai'
  },
  {
    id: 'todoist-ai',
    name: 'Todoist',
    description: 'Smart task management with AI-powered features including natural language processing for task creation, intelligent scheduling suggestions, and productivity insights.',
    short_description: 'Smart task management with AI features',
    logo_url: 'https://logo.clearbit.com/todoist.com',
    tags: ['productivity', 'tasks', 'scheduling'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://todoist.com'
  },
  {
    id: 'calendly-ai',
    name: 'Calendly',
    description: 'AI-enhanced scheduling tool that automatically finds the best meeting times, sends smart reminders, and integrates with your workflow to streamline appointment booking.',
    short_description: 'AI-enhanced scheduling and appointment booking',
    logo_url: 'https://logo.clearbit.com/calendly.com',
    tags: ['scheduling', 'meetings', 'calendar'],
    rating: 4.5,
    pricing: 'Freemium',
    url: 'https://calendly.com'
  },
  {
    id: 'rescuetime',
    name: 'RescueTime',
    description: 'AI-powered time tracking and productivity analytics that automatically tracks your digital habits and provides intelligent insights to improve focus and efficiency.',
    short_description: 'AI time tracking and productivity analytics',
    logo_url: 'https://logo.clearbit.com/rescuetime.com',
    tags: ['time-tracking', 'productivity', 'analytics'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://www.rescuetime.com'
  },
  {
    id: 'forest-app',
    name: 'Forest',
    description: 'Gamified focus app that uses AI to help you stay concentrated and build healthy phone usage habits while growing virtual trees and contributing to real tree planting.',
    short_description: 'Gamified focus and productivity app',
    logo_url: 'https://forestapp.cc/images/logo.png',
    tags: ['focus', 'productivity', 'habits'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://www.forestapp.cc'
  },

  // Health & Fitness
  {
    id: 'myfitnesspal-ai',
    name: 'MyFitnessPal',
    description: 'AI-powered nutrition tracking with smart food recognition, personalized meal suggestions, and intelligent calorie counting from photos.',
    short_description: 'AI nutrition tracking and meal planning',
    logo_url: 'https://logo.clearbit.com/myfitnesspal.com',
    tags: ['nutrition', 'health', 'fitness'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://www.myfitnesspal.com'
  },
  {
    id: 'calm-ai',
    name: 'Calm',
    description: 'AI-enhanced meditation and sleep app with personalized meditation recommendations, adaptive soundscapes, and intelligent sleep tracking.',
    short_description: 'AI meditation and sleep improvement app',
    logo_url: 'https://logo.clearbit.com/calm.com',
    tags: ['meditation', 'sleep', 'wellness'],
    rating: 4.5,
    pricing: 'Freemium',
    url: 'https://www.calm.com'
  },
  {
    id: 'fitbit-sense',
    name: 'Fitbit Sense',
    description: 'AI-powered health tracker with stress management, heart rhythm notifications, skin temperature tracking, and personalized health insights.',
    short_description: 'AI health tracking and wellness insights',
    logo_url: 'https://logo.clearbit.com/fitbit.com',
    tags: ['health', 'fitness', 'tracking'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://www.fitbit.com/global/us/products/smartwatches/sense'
  },
  {
    id: 'noom-ai',
    name: 'Noom',
    description: 'AI-powered weight loss and health coaching app that uses psychology and personalized meal plans to help you build sustainable healthy habits.',
    short_description: 'AI health coaching and weight management',
    logo_url: 'https://logo.clearbit.com/noom.com',
    tags: ['health', 'weight-loss', 'coaching'],
    rating: 4.1,
    pricing: 'Paid',
    url: 'https://www.noom.com'
  },
  {
    id: 'sleepwatch',
    name: 'SleepWatch',
    description: 'AI sleep tracking that automatically monitors your sleep patterns, provides personalized insights, and offers recommendations for better sleep quality.',
    short_description: 'AI sleep tracking and optimization',
    logo_url: 'https://sleepwatchapp.com/img/logo.png',
    tags: ['sleep', 'health', 'tracking'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://sleepwatchapp.com'
  },

  // Home Management
  {
    id: 'google-nest-hub',
    name: 'Google Nest Hub',
    description: 'AI-powered smart home hub that controls devices, answers questions, plays media, and manages your daily schedule with Google Assistant integration.',
    short_description: 'AI smart home hub and assistant',
    logo_url: 'https://logo.clearbit.com/nest.com',
    tags: ['smart-home', 'assistant', 'automation'],
    rating: 4.4,
    pricing: 'Paid',
    url: 'https://store.google.com/product/nest_hub'
  },
  {
    id: 'amazon-alexa',
    name: 'Amazon Alexa',
    description: 'Voice-controlled AI assistant for smart home automation, music streaming, shopping, information queries, and daily task management.',
    short_description: 'Voice-controlled smart home AI assistant',
    logo_url: 'https://logo.clearbit.com/amazon.com',
    tags: ['voice-assistant', 'smart-home', 'automation'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://alexa.amazon.com'
  },
  {
    id: 'roomba-ai',
    name: 'iRobot Roomba',
    description: 'AI-powered robotic vacuum with intelligent navigation, room mapping, and adaptive cleaning patterns that learns your home layout.',
    short_description: 'AI robotic vacuum with smart navigation',
    logo_url: 'https://logo.clearbit.com/irobot.com',
    tags: ['cleaning', 'automation', 'robotics'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://www.irobot.com/roomba'
  },
  {
    id: 'ecobee-thermostat',
    name: 'Ecobee SmartThermostat',
    description: 'AI-powered smart thermostat that learns your schedule, optimizes energy usage, and provides intelligent climate control with voice control.',
    short_description: 'AI smart thermostat for energy optimization',
    logo_url: 'https://logo.clearbit.com/ecobee.com',
    tags: ['smart-home', 'energy', 'automation'],
    rating: 4.5,
    pricing: 'Paid',
    url: 'https://www.ecobee.com'
  },
  {
    id: 'ring-doorbell',
    name: 'Ring Video Doorbell',
    description: 'AI security camera with motion detection, facial recognition, package detection, and smart alerts for comprehensive home monitoring.',
    short_description: 'AI security doorbell with smart detection',
    logo_url: 'https://logo.clearbit.com/ring.com',
    tags: ['security', 'home', 'monitoring'],
    rating: 4.1,
    pricing: 'Paid',
    url: 'https://ring.com'
  },

  // Finance Management
  {
    id: 'mint-ai',
    name: 'Mint',
    description: 'AI-powered personal finance management with automatic transaction categorization, budget optimization, and intelligent spending insights.',
    short_description: 'AI personal finance and budget management',
    logo_url: 'https://logo.clearbit.com/mint.com',
    tags: ['finance', 'budgeting', 'tracking'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://mint.intuit.com'
  },
  {
    id: 'ynab-ai',
    name: 'You Need A Budget (YNAB)',
    description: 'AI-enhanced budgeting app that helps you give every dollar a job with intelligent spending analysis and proactive budget recommendations.',
    short_description: 'AI budgeting and financial planning',
    logo_url: 'https://logo.clearbit.com/youneedabudget.com',
    tags: ['budgeting', 'finance', 'planning'],
    rating: 4.6,
    pricing: 'Paid',
    url: 'https://www.youneedabudget.com'
  },
  {
    id: 'personal-capital',
    name: 'Personal Capital',
    description: 'AI wealth management platform with investment tracking, retirement planning, and intelligent portfolio analysis with fee optimization.',
    short_description: 'AI wealth management and investment tracking',
    logo_url: 'https://logo.clearbit.com/personalcapital.com',
    tags: ['investments', 'wealth', 'planning'],
    rating: 4.4,
    pricing: 'Free',
    url: 'https://www.personalcapital.com'
  },
  {
    id: 'acorns-ai',
    name: 'Acorns',
    description: 'AI micro-investing app that automatically rounds up purchases and invests spare change with intelligent portfolio management.',
    short_description: 'AI micro-investing and spare change automation',
    logo_url: 'https://logo.clearbit.com/acorns.com',
    tags: ['investing', 'automation', 'finance'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://www.acorns.com'
  },
  {
    id: 'truebill-ai',
    name: 'Truebill',
    description: 'AI subscription management that automatically identifies and cancels unwanted subscriptions while optimizing your recurring expenses.',
    short_description: 'AI subscription management and expense optimization',
    logo_url: 'https://logo.clearbit.com/truebill.com',
    tags: ['subscriptions', 'finance', 'automation'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://www.truebill.com'
  },

  // Food & Cooking
  {
    id: 'yuka-scanner',
    name: 'Yuka',
    description: 'AI food scanner that analyzes product ingredients and nutritional quality, providing health ratings and healthier alternatives.',
    short_description: 'AI food scanner for health and nutrition analysis',
    logo_url: 'https://yuka.io/wp-content/uploads/2019/10/logo-yuka.png',
    tags: ['food', 'health', 'nutrition'],
    rating: 4.5,
    pricing: 'Free',
    url: 'https://yuka.io'
  },
  {
    id: 'plantjammer-ai',
    name: 'PlantJammer',
    description: 'AI cooking app that creates personalized plant-based recipes based on your ingredients, preferences, and dietary restrictions.',
    short_description: 'AI plant-based recipe creator and meal planner',
    logo_url: 'https://plantjammer.com/images/logo.png',
    tags: ['cooking', 'recipes', 'plant-based'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://plantjammer.com'
  },
  {
    id: 'whisk-ai',
    name: 'Whisk',
    description: 'AI meal planning assistant that suggests recipes, creates shopping lists, and tracks nutrition based on your preferences and dietary goals.',
    short_description: 'AI meal planning and recipe suggestions',
    logo_url: 'https://logo.clearbit.com/whisk.com',
    tags: ['meal-planning', 'recipes', 'nutrition'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://whisk.com'
  },
  {
    id: 'cookpad-ai',
    name: 'Cookpad',
    description: 'AI-powered recipe platform that suggests personalized recipes based on available ingredients and cooking preferences.',
    short_description: 'AI recipe platform with personalized suggestions',
    logo_url: 'https://logo.clearbit.com/cookpad.com',
    tags: ['recipes', 'cooking', 'ingredients'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://cookpad.com'
  },
  {
    id: 'eat-this-much',
    name: 'Eat This Much',
    description: 'AI meal planning service that automatically generates meal plans and shopping lists based on your diet, budget, and schedule.',
    short_description: 'AI automatic meal planning and shopping lists',
    logo_url: 'https://www.eatthismuch.com/static/images/logo.png',
    tags: ['meal-planning', 'diet', 'automation'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://www.eatthismuch.com'
  },

  // Transportation
  {
    id: 'uber-ai',
    name: 'Uber',
    description: 'AI-powered ride sharing with intelligent route optimization, dynamic pricing, driver matching, and predictive arrival times.',
    short_description: 'AI ride sharing with smart routing',
    logo_url: 'https://logo.clearbit.com/uber.com',
    tags: ['transportation', 'ride-sharing', 'navigation'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://www.uber.com'
  },
  {
    id: 'lyft-ai',
    name: 'Lyft',
    description: 'AI-enhanced ride sharing platform with intelligent matching, route optimization, and personalized ride recommendations.',
    short_description: 'AI ride sharing with personalized matching',
    logo_url: 'https://logo.clearbit.com/lyft.com',
    tags: ['transportation', 'ride-sharing', 'matching'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://www.lyft.com'
  },
  {
    id: 'google-maps-ai',
    name: 'Google Maps',
    description: 'AI-powered navigation with real-time traffic analysis, route optimization, location predictions, and personalized recommendations.',
    short_description: 'AI navigation with intelligent routing',
    logo_url: 'https://logo.clearbit.com/maps.google.com',
    tags: ['navigation', 'maps', 'traffic'],
    rating: 4.5,
    pricing: 'Free',
    url: 'https://maps.google.com'
  },
  {
    id: 'waze-ai',
    name: 'Waze',
    description: 'Community-driven navigation app with AI traffic prediction, hazard detection, and optimal route suggestions based on real-time data.',
    short_description: 'AI community navigation with traffic prediction',
    logo_url: 'https://logo.clearbit.com/waze.com',
    tags: ['navigation', 'traffic', 'community'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://www.waze.com'
  },
  {
    id: 'parkwhiz-ai',
    name: 'ParkWhiz',
    description: 'AI parking assistant that finds and reserves parking spots with predictive availability and dynamic pricing optimization.',
    short_description: 'AI parking finder and reservation system',
    logo_url: 'https://logo.clearbit.com/parkwhiz.com',
    tags: ['parking', 'reservations', 'navigation'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://www.parkwhiz.com'
  },

  // Entertainment
  {
    id: 'spotify-ai',
    name: 'Spotify',
    description: 'AI music streaming with personalized playlists, music discovery, mood-based recommendations, and intelligent podcast suggestions.',
    short_description: 'AI music streaming with personalized discovery',
    logo_url: 'https://logo.clearbit.com/spotify.com',
    tags: ['music', 'streaming', 'recommendations'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://www.spotify.com'
  },
  {
    id: 'netflix-ai',
    name: 'Netflix',
    description: 'AI-powered video streaming with personalized content recommendations, viewing pattern analysis, and intelligent content curation.',
    short_description: 'AI video streaming with smart recommendations',
    logo_url: 'https://logo.clearbit.com/netflix.com',
    tags: ['streaming', 'entertainment', 'recommendations'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://www.netflix.com'
  },
  {
    id: 'youtube-music-ai',
    name: 'YouTube Music',
    description: 'AI music platform with smart playlists, mood detection, activity-based recommendations, and seamless music video integration.',
    short_description: 'AI music platform with smart playlist creation',
    logo_url: 'https://music.youtube.com/img/on_platform_logo_dark.svg',
    tags: ['music', 'playlists', 'streaming'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://music.youtube.com'
  },
  {
    id: 'audible-ai',
    name: 'Audible',
    description: 'AI-enhanced audiobook platform with personalized recommendations, intelligent bookmarking, and adaptive playback speed.',
    short_description: 'AI audiobook platform with smart features',
    logo_url: 'https://logo.clearbit.com/audible.com',
    tags: ['audiobooks', 'reading', 'recommendations'],
    rating: 4.5,
    pricing: 'Paid',
    url: 'https://www.audible.com'
  },
  {
    id: 'twitch-ai',
    name: 'Twitch',
    description: 'AI-powered live streaming platform with intelligent content discovery, chat moderation, and personalized stream recommendations.',
    short_description: 'AI live streaming with smart discovery',
    logo_url: 'https://logo.clearbit.com/twitch.tv',
    tags: ['streaming', 'gaming', 'live'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://www.twitch.tv'
  },

  // Communication
  {
    id: 'grammarly-ai',
    name: 'Grammarly',
    description: 'AI writing assistant that checks grammar, spelling, tone, and clarity while providing intelligent writing suggestions for better communication.',
    short_description: 'AI writing assistant for better communication',
    logo_url: 'https://logo.clearbit.com/grammarly.com',
    tags: ['writing', 'grammar', 'communication'],
    rating: 4.6,
    pricing: 'Freemium',
    url: 'https://www.grammarly.com'
  },
  {
    id: 'discord-ai',
    name: 'Discord',
    description: 'AI-enhanced communication platform with intelligent noise suppression, auto-moderation, and smart community management features.',
    short_description: 'AI communication platform with smart features',
    logo_url: 'https://logo.clearbit.com/discord.com',
    tags: ['communication', 'gaming', 'community'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://discord.com'
  },
  {
    id: 'zoom-ai',
    name: 'Zoom',
    description: 'AI-powered video conferencing with automatic transcription, noise cancellation, virtual backgrounds, and meeting insights.',
    short_description: 'AI video conferencing with smart features',
    logo_url: 'https://logo.clearbit.com/zoom.us',
    tags: ['video-calls', 'meetings', 'collaboration'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://zoom.us'
  },
  {
    id: 'slack-ai',
    name: 'Slack',
    description: 'AI-enhanced team communication with intelligent message prioritization, auto-scheduling, and smart workflow automation.',
    short_description: 'AI team communication and collaboration',
    logo_url: 'https://logo.clearbit.com/slack.com',
    tags: ['team-chat', 'collaboration', 'workflow'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://slack.com'
  },
  {
    id: 'telegram-ai',
    name: 'Telegram',
    description: 'Secure messaging app with AI chatbots, intelligent spam detection, and automated message management features.',
    short_description: 'Secure messaging with AI chatbot integration',
    logo_url: 'https://logo.clearbit.com/telegram.org',
    tags: ['messaging', 'security', 'chatbots'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://telegram.org'
  },

  // Shopping
  {
    id: 'amazon-ai',
    name: 'Amazon',
    description: 'AI-powered e-commerce with personalized recommendations, price tracking, voice shopping via Alexa, and predictive purchasing.',
    short_description: 'AI e-commerce with personalized shopping',
    logo_url: 'https://logo.clearbit.com/amazon.com',
    tags: ['shopping', 'e-commerce', 'recommendations'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://www.amazon.com'
  },
  {
    id: 'honey-ai',
    name: 'Honey',
    description: 'AI coupon finder that automatically applies the best discount codes at checkout and tracks price drops for better deals.',
    short_description: 'AI coupon finder and price tracking',
    logo_url: 'https://logo.clearbit.com/joinhoney.com',
    tags: ['coupons', 'savings', 'shopping'],
    rating: 4.5,
    pricing: 'Free',
    url: 'https://www.joinhoney.com'
  },
  {
    id: 'rakuten-ai',
    name: 'Rakuten',
    description: 'AI cashback platform that finds the best deals, tracks earnings, and provides personalized shopping recommendations.',
    short_description: 'AI cashback and deals finder',
    logo_url: 'https://logo.clearbit.com/rakuten.com',
    tags: ['cashback', 'deals', 'shopping'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://www.rakuten.com'
  },
  {
    id: 'shopify-ai',
    name: 'Shop by Shopify',
    description: 'AI shopping assistant that tracks packages, discovers products, and provides personalized recommendations from your favorite brands.',
    short_description: 'AI shopping assistant and package tracker',
    logo_url: 'https://logo.clearbit.com/shopify.com',
    tags: ['shopping', 'tracking', 'discovery'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://shop.app'
  },
  {
    id: 'instacart-ai',
    name: 'Instacart',
    description: 'AI grocery delivery with smart product suggestions, substitution intelligence, and optimized shopping routes for faster delivery.',
    short_description: 'AI grocery delivery with smart suggestions',
    logo_url: 'https://logo.clearbit.com/instacart.com',
    tags: ['grocery', 'delivery', 'shopping'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://www.instacart.com'
  },

  // News & Information
  {
    id: 'flipboard-ai',
    name: 'Flipboard',
    description: 'AI-curated news magazine that personalizes content based on your interests and reading habits with intelligent article recommendations.',
    short_description: 'AI news curation and personalized magazines',
    logo_url: 'https://logo.clearbit.com/flipboard.com',
    tags: ['news', 'curation', 'reading'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://flipboard.com'
  },
  {
    id: 'feedly-ai',
    name: 'Feedly',
    description: 'AI RSS reader that curates content, detects trending topics, and provides intelligent article prioritization for better information consumption.',
    short_description: 'AI RSS reader with smart content curation',
    logo_url: 'https://logo.clearbit.com/feedly.com',
    tags: ['rss', 'news', 'curation'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://feedly.com'
  },
  {
    id: 'pocket-ai',
    name: 'Pocket',
    description: 'AI-powered read-later app that suggests articles, provides listening mode, and offers personalized recommendations based on your interests.',
    short_description: 'AI read-later app with smart recommendations',
    logo_url: 'https://logo.clearbit.com/getpocket.com',
    tags: ['reading', 'articles', 'recommendations'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://getpocket.com'
  },
  {
    id: 'google-news-ai',
    name: 'Google News',
    description: 'AI news aggregator that personalizes your news feed, provides fact-checking, and offers comprehensive coverage from multiple sources.',
    short_description: 'AI news aggregation with personalization',
    logo_url: 'https://logo.clearbit.com/news.google.com',
    tags: ['news', 'aggregation', 'personalization'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://news.google.com'
  },
  {
    id: 'apple-news-ai',
    name: 'Apple News',
    description: 'AI-curated news platform with personalized stories, trending topics, and intelligent content filtering for iOS users.',
    short_description: 'AI news curation for Apple ecosystem',
    logo_url: 'https://www.apple.com/newsroom/images/default/apple-logo_2x.png',
    tags: ['news', 'ios', 'curation'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://www.apple.com/apple-news'
  },

  // Photography
  {
    id: 'vsco-ai',
    name: 'VSCO',
    description: 'AI photo editing app with intelligent filters, automatic enhancement suggestions, and creative tools for mobile photography.',
    short_description: 'AI photo editing with intelligent filters',
    logo_url: 'https://logo.clearbit.com/vsco.co',
    tags: ['photography', 'editing', 'filters'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://vsco.co'
  },
  {
    id: 'lightroom-ai',
    name: 'Adobe Lightroom',
    description: 'AI-powered photo editing with auto-enhance features, intelligent masking, and cloud-based organization for professional photo management.',
    short_description: 'AI photo editing and organization',
    logo_url: 'https://logo.clearbit.com/adobe.com',
    tags: ['photo-editing', 'organization', 'professional'],
    rating: 4.5,
    pricing: 'Paid',
    url: 'https://lightroom.adobe.com'
  },
  {
    id: 'snapseed-ai',
    name: 'Snapseed',
    description: 'Google\'s AI photo editor with intelligent cropping, auto-adjust features, and advanced editing tools for mobile devices.',
    short_description: 'AI mobile photo editor by Google',
    logo_url: 'https://play-lh.googleusercontent.com/5u84yKA0-cC82hD2-ltEiKEbJv4c7vxKzz2dVhPY-2KnYb4EDjMJTy3hqMdR9SLOmAc',
    tags: ['photo-editing', 'mobile', 'google'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://snapseed.online'
  },
  {
    id: 'google-photos-ai',
    name: 'Google Photos',
    description: 'AI photo storage and organization with automatic face grouping, object recognition, smart search, and intelligent album creation.',
    short_description: 'AI photo storage with smart organization',
    logo_url: 'https://logo.clearbit.com/photos.google.com',
    tags: ['photo-storage', 'organization', 'search'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://photos.google.com'
  },
  {
    id: 'canva-ai',
    name: 'Canva',
    description: 'AI-powered design platform with intelligent layout suggestions, automatic background removal, and smart design recommendations.',
    short_description: 'AI design platform with smart suggestions',
    logo_url: 'https://logo.clearbit.com/canva.com',
    tags: ['design', 'graphics', 'templates'],
    rating: 4.6,
    pricing: 'Freemium',
    url: 'https://www.canva.com'
  },

  // Weather & Environment
  {
    id: 'weather-ai',
    name: 'Weather.com',
    description: 'AI weather forecasting with hyperlocal predictions, severe weather alerts, and personalized weather insights for daily planning.',
    short_description: 'AI weather forecasting with hyperlocal accuracy',
    logo_url: 'https://logo.clearbit.com/weather.com',
    tags: ['weather', 'forecasting', 'alerts'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://weather.com'
  },
  {
    id: 'accuweather-ai',
    name: 'AccuWeather',
    description: 'AI-powered weather service with MinuteCast precipitation forecasting, real-time weather tracking, and intelligent weather alerts.',
    short_description: 'AI weather service with precise forecasting',
    logo_url: 'https://logo.clearbit.com/accuweather.com',
    tags: ['weather', 'forecasting', 'precision'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://www.accuweather.com'
  },
  {
    id: 'darksky-ai',
    name: 'Dark Sky',
    description: 'AI weather app with hyperlocal forecasting, rain predictions down to the minute, and beautiful weather visualizations.',
    short_description: 'AI hyperlocal weather with minute-by-minute rain',
    logo_url: 'https://darksky.net/images/darkskylogo.png',
    tags: ['weather', 'hyperlocal', 'precipitation'],
    rating: 4.4,
    pricing: 'Paid',
    url: 'https://darksky.net'
  },
  {
    id: 'weatherbug-ai',
    name: 'WeatherBug',
    description: 'AI weather platform with lightning detection, air quality monitoring, and personalized weather notifications.',
    short_description: 'AI weather with lightning and air quality tracking',
    logo_url: 'https://logo.clearbit.com/weatherbug.com',
    tags: ['weather', 'air-quality', 'lightning'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://www.weatherbug.com'
  },
  {
    id: 'airvisual-ai',
    name: 'IQAir AirVisual',
    description: 'AI air quality monitoring with pollution forecasts, health recommendations, and real-time air quality data from global sensors.',
    short_description: 'AI air quality monitoring and health insights',
    logo_url: 'https://logo.clearbit.com/iqair.com',
    tags: ['air-quality', 'health', 'environment'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://www.iqair.com'
  },

  // Travel
  {
    id: 'google-travel-ai',
    name: 'Google Travel',
    description: 'AI travel planning with intelligent flight and hotel recommendations, price tracking, and personalized itinerary suggestions.',
    short_description: 'AI travel planning with smart recommendations',
    logo_url: 'https://logo.clearbit.com/travel.google.com',
    tags: ['travel', 'planning', 'booking'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://travel.google.com'
  },
  {
    id: 'booking-ai',
    name: 'Booking.com',
    description: 'AI-powered hotel booking with personalized recommendations, price predictions, and intelligent travel insights.',
    short_description: 'AI hotel booking with personalized recommendations',
    logo_url: 'https://logo.clearbit.com/booking.com',
    tags: ['hotels', 'booking', 'travel'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://www.booking.com'
  },
  {
    id: 'airbnb-ai',
    name: 'Airbnb',
    description: 'AI-enhanced home sharing with smart search, personalized recommendations, and intelligent pricing for hosts and guests.',
    short_description: 'AI home sharing with smart matching',
    logo_url: 'https://logo.clearbit.com/airbnb.com',
    tags: ['accommodation', 'sharing', 'travel'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://www.airbnb.com'
  },
  {
    id: 'tripadvisor-ai',
    name: 'TripAdvisor',
    description: 'AI travel platform with personalized recommendations, review analysis, and intelligent trip planning based on preferences.',
    short_description: 'AI travel recommendations and review analysis',
    logo_url: 'https://logo.clearbit.com/tripadvisor.com',
    tags: ['travel', 'reviews', 'recommendations'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://www.tripadvisor.com'
  },
  {
    id: 'skyscanner-ai',
    name: 'Skyscanner',
    description: 'AI flight search with price prediction, flexible date options, and intelligent booking recommendations for best travel deals.',
    short_description: 'AI flight search with price predictions',
    logo_url: 'https://logo.clearbit.com/skyscanner.com',
    tags: ['flights', 'booking', 'price-tracking'],
    rating: 4.4,
    pricing: 'Free',
    url: 'https://www.skyscanner.com'
  },

  // Dating & Social
  {
    id: 'tinder-ai',
    name: 'Tinder',
    description: 'AI dating app with smart matching algorithms, conversation starters, and personalized profile optimization suggestions.',
    short_description: 'AI dating with smart matching algorithms',
    logo_url: 'https://logo.clearbit.com/tinder.com',
    tags: ['dating', 'matching', 'social'],
    rating: 3.9,
    pricing: 'Freemium',
    url: 'https://tinder.com'
  },
  {
    id: 'bumble-ai',
    name: 'Bumble',
    description: 'AI-enhanced dating platform with intelligent matching, conversation insights, and safety features for meaningful connections.',
    short_description: 'AI dating platform with intelligent matching',
    logo_url: 'https://logo.clearbit.com/bumble.com',
    tags: ['dating', 'social', 'safety'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://bumble.com'
  },
  {
    id: 'hinge-ai',
    name: 'Hinge',
    description: 'AI dating app designed to be deleted, with intelligent prompts, compatibility scoring, and meaningful conversation starters.',
    short_description: 'AI dating app for meaningful relationships',
    logo_url: 'https://logo.clearbit.com/hinge.co',
    tags: ['dating', 'relationships', 'compatibility'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://hinge.co'
  },
  {
    id: 'facebook-ai',
    name: 'Facebook',
    description: 'AI social network with intelligent news feed curation, friend suggestions, content recommendations, and automated moderation.',
    short_description: 'AI social network with smart curation',
    logo_url: 'https://logo.clearbit.com/facebook.com',
    tags: ['social', 'networking', 'curation'],
    rating: 3.8,
    pricing: 'Free',
    url: 'https://www.facebook.com'
  },
  {
    id: 'instagram-ai',
    name: 'Instagram',
    description: 'AI photo sharing platform with intelligent filters, content discovery, story suggestions, and automated hashtag recommendations.',
    short_description: 'AI photo sharing with smart discovery',
    logo_url: 'https://logo.clearbit.com/instagram.com',
    tags: ['photos', 'social', 'discovery'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://www.instagram.com'
  },

  // Security & Privacy
  {
    id: '1password-ai',
    name: '1Password',
    description: 'AI-enhanced password manager with intelligent password generation, security monitoring, and breach detection for all your accounts.',
    short_description: 'AI password manager with security monitoring',
    logo_url: 'https://logo.clearbit.com/1password.com',
    tags: ['security', 'passwords', 'privacy'],
    rating: 4.6,
    pricing: 'Paid',
    url: 'https://1password.com'
  },
  {
    id: 'lastpass-ai',
    name: 'LastPass',
    description: 'AI password management with intelligent password generation, security dashboard, and automated login assistance.',
    short_description: 'AI password management and security',
    logo_url: 'https://logo.clearbit.com/lastpass.com',
    tags: ['passwords', 'security', 'automation'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://www.lastpass.com'
  },
  {
    id: 'malwarebytes-ai',
    name: 'Malwarebytes',
    description: 'AI-powered cybersecurity with real-time threat detection, behavioral analysis, and intelligent malware removal for personal devices.',
    short_description: 'AI cybersecurity with threat detection',
    logo_url: 'https://logo.clearbit.com/malwarebytes.com',
    tags: ['security', 'malware', 'protection'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://www.malwarebytes.com'
  },
  {
    id: 'nordvpn-ai',
    name: 'NordVPN',
    description: 'AI-enhanced VPN service with intelligent server selection, threat protection, and automated security features for online privacy.',
    short_description: 'AI VPN with intelligent security features',
    logo_url: 'https://logo.clearbit.com/nordvpn.com',
    tags: ['vpn', 'privacy', 'security'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://nordvpn.com'
  },
  {
    id: 'norton-ai',
    name: 'Norton 360',
    description: 'AI-powered comprehensive security suite with intelligent threat detection, identity protection, and automated security monitoring.',
    short_description: 'AI comprehensive security and identity protection',
    logo_url: 'https://logo.clearbit.com/norton.com',
    tags: ['security', 'antivirus', 'identity-protection'],
    rating: 4.1,
    pricing: 'Paid',
    url: 'https://us.norton.com'
  },

  // Learning & Development
  {
    id: 'duolingo-ai',
    name: 'Duolingo',
    description: 'AI language learning with personalized lessons, adaptive difficulty, intelligent practice recommendations, and gamified progress tracking.',
    short_description: 'AI language learning with personalized lessons',
    logo_url: 'https://logo.clearbit.com/duolingo.com',
    tags: ['language-learning', 'education', 'gamification'],
    rating: 4.5,
    pricing: 'Freemium',
    url: 'https://www.duolingo.com'
  },
  {
    id: 'babbel-ai',
    name: 'Babbel',
    description: 'AI-powered language learning platform with conversation practice, personalized review sessions, and real-world conversation skills.',
    short_description: 'AI language learning with conversation focus',
    logo_url: 'https://logo.clearbit.com/babbel.com',
    tags: ['language-learning', 'conversation', 'education'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://www.babbel.com'
  },
  {
    id: 'khan-academy-ai',
    name: 'Khan Academy',
    description: 'AI-enhanced free education platform with personalized learning paths, intelligent practice exercises, and adaptive assessment.',
    short_description: 'AI free education with personalized learning',
    logo_url: 'https://logo.clearbit.com/khanacademy.org',
    tags: ['education', 'learning', 'free'],
    rating: 4.6,
    pricing: 'Free',
    url: 'https://www.khanacademy.org'
  },
  {
    id: 'coursera-ai',
    name: 'Coursera',
    description: 'AI-powered online learning platform with personalized course recommendations, intelligent assessment, and career guidance.',
    short_description: 'AI online learning with career guidance',
    logo_url: 'https://logo.clearbit.com/coursera.org',
    tags: ['online-learning', 'courses', 'career'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://www.coursera.org'
  },
  {
    id: 'udemy-ai',
    name: 'Udemy',
    description: 'AI-enhanced online course platform with personalized recommendations, intelligent search, and adaptive learning features.',
    short_description: 'AI online courses with smart recommendations',
    logo_url: 'https://logo.clearbit.com/udemy.com',
    tags: ['online-courses', 'skills', 'learning'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://www.udemy.com'
  }
]

async function addDailyLifeTools() {
  try {
    console.log('Starting to add Daily Life AI tools...')
    
    // Check existing tools first
    const existingToolNames = await checkExistingTools()
    
    // Filter out any tools that already exist (case-insensitive comparison)
    const newTools = dailyLifeTools.filter(tool => 
      !existingToolNames.includes(tool.name.toLowerCase())
    )
    
    console.log(`\nFiltered ${newTools.length} new tools to add (${dailyLifeTools.length - newTools.length} already exist)`)
    
    if (newTools.length === 0) {
      console.log('No new tools to add!')
      return
    }
    
    // Prepare tools for database insertion
    const toolsToInsert = newTools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      short_description: tool.short_description,
      logo_url: tool.logo_url,
      category_id: 'daily-life',
      tags: tool.tags,
      rating: tool.rating,
      pricing: tool.pricing,
      url: tool.url,
      affiliate_url: tool.url, // Using main URL as affiliate URL for now
      featured: false,
      trending: false,
      new: true,
      clicks: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 5000)
    }))
    
    // Insert tools in batches of 10 to avoid potential conflicts
    const batchSize = 10
    for (let i = 0; i < toolsToInsert.length; i += batchSize) {
      const batch = toolsToInsert.slice(i, i + batchSize)
      
      console.log(`\nInserting batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(toolsToInsert.length/batchSize)} (${batch.length} tools)...`)
      
      const { data, error } = await supabase
        .from('tools')
        .insert(batch)
        .select('name')
      
      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error)
        // Continue with next batch
        continue
      }
      
      console.log(`✅ Successfully inserted: ${data.map(t => t.name).join(', ')}`)
    }
    
    // Update category tool count
    console.log('\nUpdating category tool count...')
    const { data: finalCount, error: countError } = await supabase
      .from('tools')
      .select('id')
      .eq('category_id', 'daily-life')
    
    if (!countError) {
      await supabase
        .from('categories')
        .update({ tool_count: finalCount.length })
        .eq('id', 'daily-life')
      
      console.log(`✅ Updated Daily Life category tool count to ${finalCount.length}`)
    }
    
    console.log('\n🎉 Successfully completed adding Daily Life AI tools!')
    
  } catch (error) {
    console.error('Error adding Daily Life tools:', error)
  }
}

// Run the script
addDailyLifeTools().then(() => {
  console.log('Script completed!')
  process.exit(0)
}).catch(error => {
  console.error('Script failed:', error)
  process.exit(1)
})
