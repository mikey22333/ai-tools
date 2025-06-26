# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details:
   - **Name**: AI Tools Directory
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Wait for the project to be created (usually takes 1-2 minutes)

## Step 2: Get Your Project Credentials

1. Go to your project dashboard
2. Click on **Settings** in the sidebar
3. Click on **API** in the settings menu
4. You'll see:
   - **Project URL** (starts with `https://`)
   - **Project API keys**:
     - `anon` key (public key)
     - `service_role` key (secret key - keep this private!)

## Step 3: Update Environment Variables

Update your `.env.local` file with the actual values:

```env
# Replace these with your actual Supabase project values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

## Step 4: Set Up Database Schema

1. In your Supabase project dashboard, click on **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `database/schema.sql`
4. Click **Run** to create the tables

## Step 5: Seed Categories (Optional)

If you want to pre-populate categories:
1. In SQL Editor, create another new query
2. Copy and paste the contents of `database/seed-categories.sql`
3. Click **Run**

## Step 6: Run Migration Script

Once your environment variables are set up:

```bash
npm run migrate
```

This will populate your database with all the tools from your static files.

## Step 7: Update Frontend Components

Once migration is complete, update your components to use the new service layer:

```typescript
// Instead of importing from static files
import { aiTools } from '@/data/tools'

// Use the service layer
import { toolsService } from '@/services/toolsService'
const tools = await toolsService.getAllTools()
```

## Verification

After setup, you can verify everything is working by:
1. Checking your Supabase dashboard to see the data
2. Running the development server: `npm run dev`
3. Visiting your app to ensure it loads correctly

## Security Notes

- Never commit your `.env.local` file to version control
- The `service_role` key has admin privileges - keep it secret
- The `anon` key is safe to use in frontend code
- Consider setting up Row Level Security (RLS) policies for production

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Check that your `.env.local` file exists and has the correct variable names
- Restart your development server after adding environment variables

**Migration script fails**
- Ensure your service key is correct
- Check that the database schema has been created
- Verify network connectivity to Supabase
