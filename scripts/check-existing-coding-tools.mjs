import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function checkExistingCodingTools() {
  const { data, error } = await supabase
    .from('tools')
    .select('name')
    .eq('category_id', 'coding-development')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Current tools in Coding & Development category: ${data.length}`);
  data.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
  });
}

checkExistingCodingTools();
