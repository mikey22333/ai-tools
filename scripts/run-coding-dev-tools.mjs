import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function runCodingDevScript() {
  try {
    console.log('Reading SQL file...');
    const sqlContent = readFileSync('database/add-coding-development-tools.sql', 'utf8');
    
    console.log('Executing SQL...');
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent });
    
    if (error) {
      console.error('SQL Error:', error);
      return;
    }
    
    console.log('✅ Successfully added coding & development tools!');
    console.log('Result:', data);

    // Verify the count
    const { data: countData, error: countError } = await supabase
      .from('tools')
      .select('count', { count: 'exact', head: true })
      .eq('category_id', 'coding-development');

    if (countError) {
      console.error('Error counting tools:', countError);
    } else {
      console.log(`Total tools in Coding & Development: ${countData.length}`);
    }

  } catch (error) {
    console.error('Error running script:', error);
  }
}

runCodingDevScript();
