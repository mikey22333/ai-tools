import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function verifyCodingTools() {
  console.log('🔍 Verifying Coding & Development tools...\n');

  try {
    // Get category info
    const { data: category, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', 'coding-development')
      .single();

    if (catError) {
      console.error('Error fetching category:', catError);
      return;
    }

    console.log(`📂 Category: ${category.name}`);
    console.log(`📊 Tool count in category: ${category.tool_count}`);

    // Get actual tool count
    const { count, error: countError } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', 'coding-development');

    if (countError) {
      console.error('Error counting tools:', countError);
      return;
    }

    console.log(`🔢 Actual tools in database: ${count}`);

    // Get sample tools
    const { data: sampleTools, error: toolsError } = await supabase
      .from('tools')
      .select('id, name, rating, pricing')
      .eq('category_id', 'coding-development')
      .order('name')
      .limit(10);

    if (toolsError) {
      console.error('Error fetching sample tools:', toolsError);
      return;
    }

    console.log('\n📝 Sample tools:');
    sampleTools.forEach((tool, i) => {
      console.log(`${i + 1}. ${tool.name} (${tool.pricing}, ⭐ ${tool.rating})`);
    });

    // Check for tools without descriptions
    const { data: toolsWithoutDesc, error: descError } = await supabase
      .from('tools')
      .select('id, name')
      .eq('category_id', 'coding-development')
      .or('description.is.null,description.eq.')
      .limit(5);

    if (descError) {
      console.error('Error checking descriptions:', descError);
    } else if (toolsWithoutDesc.length > 0) {
      console.log('\n⚠️  Tools without descriptions:');
      toolsWithoutDesc.forEach(tool => {
        console.log(`- ${tool.name} (${tool.id})`);
      });
    } else {
      console.log('\n✅ All tools have descriptions');
    }

    // Check for tools without logo URLs
    const { data: toolsWithoutLogo, error: logoError } = await supabase
      .from('tools')
      .select('id, name')
      .eq('category_id', 'coding-development')
      .or('logo_url.is.null,logo_url.eq.')
      .limit(5);

    if (logoError) {
      console.error('Error checking logos:', logoError);
    } else if (toolsWithoutLogo.length > 0) {
      console.log('\n⚠️  Tools without logo URLs:');
      toolsWithoutLogo.forEach(tool => {
        console.log(`- ${tool.name} (${tool.id})`);
      });
    } else {
      console.log('✅ All tools have logo URLs');
    }

    console.log('\n🎉 Verification complete!');
    
  } catch (err) {
    console.error('Error during verification:', err);
  }
}

verifyCodingTools();
