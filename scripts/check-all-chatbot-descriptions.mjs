import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function checkAllChatbotDescriptions() {
  const { data, error } = await supabase
    .from('tools')
    .select('name, description')
    .eq('category_id', 'chatbots-virtual-companions')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total chatbot tools: ${data.length}`);
  
  const withoutDesc = data.filter(tool => !tool.description || tool.description.trim() === '');
  const withGenericDesc = data.filter(tool => 
    tool.description && 
    (tool.description.length < 20 || 
     tool.description.toLowerCase().includes('ai tool') ||
     tool.description.toLowerCase().includes('coming soon'))
  );
  
  console.log(`\nTools without descriptions: ${withoutDesc.length}`);
  withoutDesc.forEach(tool => {
    console.log(`- ${tool.name}`);
  });
  
  console.log(`\nTools with potentially generic descriptions: ${withGenericDesc.length}`);
  withGenericDesc.forEach(tool => {
    console.log(`- ${tool.name}: "${tool.description}"`);
  });
  
  // Show some examples of good descriptions
  console.log('\nExamples of well-described tools:');
  data.filter(tool => tool.description && tool.description.length > 50)
       .slice(0, 5)
       .forEach(tool => {
    console.log(`- ${tool.name}: "${tool.description}"`);
  });
}

checkAllChatbotDescriptions();
