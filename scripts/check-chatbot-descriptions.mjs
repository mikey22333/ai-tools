import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function checkChatbotDescriptions() {
  const { data, error } = await supabase
    .from('tools')
    .select('name, description')
    .eq('category_id', 'chatbots-virtual-companions')
    .or('description.is.null,description.eq.')
    .order('name')
    .limit(20);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} chatbot tools without descriptions:`);
  data.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}: ${tool.description || 'NO DESCRIPTION'}`);
  });
}

checkChatbotDescriptions();
