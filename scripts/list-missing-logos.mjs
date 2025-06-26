import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function listToolsWithoutLogos() {
  const { data } = await supabase
    .from('tools')
    .select('name, logo_url')
    .eq('category_id', 'chatbots-virtual-companions')
    .is('logo_url', null);

  console.log('Tools without logos:');
  data.forEach(tool => console.log('-', tool.name));
}

listToolsWithoutLogos();
