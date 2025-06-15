import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// 15 additional unique AI coding & development tools
const additionalCodingTools = [
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude',
    description: 'AI assistant for coding, analysis, and technical documentation with strong reasoning capabilities',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Analysis', 'Documentation'],
    rating: 4.6,
    pricing: 'Freemium',
    url: 'https://claude.ai',
    logo_url: 'https://claude.ai/favicon.ico'
  },
  {
    id: 'aicode',
    name: 'AiCode',
    description: 'AI-powered code generation and completion for multiple programming languages',
    category_id: 'coding-development',
    tags: ['Code Generation', 'AI Completion', 'Multi-Language'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://aicode.app',
    logo_url: 'https://aicode.app/favicon.ico'
  },
  {
    id: 'continue-ai',
    name: 'Continue AI',
    description: 'Open-source AI code assistant that integrates directly into VS Code and JetBrains IDEs',
    category_id: 'coding-development',
    tags: ['VS Code Extension', 'Open Source', 'AI Assistant'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://continue.dev',
    logo_url: 'https://continue.dev/favicon.ico'
  },
  {
    id: 'codey-google',
    name: 'Codey by Google',
    description: 'Google\'s AI model for code generation, completion, and explanation',
    category_id: 'coding-development',
    tags: ['Google AI', 'Code Generation', 'Code Explanation'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://cloud.google.com/vertex-ai/docs/generative-ai/code/code-models-overview',
    logo_url: 'https://cloud.google.com/favicon.ico'
  },
  {
    id: 'aider-ai',
    name: 'Aider',
    description: 'AI pair programming tool that works with git repos and makes coordinated code changes',
    category_id: 'coding-development',
    tags: ['Pair Programming', 'Git Integration', 'AI Assistant'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://aider.chat',
    logo_url: 'https://aider.chat/favicon.ico'
  },
  {
    id: 'mutable-ai',
    name: 'Mutable AI',
    description: 'AI-accelerated software development with code generation and repository analysis',
    category_id: 'coding-development',
    tags: ['Code Generation', 'Repository Analysis', 'AI Development'],
    rating: 3.9,
    pricing: 'Freemium',
    url: 'https://mutable.ai',
    logo_url: 'https://mutable.ai/favicon.ico'
  },
  {
    id: 'phind',
    name: 'Phind',
    description: 'AI search engine specifically designed for developers with code examples and explanations',
    category_id: 'coding-development',
    tags: ['Developer Search', 'Code Examples', 'AI Search'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://phind.com',
    logo_url: 'https://phind.com/favicon.ico'
  },
  {
    id: 'chatgpt-code-interpreter',
    name: 'ChatGPT Code Interpreter',
    description: 'OpenAI\'s ChatGPT with advanced code analysis and execution capabilities',
    category_id: 'coding-development',
    tags: ['OpenAI', 'Code Analysis', 'Code Execution'],
    rating: 4.5,
    pricing: 'Paid',
    url: 'https://chat.openai.com',
    logo_url: 'https://chat.openai.com/favicon.ico'
  },
  {
    id: 'safurai',
    name: 'Safurai',
    description: 'AI code assistant with advanced search, explanations, and optimization suggestions',
    category_id: 'coding-development',
    tags: ['Code Assistant', 'Code Search', 'Optimization'],
    rating: 3.8,
    pricing: 'Freemium',
    url: 'https://safurai.com',
    logo_url: 'https://safurai.com/favicon.ico'
  },
  {
    id: 'codegpt',
    name: 'CodeGPT',
    description: 'AI coding assistant extension for VS Code with multiple AI model support',
    category_id: 'coding-development',
    tags: ['VS Code Extension', 'Multiple AI Models', 'Code Assistant'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://codegpt.co',
    logo_url: 'https://codegpt.co/favicon.ico'
  },
  {
    id: 'ghostwriter-replit',
    name: 'Replit Ghostwriter',
    description: 'AI pair programmer integrated into Replit for real-time code completion and generation',
    category_id: 'coding-development',
    tags: ['Replit', 'Pair Programming', 'Real-time AI'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://replit.com/site/ghostwriter',
    logo_url: 'https://replit.com/favicon.ico'
  },
  {
    id: 'wiseone-ai',
    name: 'WiseOne AI',
    description: 'AI-powered code intelligence platform for understanding and improving codebases',
    category_id: 'coding-development',
    tags: ['Code Intelligence', 'Codebase Analysis', 'AI Insights'],
    rating: 3.7,
    pricing: 'Freemium',
    url: 'https://wiseone.ai',
    logo_url: 'https://wiseone.ai/favicon.ico'
  },
  {
    id: 'devgpt',
    name: 'DevGPT',
    description: 'Specialized AI assistant for developers with coding, debugging, and architecture guidance',
    category_id: 'coding-development',
    tags: ['Developer Assistant', 'Debugging', 'Architecture'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://devgpt.com',
    logo_url: 'https://devgpt.com/favicon.ico'
  },
  {
    id: 'programming-helper',
    name: 'Programming Helper',
    description: 'AI tool for generating code, SQL queries, HTML/CSS, and explaining programming concepts',
    category_id: 'coding-development',
    tags: ['Code Generation', 'SQL', 'Web Development'],
    rating: 3.9,
    pricing: 'Freemium',
    url: 'https://programming-helper.com',
    logo_url: 'https://programming-helper.com/favicon.ico'
  },
  {
    id: 'codex-openai',
    name: 'OpenAI Codex API',
    description: 'OpenAI\'s powerful code-understanding AI model available via API for custom integrations',
    category_id: 'coding-development',
    tags: ['OpenAI API', 'Code Understanding', 'Custom Integration'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://openai.com/blog/openai-codex',
    logo_url: 'https://openai.com/favicon.ico'
  }
];

async function addRemainingCodingTools() {
  console.log('Adding remaining 15 coding & development tools to reach 100 total...');
  
  let successCount = 0;
  let errorCount = 0;

  for (const tool of additionalCodingTools) {
    try {
      // Check if tool already exists
      const { data: existingTool } = await supabase
        .from('tools')
        .select('id')
        .eq('id', tool.id)
        .single();

      if (existingTool) {
        // Update existing tool
        const { error } = await supabase
          .from('tools')
          .update(tool)
          .eq('id', tool.id);

        if (error) {
          console.error(`❌ Error updating ${tool.name}:`, error.message);
          errorCount++;
        } else {
          console.log(`🔄 Updated ${tool.name}`);
          successCount++;
        }
      } else {
        // Insert new tool
        const { error } = await supabase
          .from('tools')
          .insert(tool);

        if (error) {
          console.error(`❌ Error adding ${tool.name}:`, error.message);
          errorCount++;
        } else {
          console.log(`✅ Added ${tool.name}`);
          successCount++;
        }
      }
    } catch (err) {
      console.error(`❌ Exception with ${tool.name}:`, err);
      errorCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Successfully processed: ${successCount} tools`);
  console.log(`❌ Errors: ${errorCount} tools`);

  // Update category tool count
  try {
    const { count, error: countError } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', 'coding-development');

    if (countError) {
      console.error('Error counting tools:', countError);
    } else {
      console.log(`\n📈 Total tools in Coding & Development: ${count || 0}`);

      // Update the category tool_count
      const { error: updateError } = await supabase
        .from('categories')
        .update({ tool_count: count || 0 })
        .eq('id', 'coding-development');

      if (updateError) {
        console.error('Error updating category count:', updateError);
      } else {
        console.log('✅ Updated category tool count');
      }
    }
  } catch (err) {
    console.error('Error in final count:', err);
  }
}

addRemainingCodingTools();
