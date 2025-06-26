import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const codingTools = [
  // AI Code Generation & Assistance
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that suggests code and entire functions in real-time',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Generation', 'IDE Plugin'],
    rating: 4.8,
    pricing: 'Paid',
    url: 'https://github.com/features/copilot',
    logo_url: 'https://github.com/favicon.ico'
  },
  {
    id: 'openai-codex',
    name: 'OpenAI Codex',
    description: 'AI system that translates natural language to code',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Generation', 'Natural Language'],
    rating: 4.7,
    pricing: 'Paid',
    url: 'https://openai.com/blog/openai-codex/',
    logo_url: 'https://openai.com/favicon.ico'
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: 'AI code completion tool that predicts and suggests your next lines of code',
    category_id: 'coding-development',
    tags: ['Code Completion', 'AI Assistant', 'IDE Plugin'],
    rating: 4.6,
    pricing: 'Freemium',
    url: 'https://tabnine.com',
    logo_url: 'https://tabnine.com/favicon.ico'
  },
  {
    id: 'codewhisperer',
    name: 'Amazon CodeWhisperer',
    description: 'AI coding companion that generates whole line and full function code suggestions',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Generation', 'Amazon'],
    rating: 4.5,
    pricing: 'Freemium',
    url: 'https://aws.amazon.com/codewhisperer/',
    logo_url: 'https://aws.amazon.com/favicon.ico'
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: 'Free AI-powered code acceleration toolkit',
    category_id: 'coding-development',
    tags: ['Code Completion', 'AI Assistant', 'Free'],
    rating: 4.4,
    pricing: 'Free',
    url: 'https://codeium.com',
    logo_url: 'https://codeium.com/favicon.ico'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor built for pair programming with AI',
    category_id: 'coding-development',
    tags: ['Code Editor', 'AI Assistant', 'IDE'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://cursor.sh',
    logo_url: 'https://cursor.sh/favicon.ico'
  },
  {
    id: 'replit-ghostwriter',
    name: 'Replit Ghostwriter',
    description: 'AI assistant that helps you write better code faster',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Generation', 'Cloud IDE'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://replit.com/site/ghostwriter',
    logo_url: 'https://replit.com/favicon.ico'
  },
  {
    id: 'sourcegraph-cody',
    name: 'Sourcegraph Cody',
    description: 'AI coding assistant that knows your entire codebase',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Search', 'Enterprise'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://sourcegraph.com/cody',
    logo_url: 'https://sourcegraph.com/favicon.ico'
  },
  {
    id: 'fig-ai',
    name: 'Fig AI',
    description: 'AI-powered terminal that provides intelligent autocomplete',
    category_id: 'coding-development',
    tags: ['Terminal', 'AI Assistant', 'Autocomplete'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://fig.io',
    logo_url: 'https://fig.io/favicon.ico'
  },
  {
    id: 'warp-ai',
    name: 'Warp AI',
    description: 'Terminal with AI-powered command suggestions and explanations',
    category_id: 'coding-development',
    tags: ['Terminal', 'AI Assistant', 'Command Line'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://warp.dev',
    logo_url: 'https://warp.dev/favicon.ico'
  },

  // Code Review & Quality
  {
    id: 'deepcode',
    name: 'DeepCode',
    description: 'AI-powered code review tool that finds bugs and security vulnerabilities',
    category_id: 'coding-development',
    tags: ['Code Review', 'Security', 'Bug Detection'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://deepcode.ai',
    logo_url: 'https://deepcode.ai/favicon.ico'
  },
  {
    id: 'codeclimate',
    name: 'Code Climate',
    description: 'Automated code review for test coverage and maintainability',
    category_id: 'coding-development',
    tags: ['Code Quality', 'Testing', 'CI/CD'],
    rating: 4.1,
    pricing: 'Paid',
    url: 'https://codeclimate.com',
    logo_url: 'https://codeclimate.com/favicon.ico'
  },
  {
    id: 'sonarcloud',
    name: 'SonarCloud',
    description: 'Cloud-based code quality and security service',
    category_id: 'coding-development',
    tags: ['Code Quality', 'Security', 'CI/CD'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://sonarcloud.io',
    logo_url: 'https://sonarcloud.io/favicon.ico'
  },
  {
    id: 'reviewboard',
    name: 'Review Board',
    description: 'Web-based collaborative code review tool',
    category_id: 'coding-development',
    tags: ['Code Review', 'Collaboration', 'Team'],
    rating: 3.9,
    pricing: 'Free',
    url: 'https://reviewboard.org',
    logo_url: 'https://reviewboard.org/favicon.ico'
  },
  {
    id: 'pullrequest',
    name: 'PullRequest',
    description: 'On-demand code review as a service',
    category_id: 'coding-development',
    tags: ['Code Review', 'Service', 'Expert Review'],
    rating: 4.0,
    pricing: 'Paid',
    url: 'https://pullrequest.com',
    logo_url: 'https://pullrequest.com/favicon.ico'
  },

  // Documentation & Code Understanding
  {
    id: 'mintlify',
    name: 'Mintlify',
    description: 'AI-powered documentation generator from code comments',
    category_id: 'coding-development',
    tags: ['Documentation', 'AI Generation', 'Comments'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://mintlify.com',
    logo_url: 'https://mintlify.com/favicon.ico'
  },
  {
    id: 'stepsize',
    name: 'Stepsize',
    description: 'AI-powered technical debt tracking and documentation',
    category_id: 'coding-development',
    tags: ['Documentation', 'Technical Debt', 'Team'],
    rating: 3.8,
    pricing: 'Paid',
    url: 'https://stepsize.com',
    logo_url: 'https://stepsize.com/favicon.ico'
  },
  {
    id: 'swimm',
    name: 'Swimm',
    description: 'AI-powered code documentation that stays up to date',
    category_id: 'coding-development',
    tags: ['Documentation', 'Code Understanding', 'Team'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://swimm.io',
    logo_url: 'https://swimm.io/favicon.ico'
  },
  {
    id: 'gitbook',
    name: 'GitBook',
    description: 'Modern documentation platform for technical teams',
    category_id: 'coding-development',
    tags: ['Documentation', 'Collaboration', 'Publishing'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://gitbook.com',
    logo_url: 'https://gitbook.com/favicon.ico'
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management',
    category_id: 'coding-development',
    tags: ['Documentation', 'Collaboration', 'Project Management'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://notion.so',
    logo_url: 'https://notion.so/favicon.ico'
  },

  // Testing & Debugging
  {
    id: 'testim',
    name: 'Testim',
    description: 'AI-powered test automation platform',
    category_id: 'coding-development',
    tags: ['Testing', 'Automation', 'AI'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://testim.io',
    logo_url: 'https://testim.io/favicon.ico'
  },
  {
    id: 'mabl',
    name: 'mabl',
    description: 'Intelligent test automation with machine learning',
    category_id: 'coding-development',
    tags: ['Testing', 'ML', 'Automation'],
    rating: 4.1,
    pricing: 'Paid',
    url: 'https://mabl.com',
    logo_url: 'https://mabl.com/favicon.ico'
  },
  {
    id: 'bugsnag',
    name: 'Bugsnag',
    description: 'Error monitoring and crash reporting for applications',
    category_id: 'coding-development',
    tags: ['Error Monitoring', 'Debugging', 'APM'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://bugsnag.com',
    logo_url: 'https://bugsnag.com/favicon.ico'
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Application monitoring platform for error tracking',
    category_id: 'coding-development',
    tags: ['Error Monitoring', 'Performance', 'Debugging'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://sentry.io',
    logo_url: 'https://sentry.io/favicon.ico'
  },
  {
    id: 'rollbar',
    name: 'Rollbar',
    description: 'Real-time error tracking and debugging for developers',
    category_id: 'coding-development',
    tags: ['Error Tracking', 'Debugging', 'Real-time'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://rollbar.com',
    logo_url: 'https://rollbar.com/favicon.ico'
  },

  // Development Environment & Tools
  {
    id: 'codespaces',
    name: 'GitHub Codespaces',
    description: 'Instant cloud development environments',
    category_id: 'coding-development',
    tags: ['Cloud IDE', 'Development Environment', 'GitHub'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://github.com/features/codespaces',
    logo_url: 'https://github.com/favicon.ico'
  },
  {
    id: 'gitpod',
    name: 'Gitpod',
    description: 'Automated cloud development environments',
    category_id: 'coding-development',
    tags: ['Cloud IDE', 'Development Environment', 'Automation'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://gitpod.io',
    logo_url: 'https://gitpod.io/favicon.ico'
  },
  {
    id: 'codesandbox',
    name: 'CodeSandbox',
    description: 'Online code editor and prototyping tool',
    category_id: 'coding-development',
    tags: ['Online IDE', 'Prototyping', 'Collaboration'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://codesandbox.io',
    logo_url: 'https://codesandbox.io/favicon.ico'
  },
  {
    id: 'stackblitz',
    name: 'StackBlitz',
    description: 'Instant full-stack web development in the browser',
    category_id: 'coding-development',
    tags: ['Online IDE', 'Web Development', 'Full-stack'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://stackblitz.com',
    logo_url: 'https://stackblitz.com/favicon.ico'
  },
  {
    id: 'codepen',
    name: 'CodePen',
    description: 'Social development environment for front-end designers and developers',
    category_id: 'coding-development',
    tags: ['Online IDE', 'Frontend', 'Social'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://codepen.io',
    logo_url: 'https://codepen.io/favicon.ico'
  },

  // API Development & Testing
  {
    id: 'postman',
    name: 'Postman',
    description: 'API development and testing platform',
    category_id: 'coding-development',
    tags: ['API', 'Testing', 'Development'],
    rating: 4.5,
    pricing: 'Freemium',
    url: 'https://postman.com',
    logo_url: 'https://postman.com/favicon.ico'
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    description: 'REST and GraphQL API client',
    category_id: 'coding-development',
    tags: ['API', 'REST', 'GraphQL'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://insomnia.rest',
    logo_url: 'https://insomnia.rest/favicon.ico'
  },
  {
    id: 'hoppscotch',
    name: 'Hoppscotch',
    description: 'Open source API development ecosystem',
    category_id: 'coding-development',
    tags: ['API', 'Open Source', 'Testing'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://hoppscotch.io',
    logo_url: 'https://hoppscotch.io/favicon.ico'
  },
  {
    id: 'swagger',
    name: 'Swagger',
    description: 'API documentation and design tools',
    category_id: 'coding-development',
    tags: ['API', 'Documentation', 'Design'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://swagger.io',
    logo_url: 'https://swagger.io/favicon.ico'
  },
  {
    id: 'stoplight',
    name: 'Stoplight',
    description: 'API design, documentation, and testing platform',
    category_id: 'coding-development',
    tags: ['API', 'Design', 'Documentation'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://stoplight.io',
    logo_url: 'https://stoplight.io/favicon.ico'
  },

  // Database Tools
  {
    id: 'planetscale',
    name: 'PlanetScale',
    description: 'Serverless MySQL platform with branching',
    category_id: 'coding-development',
    tags: ['Database', 'MySQL', 'Serverless'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://planetscale.com',
    logo_url: 'https://planetscale.com/favicon.ico'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Open source Firebase alternative with PostgreSQL',
    category_id: 'coding-development',
    tags: ['Database', 'PostgreSQL', 'Backend'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://supabase.com',
    logo_url: 'https://supabase.com/favicon.ico'
  },
  {
    id: 'railway',
    name: 'Railway',
    description: 'Deploy code from Git repos with zero configuration',
    category_id: 'coding-development',
    tags: ['Deployment', 'Database', 'Infrastructure'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://railway.app',
    logo_url: 'https://railway.app/favicon.ico'
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Serverless PostgreSQL for modern applications',
    category_id: 'coding-development',
    tags: ['Database', 'PostgreSQL', 'Serverless'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://neon.tech',
    logo_url: 'https://neon.tech/favicon.ico'
  },
  {
    id: 'cockroachdb',
    name: 'CockroachDB',
    description: 'Distributed SQL database for cloud applications',
    category_id: 'coding-development',
    tags: ['Database', 'Distributed', 'SQL'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://cockroachlabs.com',
    logo_url: 'https://cockroachlabs.com/favicon.ico'
  },

  // DevOps & CI/CD
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Platform for frontend frameworks and static sites',
    category_id: 'coding-development',
    tags: ['Deployment', 'Frontend', 'Jamstack'],
    rating: 4.5,
    pricing: 'Freemium',
    url: 'https://vercel.com',
    logo_url: 'https://vercel.com/favicon.ico'
  },
  {
    id: 'netlify',
    name: 'Netlify',
    description: 'Platform for web projects with continuous deployment',
    category_id: 'coding-development',
    tags: ['Deployment', 'CI/CD', 'JAMstack'],
    rating: 4.4,
    pricing: 'Freemium',
    url: 'https://netlify.com',
    logo_url: 'https://netlify.com/favicon.ico'
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    description: 'Automate workflows with CI/CD platform',
    category_id: 'coding-development',
    tags: ['CI/CD', 'Automation', 'GitHub'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://github.com/features/actions',
    logo_url: 'https://github.com/favicon.ico'
  },
  {
    id: 'circleci',
    name: 'CircleCI',
    description: 'Continuous integration and delivery platform',
    category_id: 'coding-development',
    tags: ['CI/CD', 'Automation', 'Testing'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://circleci.com',
    logo_url: 'https://circleci.com/favicon.ico'
  },
  {
    id: 'travis-ci',
    name: 'Travis CI',
    description: 'Continuous integration service for GitHub projects',
    category_id: 'coding-development',
    tags: ['CI/CD', 'GitHub', 'Testing'],
    rating: 3.9,
    pricing: 'Freemium',
    url: 'https://travis-ci.org',
    logo_url: 'https://travis-ci.org/favicon.ico'
  },

  // Monitoring & Analytics
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Monitoring and analytics platform for developers',
    category_id: 'coding-development',
    tags: ['Monitoring', 'Analytics', 'APM'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://datadoghq.com',
    logo_url: 'https://datadoghq.com/favicon.ico'
  },
  {
    id: 'newrelic',
    name: 'New Relic',
    description: 'Application performance monitoring and observability',
    category_id: 'coding-development',
    tags: ['APM', 'Monitoring', 'Observability'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://newrelic.com',
    logo_url: 'https://newrelic.com/favicon.ico'
  },
  {
    id: 'honeycomb',
    name: 'Honeycomb',
    description: 'Observability platform for debugging production systems',
    category_id: 'coding-development',
    tags: ['Observability', 'Debugging', 'Performance'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://honeycomb.io',
    logo_url: 'https://honeycomb.io/favicon.ico'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Open source analytics and monitoring solution',
    category_id: 'coding-development',
    tags: ['Analytics', 'Monitoring', 'Open Source'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://grafana.com',
    logo_url: 'https://grafana.com/favicon.ico'
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    description: 'Open-source monitoring system with time series database',
    category_id: 'coding-development',
    tags: ['Monitoring', 'Time Series', 'Open Source'],
    rating: 4.2,
    pricing: 'Free',
    url: 'https://prometheus.io',
    logo_url: 'https://prometheus.io/favicon.ico'
  },

  // Version Control & Collaboration
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'DevOps platform with Git repository management',
    category_id: 'coding-development',
    tags: ['Git', 'DevOps', 'CI/CD'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://gitlab.com',
    logo_url: 'https://gitlab.com/favicon.ico'
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Git repository management with integrated CI/CD',
    category_id: 'coding-development',
    tags: ['Git', 'Repository', 'Atlassian'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://bitbucket.org',
    logo_url: 'https://bitbucket.org/favicon.ico'
  },
  {
    id: 'sourcetree',
    name: 'Sourcetree',
    description: 'Free Git client for Windows and Mac',
    category_id: 'coding-development',
    tags: ['Git', 'Client', 'GUI'],
    rating: 3.8,
    pricing: 'Free',
    url: 'https://sourcetreeapp.com',
    logo_url: 'https://sourcetreeapp.com/favicon.ico'
  },
  {
    id: 'gitkraken',
    name: 'GitKraken',
    description: 'Cross-platform Git client with built-in merge tool',
    category_id: 'coding-development',
    tags: ['Git', 'Client', 'Cross-platform'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://gitkraken.com',
    logo_url: 'https://gitkraken.com/favicon.ico'
  },
  {
    id: 'tower',
    name: 'Tower',
    description: 'Powerful Git client for Mac and Windows',
    category_id: 'coding-development',
    tags: ['Git', 'Client', 'Premium'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://git-tower.com',
    logo_url: 'https://git-tower.com/favicon.ico'
  },

  // Package Management & Dependencies
  {
    id: 'renovate',
    name: 'Renovate',
    description: 'Automated dependency updates for your repositories',
    category_id: 'coding-development',
    tags: ['Dependencies', 'Automation', 'Security'],
    rating: 4.1,
    pricing: 'Free',
    url: 'https://renovatebot.com',
    logo_url: 'https://renovatebot.com/favicon.ico'
  },
  {
    id: 'dependabot',
    name: 'Dependabot',
    description: 'Automated dependency updates and security alerts',
    category_id: 'coding-development',
    tags: ['Dependencies', 'Security', 'GitHub'],
    rating: 4.0,
    pricing: 'Free',
    url: 'https://dependabot.com',
    logo_url: 'https://dependabot.com/favicon.ico'
  },
  {
    id: 'snyk',
    name: 'Snyk',
    description: 'Find and fix vulnerabilities in dependencies',
    category_id: 'coding-development',
    tags: ['Security', 'Dependencies', 'Vulnerability'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://snyk.io',
    logo_url: 'https://snyk.io/favicon.ico'
  },
  {
    id: 'whitesource',
    name: 'WhiteSource',
    description: 'Open source security and license compliance management',
    category_id: 'coding-development',
    tags: ['Security', 'License', 'Compliance'],
    rating: 3.9,
    pricing: 'Paid',
    url: 'https://whitesourcesoftware.com',
    logo_url: 'https://whitesourcesoftware.com/favicon.ico'
  },
  {
    id: 'bundlephobia',
    name: 'BundlePhobia',
    description: 'Find the cost of adding an npm package to your bundle',
    category_id: 'coding-development',
    tags: ['NPM', 'Bundle Size', 'Performance'],
    rating: 4.3,
    pricing: 'Free',
    url: 'https://bundlephobia.com',
    logo_url: 'https://bundlephobia.com/favicon.ico'
  },

  // AI-Powered Development Tools
  {
    id: 'blackbox',
    name: 'Blackbox AI',
    description: 'AI code search and code generation platform',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Search', 'Code Generation'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://blackbox.ai',
    logo_url: 'https://blackbox.ai/favicon.ico'
  },
  {
    id: 'aicommits',
    name: 'AI Commits',
    description: 'AI-powered git commit message generator',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Git', 'Commit Messages'],
    rating: 3.9,
    pricing: 'Free',
    url: 'https://aicommits.app',
    logo_url: 'https://aicommits.app/favicon.ico'
  },
  {
    id: 'whatthediff',
    name: 'What The Diff',
    description: 'AI-powered code review assistant for GitHub',
    category_id: 'coding-development',
    tags: ['AI Assistant', 'Code Review', 'GitHub'],
    rating: 3.8,
    pricing: 'Freemium',
    url: 'https://whatthediff.ai',
    logo_url: 'https://whatthediff.ai/favicon.ico'
  },
  {
    id: 'codiga',
    name: 'Codiga',
    description: 'Real-time static code analysis with AI-powered fixes',
    category_id: 'coding-development',
    tags: ['Code Analysis', 'AI', 'Static Analysis'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://codiga.io',
    logo_url: 'https://codiga.io/favicon.ico'
  },
  {
    id: 'codestream',
    name: 'CodeStream',
    description: 'Developer collaboration platform with code discussions',
    category_id: 'coding-development',
    tags: ['Collaboration', 'Code Review', 'Team'],
    rating: 3.7,
    pricing: 'Freemium',
    url: 'https://codestream.com',
    logo_url: 'https://codestream.com/favicon.ico'
  },

  // Learning & Documentation
  {
    id: 'codewars',
    name: 'Codewars',
    description: 'Coding challenges and practice platform',
    category_id: 'coding-development',
    tags: ['Learning', 'Challenges', 'Practice'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://codewars.com',
    logo_url: 'https://codewars.com/favicon.ico'
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    description: 'Platform for preparing technical coding interviews',
    category_id: 'coding-development',
    tags: ['Learning', 'Interview Prep', 'Algorithms'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://leetcode.com',
    logo_url: 'https://leetcode.com/favicon.ico'
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    description: 'Programming challenges and technical interview preparation',
    category_id: 'coding-development',
    tags: ['Learning', 'Challenges', 'Interview'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://hackerrank.com',
    logo_url: 'https://hackerrank.com/favicon.ico'
  },
  {
    id: 'devdocs',
    name: 'DevDocs',
    description: 'Unified documentation browser for developers',
    category_id: 'coding-development',
    tags: ['Documentation', 'Reference', 'Browser'],
    rating: 4.4,
    pricing: 'Free',
    url: 'https://devdocs.io',
    logo_url: 'https://devdocs.io/favicon.ico'
  },
  {
    id: 'dash',
    name: 'Dash',
    description: 'API documentation browser and code snippet manager',
    category_id: 'coding-development',
    tags: ['Documentation', 'API Reference', 'Snippets'],
    rating: 4.2,
    pricing: 'Paid',
    url: 'https://kapeli.com/dash',
    logo_url: 'https://kapeli.com/favicon.ico'
  },

  // Project Management & Planning
  {
    id: 'linear',
    name: 'Linear',
    description: 'Issue tracking and project management for software teams',
    category_id: 'coding-development',
    tags: ['Project Management', 'Issue Tracking', 'Team'],
    rating: 4.6,
    pricing: 'Freemium',
    url: 'https://linear.app',
    logo_url: 'https://linear.app/favicon.ico'
  },
  {
    id: 'height',
    name: 'Height',
    description: 'Autonomous project management tool with AI features',
    category_id: 'coding-development',
    tags: ['Project Management', 'AI', 'Automation'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://height.app',
    logo_url: 'https://height.app/favicon.ico'
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    description: 'All-in-one workspace for teams',
    category_id: 'coding-development',
    tags: ['Project Management', 'Productivity', 'Team'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://clickup.com',
    logo_url: 'https://clickup.com/favicon.ico'
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Team collaboration and project management platform',
    category_id: 'coding-development',
    tags: ['Project Management', 'Collaboration', 'Team'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://asana.com',
    logo_url: 'https://asana.com/favicon.ico'
  },
  {
    id: 'monday',
    name: 'Monday.com',
    description: 'Work operating system for teams',
    category_id: 'coding-development',
    tags: ['Project Management', 'Workflow', 'Team'],
    rating: 4.0,
    pricing: 'Paid',
    url: 'https://monday.com',
    logo_url: 'https://monday.com/favicon.ico'
  },

  // Infrastructure & Cloud
  {
    id: 'fly-io',
    name: 'Fly.io',
    description: 'Deploy applications close to users worldwide',
    category_id: 'coding-development',
    tags: ['Deployment', 'Edge Computing', 'Global'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://fly.io',
    logo_url: 'https://fly.io/favicon.ico'
  },
  {
    id: 'render',
    name: 'Render',
    description: 'Cloud platform for static sites, web services, and databases',
    category_id: 'coding-development',
    tags: ['Cloud Platform', 'Deployment', 'Hosting'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://render.com',
    logo_url: 'https://render.com/favicon.ico'
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    description: 'Cloud infrastructure for developers',
    category_id: 'coding-development',
    tags: ['Cloud', 'Infrastructure', 'VPS'],
    rating: 4.3,
    pricing: 'Paid',
    url: 'https://digitalocean.com',
    logo_url: 'https://digitalocean.com/favicon.ico'
  },
  {
    id: 'linode',
    name: 'Linode',
    description: 'Cloud computing and hosting platform',
    category_id: 'coding-development',
    tags: ['Cloud', 'Hosting', 'VPS'],
    rating: 4.1,
    pricing: 'Paid',
    url: 'https://linode.com',
    logo_url: 'https://linode.com/favicon.ico'
  },
  {
    id: 'vultr',
    name: 'Vultr',
    description: 'High-performance cloud compute platform',
    category_id: 'coding-development',
    tags: ['Cloud', 'Compute', 'VPS'],
    rating: 4.0,
    pricing: 'Paid',
    url: 'https://vultr.com',
    logo_url: 'https://vultr.com/favicon.ico'
  },

  // Security & Authentication
  {
    id: 'auth0',
    name: 'Auth0',
    description: 'Identity platform for developers',
    category_id: 'coding-development',
    tags: ['Authentication', 'Identity', 'Security'],
    rating: 4.3,
    pricing: 'Freemium',
    url: 'https://auth0.com',
    logo_url: 'https://auth0.com/favicon.ico'
  },
  {
    id: 'firebase-auth',
    name: 'Firebase Authentication',
    description: 'User authentication service by Google',
    category_id: 'coding-development',
    tags: ['Authentication', 'Firebase', 'Google'],
    rating: 4.2,
    pricing: 'Freemium',
    url: 'https://firebase.google.com/products/auth',
    logo_url: 'https://firebase.google.com/favicon.ico'
  },
  {
    id: 'clerk',
    name: 'Clerk',
    description: 'Complete user management platform',
    category_id: 'coding-development',
    tags: ['Authentication', 'User Management', 'React'],
    rating: 4.1,
    pricing: 'Freemium',
    url: 'https://clerk.dev',
    logo_url: 'https://clerk.dev/favicon.ico'
  },
  {
    id: 'magic',
    name: 'Magic',
    description: 'Passwordless authentication for developers',
    category_id: 'coding-development',
    tags: ['Authentication', 'Passwordless', 'SDK'],
    rating: 4.0,
    pricing: 'Freemium',
    url: 'https://magic.link',
    logo_url: 'https://magic.link/favicon.ico'
  }
];

async function addCodingTools() {
  console.log('Adding coding & development tools to database...');
  
  let successCount = 0;
  let errorCount = 0;
  for (const tool of codingTools) {
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
  console.log(`✅ Successfully added: ${successCount} tools`);
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

addCodingTools();
