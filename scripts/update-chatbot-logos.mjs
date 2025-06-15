import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mapping of tool names to logo URLs
const logoUpdates = {
  'Character.AI': 'https://character.ai/favicon.ico',
  'Replika': 'https://replika.com/favicon.ico',
  'Chai': 'https://www.chai-research.com/favicon.ico',
  'Chai Research': 'https://www.chai-research.com/favicon.ico',
  'Chai AI': 'https://www.chai-research.com/favicon.ico',
  'Chai App': 'https://www.chai-research.com/favicon.ico',
  'Botify AI': 'https://botify.com/favicon.ico',
  'Kajiwoto': 'https://kajiwoto.ai/favicon.ico',
  'Kajiwoto AI': 'https://kajiwoto.ai/favicon.ico',
  'Anima AI': 'https://myanima.ai/favicon.ico',
  'SoulDeep AI': 'https://souldeep.ai/favicon.ico',
  'Romantic AI': 'https://romantic.ai/favicon.ico',
  'EVA AI': 'https://eva.ai/favicon.ico',
  'Eva AI': 'https://eva.ai/favicon.ico',
  'Paradot': 'https://paradot.ai/favicon.ico',
  'Paradot AI': 'https://paradot.ai/favicon.ico',
  'DreamBF': 'https://dreambf.ai/favicon.ico',
  'Nomi AI': 'https://nomi.ai/favicon.ico',
  'Kindroid': 'https://kindroid.ai/favicon.ico',
  'Crushon.AI': 'https://crushon.ai/favicon.ico',
  'CrushOn.AI': 'https://crushon.ai/favicon.ico',
  'CrushOn AI': 'https://crushon.ai/favicon.ico',
  'Tavern AI': 'https://tavernai.net/favicon.ico',
  'Janitor AI': 'https://janitorai.com/favicon.ico',
  'SpicyChat AI': 'https://spicychat.ai/favicon.ico',
  'Muah AI': 'https://muah.ai/favicon.ico',
  'Dittin AI': 'https://dittin.ai/favicon.ico',
  'Joyland AI': 'https://joyland.ai/favicon.ico',
  'Candy AI': 'https://candy.ai/favicon.ico',
  'Candy.ai': 'https://candy.ai/favicon.ico',
  'Dreamgf AI': 'https://dreamgf.ai/favicon.ico',
  'DreamGF': 'https://dreamgf.ai/favicon.ico',
  'DreamGF AI': 'https://dreamgf.ai/favicon.ico',
  'FantasyGF AI': 'https://fantasygf.ai/favicon.ico',
  'Girlfriend GPT': 'https://girlfriend-gpt.com/favicon.ico',
  'MyAI Girlfriend': 'https://myaigirlfriend.com/favicon.ico',
  'MyAnima': 'https://myanima.ai/favicon.ico',
  'Nextpart AI': 'https://nextpart.ai/favicon.ico',
  'PepHop AI': 'https://pephop.ai/favicon.ico',
  'Seduced AI': 'https://seduced.ai/favicon.ico',
  'Soulgen AI': 'https://soulgen.ai/favicon.ico',
  'Soulmate AI': 'https://soulmate.ai/favicon.ico',
  'Waifu Labs': 'https://waifulabs.com/favicon.ico',
  'Kupid AI': 'https://kupid.ai/favicon.ico',
  'Promptchan AI': 'https://promptchan.ai/favicon.ico',
  'Unstable Diffusion': 'https://unstable-diffusion.com/favicon.ico',
  'OnlyWaifus': 'https://onlywaifus.ai/favicon.ico',
  'Waifu XL': 'https://waifuxl.com/favicon.ico',
  'AI Dungeon': 'https://aidungeon.io/favicon.ico',
  'Novel AI': 'https://novelai.net/favicon.ico',
  'NovelAI': 'https://novelai.net/favicon.ico',
  'Sudowrite': 'https://sudowrite.com/favicon.ico',
  'Inferkit': 'https://inferkit.com/favicon.ico',
  'ChatMapper': 'https://chatmapper.com/favicon.ico',
  'Botpress': 'https://botpress.com/favicon.ico',
  'Microsoft Bot Framework': 'https://dev.botframework.com/favicon.ico',
  'Rasa': 'https://rasa.com/favicon.ico',
  'Dialogflow': 'https://cloud.google.com/favicon.ico',
  'Google Dialogflow': 'https://cloud.google.com/favicon.ico',
  'Amazon Lex': 'https://aws.amazon.com/favicon.ico',
  'Lex.ai Framework': 'https://aws.amazon.com/favicon.ico',
  'IBM Watson Assistant': 'https://ibm.com/favicon.ico',
  'Wit.ai': 'https://wit.ai/favicon.ico',
  'Wit.ai by Meta': 'https://wit.ai/favicon.ico',
  'ManyChat': 'https://manychat.com/favicon.ico',
  'Chatfuel': 'https://chatfuel.com/favicon.ico',
  'Flow XO': 'https://flowxo.com/favicon.ico',
  'Botsify': 'https://botsify.com/favicon.ico',
  'Motion AI': 'https://motion.ai/favicon.ico',
  'Sequel': 'https://sequel.io/favicon.ico',
  'Landbot': 'https://landbot.io/favicon.ico',
  'Tars': 'https://hellotars.com/favicon.ico',
  'Drift': 'https://drift.com/favicon.ico',
  'Drift Bot': 'https://drift.com/favicon.ico',
  'Intercom': 'https://intercom.com/favicon.ico',
  'Intercom Bot': 'https://intercom.com/favicon.ico',
  'Zendesk Chat': 'https://zendesk.com/favicon.ico',
  'Zendesk Answer Bot': 'https://zendesk.com/favicon.ico',
  'LiveChat': 'https://livechat.com/favicon.ico',
  'Freshchat': 'https://freshworks.com/favicon.ico',
  'Crisp': 'https://crisp.chat/favicon.ico',
  'Tidio': 'https://tidio.com/favicon.ico',
  'Tidio Bot': 'https://tidio.com/favicon.ico',
  'Olark': 'https://olark.com/favicon.ico',
  'Pure Chat': 'https://purechat.com/favicon.ico',
  'Comm100': 'https://comm100.com/favicon.ico',
  'LiveAgent': 'https://liveagent.com/favicon.ico',
  'Help Scout': 'https://helpscout.com/favicon.ico',
  'UserVoice': 'https://uservoice.com/favicon.ico',
  'Kayako': 'https://kayako.com/favicon.ico',
  'Desk.com': 'https://salesforce.com/favicon.ico',
  'Zoho Desk': 'https://zoho.com/favicon.ico',
  'ServiceNow': 'https://servicenow.com/favicon.ico',
  'Salesforce Service Cloud': 'https://salesforce.com/favicon.ico',
  'HubSpot Service Hub': 'https://hubspot.com/favicon.ico',
  'Ada': 'https://ada.cx/favicon.ico',
  'Bold360': 'https://bold360.com/favicon.ico',
  'LiveWorld': 'https://liveworld.com/favicon.ico',
  'Acquire': 'https://acquire.io/favicon.ico',
  'Userlike': 'https://userlike.com/favicon.ico',
  'SnapEngage': 'https://snapengage.com/favicon.ico',
  'BoldChat': 'https://boldchat.com/favicon.ico',
  'Click4Assistance': 'https://click4assistance.co.uk/favicon.ico',
  'LivePerson': 'https://liveperson.com/favicon.ico',
  'ContactAtOnce': 'https://contactatonce.com/favicon.ico',
  'Velaro': 'https://velaro.com/favicon.ico',
  'Provide Support': 'https://providesupport.com/favicon.ico',
  'MyLiveChat': 'https://mylivechat.com/favicon.ico',
  'WebsiteAlive': 'https://websitealive.com/favicon.ico',
  'WhosOn': 'https://whoson.com/favicon.ico',
  'LiveZilla': 'https://livezilla.net/favicon.ico',
  'CafeX': 'https://cafex.com/favicon.ico',
  'eGain': 'https://egain.com/favicon.ico',
  'InContact': 'https://incontact.com/favicon.ico',
  'Genesys': 'https://genesys.com/favicon.ico',
  'Nuance': 'https://nuance.com/favicon.ico',
  'Aspect': 'https://aspect.com/favicon.ico',
  'Avaya': 'https://avaya.com/favicon.ico',
  'Cisco': 'https://cisco.com/favicon.ico',
  'Oracle': 'https://oracle.com/favicon.ico',
  'SAP': 'https://sap.com/favicon.ico',
  'Pegasystems': 'https://pega.com/favicon.ico',
  'Verint': 'https://verint.com/favicon.ico',
  'Nice': 'https://nice.com/favicon.ico',
  'Calabrio': 'https://calabrio.com/favicon.ico',
  'Envision': 'https://envision.com/favicon.ico',
  // Major tech companies and platforms
  'ChatGPT': 'https://openai.com/favicon.ico',
  'Claude': 'https://anthropic.com/favicon.ico',
  'Claude Instant': 'https://anthropic.com/favicon.ico',
  'Anthropic Assistant': 'https://anthropic.com/favicon.ico',
  'Google Bard': 'https://bard.google.com/favicon.ico',
  'Microsoft Bing Chat': 'https://bing.com/favicon.ico',
  'Poe by Quora': 'https://poe.com/favicon.ico',
  'Pi by Inflection AI': 'https://pi.ai/favicon.ico',
  'Cohere Chat': 'https://cohere.ai/favicon.ico',
  'Hugging Face Chat': 'https://huggingface.co/favicon.ico',
  // Voice assistants
  'Apple Siri': 'https://apple.com/favicon.ico',
  'Amazon Alexa': 'https://alexa.amazon.com/favicon.ico',
  'Google Assistant': 'https://assistant.google.com/favicon.ico',
  'Microsoft Cortana': 'https://cortana.microsoft.com/favicon.ico',
  'Samsung Bixby': 'https://samsung.com/favicon.ico',
  // Messaging platforms
  'WhatsApp Business AI': 'https://business.whatsapp.com/favicon.ico',
  'Facebook Messenger AI': 'https://messenger.com/favicon.ico',
  'Slack AI Assistant': 'https://slack.com/favicon.ico',
  'Discord AI Bots': 'https://discord.com/favicon.ico',
  'Telegram AI Bots': 'https://telegram.org/favicon.ico',
  // Education and learning
  'Socratic by Google': 'https://socratic.org/favicon.ico',
  'Duolingo AI': 'https://duolingo.com/favicon.ico',
  'Khan Academy AI Tutor': 'https://khanacademy.org/favicon.ico',
  'StudyBuddy AI': 'https://studybuddy.ai/favicon.ico',
  'Wolfram Alpha': 'https://wolframalpha.com/favicon.ico',
  'PhotoMath AI': 'https://photomath.com/favicon.ico',
  // Health and wellness
  'Woebot': 'https://woebot.io/favicon.ico',
  'Wysa': 'https://wysa.io/favicon.ico',
  'Youper': 'https://youper.ai/favicon.ico',
  'Babylon Health AI': 'https://babylonhealth.com/favicon.ico',
  'Ada Health AI': 'https://ada.com/favicon.ico',
  'K Health AI': 'https://khealth.ai/favicon.ico',
  'Mindful AI': 'https://mindful.org/favicon.ico',
  'Calm AI': 'https://calm.com/favicon.ico',
  'Headspace AI': 'https://headspace.com/favicon.ico',
  // Productivity and scheduling
  'Clockify AI': 'https://clockify.me/favicon.ico',
  'Reclaim AI': 'https://reclaim.ai/favicon.ico',
  'Clara AI': 'https://clara.com/favicon.ico',
  'x.ai Amy': 'https://x.ai/favicon.ico',
  // Finance
  'Cleo AI': 'https://meetcleo.com/favicon.ico',
  'Trim AI': 'https://trim.com/favicon.ico',
  'Mint AI Assistant': 'https://mint.com/favicon.ico',
  'YOLT AI': 'https://yolt.com/favicon.ico',
  'PocketGuard AI': 'https://pocketguard.com/favicon.ico',
  // Travel and shopping
  'Hopper AI': 'https://hopper.com/favicon.ico',
  'KAYAK AI': 'https://kayak.com/favicon.ico',
  'Expedia Bot': 'https://expedia.com/favicon.ico',
  'Booking.com Bot': 'https://booking.com/favicon.ico',
  'TripAdvisor AI': 'https://tripadvisor.com/favicon.ico',
  'Shopify Bot': 'https://shopify.com/favicon.ico',
  'Amazon Shopping AI': 'https://amazon.com/favicon.ico',
  'Wishlist AI': 'https://wishlist.com/favicon.ico',
  'Honey AI': 'https://joinhoney.com/favicon.ico',
  'Rakuten AI': 'https://rakuten.com/favicon.ico',
  // Gaming and creative
  'Inworld AI': 'https://inworld.ai/favicon.ico',
  'Latitude AI': 'https://latitude.io/favicon.ico',
  'Character Creator AI': 'https://charactercreator.ai/favicon.ico',
  'Character Engine': 'https://characterengine.ai/favicon.ico',
  'ConvAI Gaming': 'https://convai.com/favicon.ico',
  'AI Text Adventure': 'https://aitextadventure.com/favicon.ico',
  'SillyTavern': 'https://sillytavernai.com/favicon.ico',
  'Pygmalion AI': 'https://pygmalion.ai/favicon.ico',
  'KoboldAI': 'https://koboldai.org/favicon.ico',
  // Productivity helpers
  'Tess AI': 'https://tess.ai/favicon.ico',
  'Ellie AI': 'https://ellie.ai/favicon.ico',
  'Linky AI': 'https://linky.ai/favicon.ico'
};

async function updateChatbotLogos() {
  try {
    // First, get the category ID for Chatbots & Virtual Companions
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Chatbots & Virtual Companions')
      .single();

    if (categoryError || !categoryData) {
      console.error('Error getting category:', categoryError);
      return;
    }

    const categoryId = categoryData.id;
    console.log(`Found category ID: ${categoryId}`);

    // Get all tools in this category
    const { data: tools, error: toolsError } = await supabase
      .from('tools')
      .select('id, name, logo_url')
      .eq('category_id', categoryId);

    if (toolsError) {
      console.error('Error getting tools:', toolsError);
      return;
    }

    console.log(`Found ${tools.length} tools to update`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Update each tool's logo URL
    for (const tool of tools) {
      const logoUrl = logoUpdates[tool.name];
      
      if (logoUrl && logoUrl !== tool.logo_url) {
        const { error: updateError } = await supabase
          .from('tools')
          .update({ logo_url: logoUrl })
          .eq('id', tool.id);

        if (updateError) {
          console.error(`Error updating ${tool.name}:`, updateError);
        } else {
          console.log(`✅ Updated ${tool.name}: ${logoUrl}`);
          updatedCount++;
        }
      } else if (logoUrl) {
        console.log(`⏭️  Skipped ${tool.name} (already has correct logo)`);
        skippedCount++;
      } else {
        console.log(`⚠️  No logo URL mapping found for: ${tool.name}`);
        skippedCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n✅ Update complete!`);
    console.log(`- Updated: ${updatedCount} tools`);
    console.log(`- Skipped: ${skippedCount} tools`);

    // Verify the updates
    const { data: verifyData, error: verifyError } = await supabase
      .from('tools')
      .select('name, logo_url')
      .eq('category_id', categoryId)
      .not('logo_url', 'is', null)
      .limit(10);

    if (verifyError) {
      console.error('Error verifying updates:', verifyError);
    } else {
      console.log('\n📋 Sample updated tools:');
      verifyData?.forEach(tool => {
        console.log(`- ${tool.name}: ${tool.logo_url}`);
      });
    }

  } catch (error) {
    console.error('Error updating chatbot logos:', error);
  }
}

updateChatbotLogos();
