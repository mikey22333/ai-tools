import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function verifyChatbotLogos() {
  const { data } = await supabase
    .from('tools')
    .select('name, logo_url')
    .eq('category_id', 'chatbots-virtual-companions')
    .not('logo_url', 'is', null)
    .order('name')
    .limit(20);

  console.log('First 20 chatbot tools with logos:');
  data.forEach(tool => {
    console.log(`✅ ${tool.name}: ${tool.logo_url}`);
  });

  // Count total tools with logos
  const { count } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', 'chatbots-virtual-companions')
    .not('logo_url', 'is', null);

  console.log(`\n📊 Total chatbot tools with logos: ${count}`);
}

verifyChatbotLogos();
