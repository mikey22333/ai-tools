# Database Migration Setup Guide

## ✅ Your Supabase Project
- **Project URL**: `https://rtqgxxrdpvetsjeobpxj.supabase.co`
- **Status**: Project created ✅
- **Next Steps**: Get API keys and set up database schema

## Step 1: Get Your API Keys

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/rtqgxxrdpvetsjeobpxj
2. Click on **Settings** in the left sidebar
3. Click on **API** in the settings menu
4. You'll find two important keys:
   - **anon public key** (safe for frontend)
   - **service_role secret key** (keep private, for admin operations)

## Step 2: Update Environment Variables

Update your `.env.local` file with the actual keys:

```env
# Your project URL (already set)
NEXT_PUBLIC_SUPABASE_URL=https://rtqgxxrdpvetsjeobpxj.supabase.co

# Get this from Settings > API (anon public key)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Get this from Settings > API (service_role secret key)
SUPABASE_SERVICE_KEY=your_service_key_here
```

## Step 3: Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the contents of `database/schema.sql`
4. Click **Run** to create the tables

## Step 4: Seed Categories (Optional)

1. In SQL Editor, create another new query
2. Copy and paste the contents of `database/seed-categories.sql`
3. Click **Run** to populate categories

## Step 5: Migrate Your Data

Once your environment variables are set:

```bash
npm run migrate
```

This will populate your database with all the tools from your static files.

## Step 6: Update Components

Replace static imports with API calls:

### Before:
```typescript
import { aiTools, featuredTools } from '@/data/tools'
```

### After:
```typescript
import { toolsService } from '@/services/toolsService'

// In component:
const [tools, setTools] = useState([])

useEffect(() => {
  async function fetchTools() {
    const toolsData = await toolsService.getTools()
    setTools(toolsData)
  }
  fetchTools()
}, [])
```

## Step 7: Test and Deploy

1. Test locally with the database
2. Deploy to Vercel/Netlify
3. Verify all functionality works
4. Remove old static data files

## Benefits After Migration

✅ **Scalability**: Handle thousands of tools  
✅ **Real-time updates**: No redeployment needed  
✅ **Better performance**: Caching and pagination  
✅ **Content management**: Easy admin interface  
✅ **Analytics**: Track tool usage and popularity  
✅ **Search**: Built-in full-text search capabilities  

## File Structure After Migration

```
/data/
  ├── tools-backup.ts (backup)
  └── (static files can be removed)

/database/
  ├── schema.sql
  └── seed-categories.sql

/lib/
  └── supabase.ts

/services/
  └── toolsService.ts

/scripts/
  └── migrate-to-database.ts
```
