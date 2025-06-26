import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function checkShortDescriptions() {
  const { data, error } = await supabase
    .from('tools')
    .select('name, description, short_description')
    .eq('category_id', 'chatbots-virtual-companions')
    .order('name')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Sample chatbot tools with short descriptions:');
  data.forEach((tool, index) => {
    console.log(`\n${index + 1}. ${tool.name}:`);
    console.log(`   Description: ${tool.description || 'NO DESCRIPTION'}`);
    console.log(`   Short Description: ${tool.short_description || 'NO SHORT DESCRIPTION'}`);
  });
}

checkShortDescriptions();
