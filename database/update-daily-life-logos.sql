-- Update logo URLs for Daily Life AI tools
-- This script adds logo_url values for all tools in the Daily Life category

UPDATE tools 
SET logo_url = CASE 
    -- Personal Productivity & Organization
    WHEN name = 'Notion AI' THEN 'https://notion.so/favicon.ico'
    WHEN name = 'Todoist' THEN 'https://todoist.com/favicon.ico'
    WHEN name = 'Any.do' THEN 'https://any.do/favicon.ico'
    WHEN name = 'ClickUp AI' THEN 'https://clickup.com/favicon.ico'
    WHEN name = 'Reclaim.ai' THEN 'https://reclaim.ai/favicon.ico'
    
    -- Smart Home & IoT
    WHEN name = 'Amazon Alexa' THEN 'https://alexa.amazon.com/favicon.ico'
    WHEN name = 'Google Assistant' THEN 'https://assistant.google.com/favicon.ico'
    WHEN name = 'Apple Siri' THEN 'https://apple.com/favicon.ico'
    WHEN name = 'Samsung Bixby' THEN 'https://bixby.samsung.com/favicon.ico'
    WHEN name = 'Philips Hue with AI' THEN 'https://philips-hue.com/favicon.ico'
    
    -- Health & Fitness
    WHEN name = 'MyFitnessPal AI' THEN 'https://myfitnesspal.com/favicon.ico'
    WHEN name = 'Fitbit Sense AI' THEN 'https://fitbit.com/favicon.ico'
    WHEN name = 'Calm AI' THEN 'https://calm.com/favicon.ico'
    WHEN name = 'Headspace AI' THEN 'https://headspace.com/favicon.ico'
    WHEN name = 'Noom AI' THEN 'https://noom.com/favicon.ico'
    
    -- Personal Finance
    WHEN name = 'Mint AI' THEN 'https://mint.com/favicon.ico'
    WHEN name = 'YNAB AI' THEN 'https://youneedabudget.com/favicon.ico'
    WHEN name = 'Personal Capital AI' THEN 'https://personalcapital.com/favicon.ico'
    WHEN name = 'Cleo AI' THEN 'https://meetcleo.com/favicon.ico'
    WHEN name = 'Truebill AI' THEN 'https://truebill.com/favicon.ico'
    
    -- Transportation & Navigation
    WHEN name = 'Google Maps AI' THEN 'https://maps.google.com/favicon.ico'
    WHEN name = 'Waze AI' THEN 'https://waze.com/favicon.ico'
    WHEN name = 'Uber AI' THEN 'https://uber.com/favicon.ico'
    WHEN name = 'Lyft AI' THEN 'https://lyft.com/favicon.ico'
    WHEN name = 'Citymapper AI' THEN 'https://citymapper.com/favicon.ico'
    
    -- Food & Cooking
    WHEN name = 'Yuka AI' THEN 'https://yuka.io/favicon.ico'
    WHEN name = 'PlantJammer AI' THEN 'https://plantjammer.com/favicon.ico'
    WHEN name = 'Whisk AI' THEN 'https://whisk.com/favicon.ico'
    WHEN name = 'Foodvisor AI' THEN 'https://foodvisor.io/favicon.ico'
    WHEN name = 'Epicurious AI' THEN 'https://epicurious.com/favicon.ico'
    
    -- Shopping & E-commerce
    WHEN name = 'Honey AI' THEN 'https://joinhoney.com/favicon.ico'
    WHEN name = 'Rakuten AI' THEN 'https://rakuten.com/favicon.ico'
    WHEN name = 'Amazon AI Recommendations' THEN 'https://amazon.com/favicon.ico'
    WHEN name = 'Instacart AI' THEN 'https://instacart.com/favicon.ico'
    WHEN name = 'Shipt AI' THEN 'https://shipt.com/favicon.ico'
    
    -- Entertainment & Media
    WHEN name = 'Spotify AI' THEN 'https://spotify.com/favicon.ico'
    WHEN name = 'Netflix AI' THEN 'https://netflix.com/favicon.ico'
    WHEN name = 'YouTube AI' THEN 'https://youtube.com/favicon.ico'
    WHEN name = 'Pandora AI' THEN 'https://pandora.com/favicon.ico'
    WHEN name = 'TikTok AI' THEN 'https://tiktok.com/favicon.ico'
    
    -- Communication & Email
    WHEN name = 'Grammarly AI' THEN 'https://grammarly.com/favicon.ico'
    WHEN name = 'Boomerang AI' THEN 'https://boomeranggmail.com/favicon.ico'
    WHEN name = 'Mixmax AI' THEN 'https://mixmax.com/favicon.ico'
    WHEN name = 'Crystal AI' THEN 'https://crystalknows.com/favicon.ico'
    WHEN name = 'Superhuman AI' THEN 'https://superhuman.com/favicon.ico'
    
    -- Learning & Education
    WHEN name = 'Duolingo AI' THEN 'https://duolingo.com/favicon.ico'
    WHEN name = 'Babbel AI' THEN 'https://babbel.com/favicon.ico'
    WHEN name = 'Coursera AI' THEN 'https://coursera.org/favicon.ico'
    WHEN name = 'Khan Academy AI' THEN 'https://khanacademy.org/favicon.ico'
    WHEN name = 'Brilliant AI' THEN 'https://brilliant.org/favicon.ico'
    
    -- Travel & Planning
    WHEN name = 'Kayak AI' THEN 'https://kayak.com/favicon.ico'
    WHEN name = 'Skyscanner AI' THEN 'https://skyscanner.com/favicon.ico'
    WHEN name = 'Airbnb AI' THEN 'https://airbnb.com/favicon.ico'
    WHEN name = 'TripAdvisor AI' THEN 'https://tripadvisor.com/favicon.ico'
    WHEN name = 'Hopper AI' THEN 'https://hopper.com/favicon.ico'
    
    -- Security & Privacy
    WHEN name = 'LastPass AI' THEN 'https://lastpass.com/favicon.ico'
    WHEN name = 'Dashlane AI' THEN 'https://dashlane.com/favicon.ico'
    WHEN name = 'Norton AI' THEN 'https://norton.com/favicon.ico'
    WHEN name = 'Malwarebytes AI' THEN 'https://malwarebytes.com/favicon.ico'
    WHEN name = 'ExpressVPN AI' THEN 'https://expressvpn.com/favicon.ico'
    
    -- Weather & Environment
    WHEN name = 'Weather AI' THEN 'https://weather.com/favicon.ico'
    WHEN name = 'Dark Sky AI' THEN 'https://darksky.net/favicon.ico'
    WHEN name = 'WeatherBug AI' THEN 'https://weatherbug.com/favicon.ico'
    WHEN name = 'AccuWeather AI' THEN 'https://accuweather.com/favicon.ico'
    WHEN name = 'Carrot Weather AI' THEN 'https://meetcarrot.com/favicon.ico'
    
    -- News & Information
    WHEN name = 'Flipboard AI' THEN 'https://flipboard.com/favicon.ico'
    WHEN name = 'Pocket AI' THEN 'https://getpocket.com/favicon.ico'
    WHEN name = 'Google News AI' THEN 'https://news.google.com/favicon.ico'
    WHEN name = 'Apple News AI' THEN 'https://apple.com/favicon.ico'
    WHEN name = 'Feedly AI' THEN 'https://feedly.com/favicon.ico'
    
    -- Photos & Visual
    WHEN name = 'Google Photos AI' THEN 'https://photos.google.com/favicon.ico'
    WHEN name = 'Apple Photos AI' THEN 'https://apple.com/favicon.ico'
    WHEN name = 'Amazon Photos AI' THEN 'https://amazon.com/favicon.ico'
    WHEN name = 'Prisma AI' THEN 'https://prisma-ai.com/favicon.ico'
    WHEN name = 'PhotoMath AI' THEN 'https://photomath.net/favicon.ico'
    
    -- Translation & Language
    WHEN name = 'Google Translate AI' THEN 'https://translate.google.com/favicon.ico'
    WHEN name = 'DeepL AI' THEN 'https://deepl.com/favicon.ico'
    WHEN name = 'Microsoft Translator AI' THEN 'https://translator.microsoft.com/favicon.ico'
    WHEN name = 'Papago AI' THEN 'https://papago.naver.com/favicon.ico'
    WHEN name = 'Reverso AI' THEN 'https://reverso.net/favicon.ico'
    
    -- Gaming & Entertainment
    WHEN name = 'Steam AI' THEN 'https://steampowered.com/favicon.ico'
    WHEN name = 'Chess.com AI' THEN 'https://chess.com/favicon.ico'
    WHEN name = 'Lichess AI' THEN 'https://lichess.org/favicon.ico'
    WHEN name = 'Peak AI' THEN 'https://peak.net/favicon.ico'
    WHEN name = 'Elevate AI' THEN 'https://elevateapp.com/favicon.ico'
    
    -- Voice & Transcription
    WHEN name = 'Otter.ai' THEN 'https://otter.ai/favicon.ico'
    WHEN name = 'Voice Recorder AI' THEN 'https://rev.com/favicon.ico'
    WHEN name = 'Dragon NaturallySpeaking AI' THEN 'https://nuance.com/favicon.ico'
    WHEN name = 'Whisper AI' THEN 'https://openai.com/favicon.ico'
    WHEN name = 'Speechify AI' THEN 'https://speechify.com/favicon.ico'
    
    -- Communication Platforms
    WHEN name = 'Zoom AI' THEN 'https://zoom.us/favicon.ico'
    WHEN name = 'Microsoft Teams AI' THEN 'https://teams.microsoft.com/favicon.ico'
    WHEN name = 'Slack AI' THEN 'https://slack.com/favicon.ico'
    WHEN name = 'Discord AI' THEN 'https://discord.com/favicon.ico'
    WHEN name = 'WhatsApp AI' THEN 'https://whatsapp.com/favicon.ico'
    WHEN name = 'Telegram AI' THEN 'https://telegram.org/favicon.ico'
    WHEN name = 'FaceTime AI' THEN 'https://apple.com/favicon.ico'
    WHEN name = 'Skype AI' THEN 'https://skype.com/favicon.ico'
    WHEN name = 'Google Meet AI' THEN 'https://meet.google.com/favicon.ico'
    WHEN name = 'Webex AI' THEN 'https://webex.com/favicon.ico'
    
    ELSE logo_url  -- Keep existing logo_url if no match
END
WHERE category_id = 'daily-life';

-- Update the category tool count
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'daily-life'
) 
WHERE id = 'daily-life';
