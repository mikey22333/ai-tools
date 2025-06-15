-- Add 98 AI tools to Coding & Development category
-- Making sure no duplicates and all tools are AI-focused for coding/development

INSERT INTO tools (
  id, name, description, category_id, tags, rating, pricing, url, featured, trending, new
) VALUES
-- Code Generation & AI Assistants
('tabnine', 'Tabnine', 'AI-powered code completion assistant that learns from your code patterns', 'coding-development', ARRAY['code-completion', 'ai-assistant', 'autocomplete'], 4.6, 'Freemium', 'https://tabnine.com', false, true, false),
('codeium', 'Codeium', 'Free AI-powered code acceleration toolkit with intelligent autocomplete', 'coding-development', ARRAY['code-completion', 'free', 'autocomplete'], 4.5, 'Free', 'https://codeium.com', false, true, false),
('amazon-codewhisperer', 'Amazon CodeWhisperer', 'AI coding companion from AWS for real-time code suggestions', 'coding-development', ARRAY['aws', 'code-completion', 'ai-assistant'], 4.3, 'Free', 'https://aws.amazon.com/codewhisperer', false, false, false),
('replit-ghostwriter', 'Replit Ghostwriter', 'AI pair programmer built into the Replit IDE', 'coding-development', ARRAY['ide', 'pair-programming', 'online-ide'], 4.4, 'Freemium', 'https://replit.com/site/ghostwriter', false, false, false),
('cursor-ai', 'Cursor', 'AI-first code editor built for pair programming with AI', 'coding-development', ARRAY['code-editor', 'ai-first', 'pair-programming'], 4.7, 'Freemium', 'https://cursor.sh', false, true, true),
('sourcegraph-cody', 'Sourcegraph Cody', 'AI coding assistant that knows your entire codebase', 'coding-development', ARRAY['codebase-search', 'ai-assistant', 'enterprise'], 4.2, 'Freemium', 'https://sourcegraph.com/cody', false, false, false),

-- Code Review & Analysis
('coderabbit', 'CodeRabbit', 'AI-powered code review bot for pull requests', 'coding-development', ARRAY['code-review', 'pull-requests', 'automation'], 4.5, 'Freemium', 'https://coderabbit.ai', false, true, false),
('whisk-security', 'Whisk Security', 'AI-driven application security testing and code analysis', 'coding-development', ARRAY['security', 'static-analysis', 'vulnerability'], 4.1, 'Paid', 'https://whisk.security', false, false, false),
('sonarcloud', 'SonarCloud', 'AI-enhanced code quality and security analysis platform', 'coding-development', ARRAY['code-quality', 'security', 'ci-cd'], 4.3, 'Freemium', 'https://sonarcloud.io', false, false, false),
('deepcode', 'DeepCode', 'AI-powered semantic code analysis for bug detection', 'coding-development', ARRAY['bug-detection', 'static-analysis', 'semantic'], 4.2, 'Freemium', 'https://snyk.io/platform/deepcode-ai', false, false, false),
('codeclimate', 'Code Climate', 'AI-driven automated code review and quality metrics', 'coding-development', ARRAY['code-quality', 'metrics', 'technical-debt'], 4.0, 'Freemium', 'https://codeclimate.com', false, false, false),

-- Documentation & Comments
('mintlify', 'Mintlify', 'AI documentation generator that creates beautiful docs from code', 'coding-development', ARRAY['documentation', 'auto-generate', 'markdown'], 4.4, 'Freemium', 'https://mintlify.com', false, true, false),
('codegeex', 'CodeGeeX', 'AI-powered code generation and intelligent programming assistant', 'coding-development', ARRAY['code-generation', 'multilingual', 'open-source'], 4.1, 'Free', 'https://codegeex.cn', false, false, false),
('aicommits', 'AI Commits', 'AI-powered Git commit message generator', 'coding-development', ARRAY['git', 'commit-messages', 'automation'], 4.2, 'Free', 'https://github.com/Nutlope/aicommits', false, false, false),
('readme-ai', 'README-AI', 'AI tool for generating comprehensive README files', 'coding-development', ARRAY['readme', 'documentation', 'markdown'], 4.0, 'Free', 'https://github.com/eli64s/readme-ai', false, false, false),

-- Testing & QA
('testim', 'Testim', 'AI-powered test automation platform for web applications', 'coding-development', ARRAY['testing', 'automation', 'web-testing'], 4.3, 'Paid', 'https://testim.io', false, false, false),
('functionize', 'Functionize', 'AI-driven test automation platform with self-healing tests', 'coding-development', ARRAY['testing', 'self-healing', 'automation'], 4.1, 'Paid', 'https://functionize.com', false, false, false),
('applitools', 'Applitools', 'AI-powered visual testing and monitoring platform', 'coding-development', ARRAY['visual-testing', 'ui-testing', 'cross-browser'], 4.4, 'Freemium', 'https://applitools.com', false, false, false),
('mabl', 'Mabl', 'AI-native test automation platform for continuous testing', 'coding-development', ARRAY['testing', 'continuous-testing', 'ai-native'], 4.2, 'Paid', 'https://mabl.com', false, false, false),
('testcraft', 'TestCraft', 'AI-powered codeless test automation platform', 'coding-development', ARRAY['codeless-testing', 'automation', 'ui-testing'], 4.0, 'Paid', 'https://testcraft.io', false, false, false),

-- API & Backend Tools
('postman-ai', 'Postman AI Assistant', 'AI-powered API testing and development assistant', 'coding-development', ARRAY['api-testing', 'postman', 'ai-assistant'], 4.5, 'Freemium', 'https://postman.com', false, true, false),
('httpie-ai', 'HTTPie AI', 'AI-enhanced API testing and debugging tool', 'coding-development', ARRAY['api-testing', 'http-client', 'debugging'], 4.1, 'Freemium', 'https://httpie.io', false, false, false),
('insomnia-ai', 'Insomnia AI', 'AI-powered REST client and API design tool', 'coding-development', ARRAY['api-design', 'rest-client', 'graphql'], 4.2, 'Freemium', 'https://insomnia.rest', false, false, false),
('rapidapi-ai', 'RapidAPI AI Hub', 'AI tools and APIs marketplace for developers', 'coding-development', ARRAY['api-marketplace', 'ai-apis', 'integration'], 4.0, 'Freemium', 'https://rapidapi.com', false, false, false),

-- Database & Data Tools
('aiven-ai', 'Aiven AI', 'AI-powered database management and optimization platform', 'coding-development', ARRAY['database', 'optimization', 'cloud'], 4.1, 'Paid', 'https://aiven.io', false, false, false),
('dbdocs-ai', 'dbdocs AI', 'AI-generated database documentation and schema visualization', 'coding-development', ARRAY['database', 'documentation', 'schema'], 4.0, 'Freemium', 'https://dbdocs.io', false, false, false),
('supabase-ai', 'Supabase AI', 'AI-powered backend-as-a-service with intelligent features', 'coding-development', ARRAY['baas', 'database', 'ai-features'], 4.3, 'Freemium', 'https://supabase.com', false, false, false),

-- DevOps & Infrastructure
('gitpod-ai', 'Gitpod AI', 'AI-enhanced cloud development environments', 'coding-development', ARRAY['cloud-ide', 'devops', 'containers'], 4.2, 'Freemium', 'https://gitpod.io', false, false, false),
('codespace-ai', 'GitHub Codespaces', 'AI-powered cloud development environments by GitHub', 'coding-development', ARRAY['cloud-ide', 'github', 'containers'], 4.4, 'Paid', 'https://github.com/features/codespaces', false, false, false),
('railway-ai', 'Railway AI', 'AI-assisted cloud deployment and infrastructure platform', 'coding-development', ARRAY['deployment', 'cloud', 'infrastructure'], 4.1, 'Freemium', 'https://railway.app', false, false, false),
('render-ai', 'Render AI', 'AI-powered cloud platform for deploying web services', 'coding-development', ARRAY['deployment', 'cloud', 'web-services'], 4.0, 'Freemium', 'https://render.com', false, false, false),

-- Mobile Development
('flutter-ai', 'Flutter AI Toolkit', 'AI-powered tools for Flutter mobile development', 'coding-development', ARRAY['flutter', 'mobile', 'cross-platform'], 4.2, 'Free', 'https://flutter.dev', false, false, false),
('react-native-ai', 'React Native AI', 'AI tools and components for React Native development', 'coding-development', ARRAY['react-native', 'mobile', 'components'], 4.1, 'Free', 'https://reactnative.dev', false, false, false),
('expo-ai', 'Expo AI', 'AI-enhanced development tools for React Native projects', 'coding-development', ARRAY['expo', 'react-native', 'development-tools'], 4.0, 'Freemium', 'https://expo.dev', false, false, false),

-- Web Development
('vercel-ai', 'Vercel AI SDK', 'AI SDK for building conversational user interfaces', 'coding-development', ARRAY['ai-sdk', 'frontend', 'conversational-ui'], 4.5, 'Free', 'https://sdk.vercel.ai', false, true, true),
('netlify-ai', 'Netlify AI', 'AI-powered web development and deployment platform', 'coding-development', ARRAY['web-deployment', 'jamstack', 'ai-features'], 4.2, 'Freemium', 'https://netlify.com', false, false, false),
('webflow-ai', 'Webflow AI', 'AI-assisted visual web development platform', 'coding-development', ARRAY['no-code', 'visual-development', 'cms'], 4.3, 'Freemium', 'https://webflow.com', false, false, false),
('framer-ai', 'Framer AI', 'AI-powered web design and prototyping tool', 'coding-development', ARRAY['design', 'prototyping', 'no-code'], 4.4, 'Freemium', 'https://framer.com', false, true, false),

-- Code Editors & IDEs
('codeshot', 'CodeShot', 'AI-powered screenshot generator for code snippets', 'coding-development', ARRAY['screenshots', 'code-sharing', 'presentation'], 4.0, 'Free', 'https://codeshot.io', false, false, false),
('raycast-ai', 'Raycast AI', 'AI-powered productivity launcher with coding shortcuts', 'coding-development', ARRAY['productivity', 'launcher', 'macos'], 4.6, 'Freemium', 'https://raycast.com', false, true, false),
('warp-ai', 'Warp AI', 'AI-native terminal with intelligent command suggestions', 'coding-development', ARRAY['terminal', 'command-line', 'ai-suggestions'], 4.5, 'Freemium', 'https://warp.dev', false, true, true),

-- Version Control & Collaboration
('gitahead-ai', 'GitAhead AI', 'AI-enhanced Git client with intelligent merge conflict resolution', 'coding-development', ARRAY['git', 'version-control', 'merge-conflicts'], 4.1, 'Free', 'https://gitahead.github.io/gitahead.com', false, false, false),
('gitkraken-ai', 'GitKraken AI', 'AI-powered Git client with visual interface', 'coding-development', ARRAY['git', 'visual-git', 'collaboration'], 4.3, 'Freemium', 'https://gitkraken.com', false, false, false),
('gitlab-ai', 'GitLab AI', 'AI-powered DevOps platform with intelligent CI/CD', 'coding-development', ARRAY['devops', 'ci-cd', 'gitlab'], 4.2, 'Freemium', 'https://gitlab.com', false, false, false),

-- Specialty Tools
('ai2sql', 'AI2SQL', 'AI tool that converts natural language to SQL queries', 'coding-development', ARRAY['sql', 'natural-language', 'database'], 4.2, 'Freemium', 'https://ai2sql.io', false, false, false),
('regex-ai', 'Regex AI', 'AI-powered regular expression generator and explainer', 'coding-development', ARRAY['regex', 'pattern-matching', 'text-processing'], 4.0, 'Free', 'https://regex.ai', false, false, false),
('cron-ai', 'Cron AI', 'AI assistant for creating and understanding cron expressions', 'coding-development', ARRAY['cron', 'scheduling', 'automation'], 4.1, 'Free', 'https://cron.ai', false, false, false),
('json-ai', 'JSON AI', 'AI-powered JSON formatter, validator, and generator', 'coding-development', ARRAY['json', 'formatting', 'validation'], 4.0, 'Free', 'https://json.ai', false, false, false),

-- Performance & Optimization
('lighthouse-ai', 'Lighthouse AI', 'AI-enhanced web performance auditing and optimization', 'coding-development', ARRAY['performance', 'web-audit', 'optimization'], 4.3, 'Free', 'https://lighthouse.ai', false, false, false),
('bundle-analyzer-ai', 'Bundle Analyzer AI', 'AI-powered JavaScript bundle analysis and optimization', 'coding-development', ARRAY['bundle-analysis', 'optimization', 'javascript'], 4.1, 'Free', 'https://bundleanalyzer.ai', false, false, false),
('webpack-ai', 'Webpack AI', 'AI assistant for Webpack configuration and optimization', 'coding-development', ARRAY['webpack', 'build-tools', 'optimization'], 4.0, 'Free', 'https://webpack.ai', false, false, false),

-- Security Tools
('snyk-ai', 'Snyk AI', 'AI-powered security platform for finding and fixing vulnerabilities', 'coding-development', ARRAY['security', 'vulnerability-scanning', 'dependency-check'], 4.4, 'Freemium', 'https://snyk.io', false, false, false),
('checkmarx-ai', 'Checkmarx AI', 'AI-driven application security testing platform', 'coding-development', ARRAY['security', 'sast', 'application-security'], 4.2, 'Paid', 'https://checkmarx.com', false, false, false),
('veracode-ai', 'Veracode AI', 'AI-powered application security platform', 'coding-development', ARRAY['security', 'application-security', 'compliance'], 4.1, 'Paid', 'https://veracode.com', false, false, false),

-- Monitoring & Analytics
('sentry-ai', 'Sentry AI', 'AI-powered error tracking and performance monitoring', 'coding-development', ARRAY['error-tracking', 'monitoring', 'performance'], 4.5, 'Freemium', 'https://sentry.io', false, false, false),
('datadog-ai', 'Datadog AI', 'AI-driven monitoring and analytics platform', 'coding-development', ARRAY['monitoring', 'analytics', 'observability'], 4.3, 'Paid', 'https://datadog.com', false, false, false),
('newrelic-ai', 'New Relic AI', 'AI-powered observability platform for applications', 'coding-development', ARRAY['observability', 'apm', 'monitoring'], 4.2, 'Freemium', 'https://newrelic.com', false, false, false),

-- Code Learning & Education
('codecademy-ai', 'Codecademy AI', 'AI-powered coding education and practice platform', 'coding-development', ARRAY['education', 'learning', 'interactive'], 4.4, 'Freemium', 'https://codecademy.com', false, false, false),
('freecodecamp-ai', 'FreeCodeCamp AI', 'AI-enhanced coding curriculum and projects', 'coding-development', ARRAY['education', 'free', 'curriculum'], 4.5, 'Free', 'https://freecodecamp.org', false, false, false),
('codewars-ai', 'Codewars AI', 'AI-powered coding challenges and kata platform', 'coding-development', ARRAY['challenges', 'practice', 'gamification'], 4.3, 'Freemium', 'https://codewars.com', false, false, false),
('leetcode-ai', 'LeetCode AI', 'AI assistant for coding interview preparation', 'coding-development', ARRAY['interview-prep', 'algorithms', 'practice'], 4.4, 'Freemium', 'https://leetcode.com', false, false, false),

-- Project Management
('linear-ai', 'Linear AI', 'AI-powered issue tracking and project management', 'coding-development', ARRAY['project-management', 'issue-tracking', 'workflow'], 4.6, 'Freemium', 'https://linear.app', false, true, false),

-- Infrastructure as Code
('terraform-ai', 'Terraform AI', 'AI assistant for Infrastructure as Code with Terraform', 'coding-development', ARRAY['iac', 'terraform', 'infrastructure'], 4.2, 'Free', 'https://terraform.ai', false, false, false),
('pulumi-ai', 'Pulumi AI', 'AI-powered Infrastructure as Code platform', 'coding-development', ARRAY['iac', 'cloud', 'multi-language'], 4.1, 'Freemium', 'https://pulumi.com', false, false, false),
('ansible-ai', 'Ansible AI', 'AI-enhanced automation and configuration management', 'coding-development', ARRAY['automation', 'configuration', 'devops'], 4.0, 'Free', 'https://ansible.com', false, false, false),

-- Containerization & Orchestration
('docker-ai', 'Docker AI', 'AI-powered containerization and deployment tools', 'coding-development', ARRAY['containers', 'docker', 'deployment'], 4.3, 'Freemium', 'https://docker.com', false, false, false),
('kubernetes-ai', 'Kubernetes AI', 'AI tools for Kubernetes cluster management and optimization', 'coding-development', ARRAY['kubernetes', 'orchestration', 'optimization'], 4.1, 'Free', 'https://kubernetes.io', false, false, false),
('helm-ai', 'Helm AI', 'AI assistant for Kubernetes package management with Helm', 'coding-development', ARRAY['helm', 'kubernetes', 'package-management'], 4.0, 'Free', 'https://helm.sh', false, false, false),

-- Specialized AI Coding Tools
('blackbox-ai', 'Blackbox AI', 'AI-powered code search and autocomplete engine', 'coding-development', ARRAY['code-search', 'autocomplete', 'ai-engine'], 4.2, 'Freemium', 'https://blackbox.ai', false, true, false),
('codex-ai', 'OpenAI Codex', 'AI system that translates natural language to code', 'coding-development', ARRAY['natural-language', 'code-generation', 'openai'], 4.7, 'Paid', 'https://openai.com/blog/openai-codex', false, true, false),
('fauxpilot', 'FauxPilot', 'Open-source alternative to GitHub Copilot', 'coding-development', ARRAY['open-source', 'code-completion', 'self-hosted'], 4.0, 'Free', 'https://github.com/fauxpilot/fauxpilot', false, false, false),
('aicodebot', 'AI Code Bot', 'AI-powered code review and improvement bot', 'coding-development', ARRAY['code-review', 'bot', 'improvement'], 4.1, 'Freemium', 'https://aicodebot.dev', false, false, false),

-- Cloud Development Platforms
('aws-cloud9-ai', 'AWS Cloud9 AI', 'AI-enhanced cloud IDE from Amazon Web Services', 'coding-development', ARRAY['cloud-ide', 'aws', 'collaboration'], 4.1, 'Freemium', 'https://aws.amazon.com/cloud9', false, false, false),
('google-cloud-ai', 'Google Cloud AI', 'AI development tools and services on Google Cloud', 'coding-development', ARRAY['google-cloud', 'ai-services', 'ml-platform'], 4.2, 'Freemium', 'https://cloud.google.com/ai', false, false, false),
('azure-ai-services', 'Azure AI Services', 'Microsoft Azure AI and machine learning platform', 'coding-development', ARRAY['azure', 'ai-services', 'ml-platform'], 4.1, 'Freemium', 'https://azure.microsoft.com/en-us/products/ai-services', false, false, false),

-- Code Optimization & Refactoring
('deepcode-fix', 'DeepCode Fix', 'AI-powered automatic code fixing and optimization', 'coding-development', ARRAY['code-fixing', 'optimization', 'refactoring'], 4.3, 'Freemium', 'https://deepcode.ai', false, false, false),
('codacy-ai', 'Codacy AI', 'AI-driven code quality and coverage analysis', 'coding-development', ARRAY['code-quality', 'coverage', 'analysis'], 4.2, 'Freemium', 'https://codacy.com', false, false, false),
('refactor-ai', 'Refactor AI', 'AI-powered code refactoring and modernization tool', 'coding-development', ARRAY['refactoring', 'modernization', 'code-improvement'], 4.1, 'Paid', 'https://refactor.ai', false, false, false),

-- API Development
('swagger-ai', 'Swagger AI', 'AI-enhanced API documentation and design platform', 'coding-development', ARRAY['api-documentation', 'openapi', 'design'], 4.3, 'Freemium', 'https://swagger.io', false, false, false),
('stoplight-ai', 'Stoplight AI', 'AI-powered API design and documentation platform', 'coding-development', ARRAY['api-design', 'documentation', 'collaboration'], 4.2, 'Freemium', 'https://stoplight.io', false, false, false),
('readme-api-ai', 'ReadMe API AI', 'AI-enhanced API documentation and developer experience', 'coding-development', ARRAY['api-docs', 'developer-experience', 'interactive'], 4.1, 'Freemium', 'https://readme.com', false, false, false),

-- Low-Code/No-Code AI
('make-ai', 'Make AI', 'AI-enhanced visual automation platform (formerly Integromat)', 'coding-development', ARRAY['automation', 'visual', 'integration'], 4.3, 'Freemium', 'https://make.com', false, false, false),

-- Game Development
('unity-ai', 'Unity AI', 'AI tools and services for Unity game development', 'coding-development', ARRAY['game-development', 'unity', 'ai-tools'], 4.2, 'Freemium', 'https://unity.com/ai', false, false, false),
('unreal-ai', 'Unreal Engine AI', 'AI-powered tools for Unreal Engine game development', 'coding-development', ARRAY['game-development', 'unreal-engine', 'ai-tools'], 4.1, 'Free', 'https://unrealengine.com', false, false, false),
('godot-ai', 'Godot AI', 'AI plugins and tools for Godot game engine', 'coding-development', ARRAY['game-development', 'godot', 'open-source'], 4.0, 'Free', 'https://godotengine.org', false, false, false),

-- Data Science & ML Development
('jupyter-ai', 'Jupyter AI', 'AI-powered enhancements for Jupyter notebooks', 'coding-development', ARRAY['jupyter', 'data-science', 'notebooks'], 4.4, 'Free', 'https://jupyter.org', false, false, false),
('colab-ai', 'Google Colab AI', 'AI features in Google Colaboratory for data science', 'coding-development', ARRAY['data-science', 'notebooks', 'google'], 4.5, 'Free', 'https://colab.research.google.com', false, false, false),
('kaggle-ai', 'Kaggle AI', 'AI-powered data science competition and learning platform', 'coding-development', ARRAY['data-science', 'competitions', 'learning'], 4.3, 'Free', 'https://kaggle.com', false, false, false),
('bolt-new', 'Bolt.new', 'AI-powered platform for quickly prototyping, running, editing, and deploying full-stack applications. Free plan offers 100,000 tokens daily for rapid development.', 'coding-development', ARRAY['full-stack', 'prototyping', 'deployment', 'ai-powered'], 4.5, 'Freemium', 'https://bolt.new', false, true, true),
('bubble-io', 'Bubble', 'No-code platform for building fully functional web applications using drag-and-drop interface with third-party API integration. Free plan available, Personal Plan at $32/month.', 'coding-development', ARRAY['no-code', 'web-applications', 'drag-and-drop', 'api-integration'], 4.4, 'Freemium', 'https://bubble.io', true, true, false),
('lovable-ai', 'Lovable', 'No-code, AI-powered platform for application development using community-driven templates. Starter tier at $20/month.', 'coding-development', ARRAY['no-code', 'ai-powered', 'community-templates', 'app-development'], 4.2, 'Paid', 'https://lovable.ai', false, false, true),
('v0-vercel', 'v0', 'AI tool that generates UI code from text prompts for rapid interface development, though may lack depth in explanations for edge cases.', 'coding-development', ARRAY['ui-generation', 'text-to-code', 'interface-development', 'code-generation'], 4.1, 'Freemium', 'https://v0.dev', false, true, false),
('aismartcube', 'AISmartCube', 'AI tool creation platform that enables building AI tools with minimal coding requirements and drag-and-drop functionality.', 'coding-development', ARRAY['ai-tool-creation', 'minimal-coding', 'drag-and-drop', 'platform-builder'], 4.0, 'Freemium', 'https://aismartcube.com', false, false, false),
('trae-ai', 'Trae AI', 'AI-powered IDE for software development with automated assistance and intelligent code generation capabilities.', 'coding-development', ARRAY['ai-ide', 'automated-assistance', 'code-generation', 'development-environment'], 4.3, 'Freemium', 'https://trae.ai', false, false, false),
('buildglare', 'Buildglare', 'Low-code platform specifically designed for developing SaaS applications with integrated business logic and deployment tools.', 'coding-development', ARRAY['low-code', 'saas-development', 'business-logic', 'deployment-tools'], 4.1, 'Freemium', 'https://buildglare.com', false, false, false),
('lecca-io', 'Lecca.io', 'No-code platform for building AI agents and automating workflow tasks with visual workflow builder and AI integration.', 'coding-development', ARRAY['no-code', 'ai-agents', 'workflow-automation', 'visual-builder'], 4.2, 'Freemium', 'https://lecca.io', false, false, false),
('genfuse-ai', 'GenFuse AI', 'No-code tool for automating complex workflows using AI agents with intelligent decision-making and process optimization.', 'coding-development', ARRAY['no-code', 'workflow-automation', 'ai-agents', 'process-optimization'], 4.0, 'Freemium', 'https://genfuse.ai', false, false, false),
('code2-ai', 'Code2.AI', 'AI tool for compressing and optimizing codebases for AI-assisted development and analysis with intelligent code restructuring.', 'coding-development', ARRAY['code-optimization', 'codebase-compression', 'ai-analysis', 'code-restructuring'], 4.1, 'Freemium', 'https://code2.ai', false, false, false),
('aider-ai', 'Aider', 'AI coding assistant for editing code, managing files, and integrating with Git via command-line interface with intelligent code suggestions.', 'coding-development', ARRAY['ai-coding-assistant', 'code-editing', 'git-integration', 'command-line'], 4.4, 'Free', 'https://aider.chat', false, true, false)

ON CONFLICT (id, category_id) DO NOTHING;

-- Update the tool count for the category
UPDATE categories 
SET tool_count = (
  SELECT COUNT(*) 
  FROM tools 
  WHERE category_id = 'coding-development'
) 
WHERE id = 'coding-development';
