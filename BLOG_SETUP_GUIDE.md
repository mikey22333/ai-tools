# Blog System Quick Setup Guide

## Current Status
Your blog system code is complete and ready, but the database table needs to be created.

## Required Steps

### 1. Create the Posts Table in Supabase

1. **Open Supabase Dashboard:**
   - Go to https://supabase.com/dashboard
   - Open your project: `rtqgxxrdpvetsjeobpxj`

2. **Access SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the SQL Script:**
   - Open the file: `database/create-posts-table.sql`
   - Copy all contents (the entire file)
   - Paste into the Supabase SQL Editor
   - Click "Run" to execute

### 2. Verify Setup

Run the test script to verify everything is working:

```powershell
# Make sure your dev server is running first
npm run dev

# In a new terminal, run the test script
.\test-blog-setup.ps1
```

### 3. Access Your Blog System

Once setup is complete, you can access:

- **Public Blog:** http://localhost:3000/blog
- **Admin Panel:** http://localhost:3000/admin/blog
- **API Endpoints:** http://localhost:3000/api/posts

## Troubleshooting

### If you get "Failed to fetch blog posts":
- The `posts` table hasn't been created yet
- Run the SQL script in Supabase SQL Editor

### If you get authentication errors:
- Make sure JWT_SECRET is set in `.env.local`
- Access admin panel directly at: http://localhost:3000/admin/blog

### If API calls fail:
- Verify SUPABASE_SERVICE_ROLE_KEY is correct in `.env.local`
- Check that RLS policies are properly set on the posts table

## Features Ready to Use

✅ **Blog Homepage** - Lists all published posts with SEO
✅ **Individual Post Pages** - Dynamic routing with ISR  
✅ **Admin CRUD** - Create, edit, delete posts with rich text editor
✅ **Real-time Updates** - Changes reflect immediately on public site
✅ **SEO Optimization** - Meta tags, Open Graph, Twitter Cards
✅ **Responsive Design** - Mobile-first Tailwind CSS
✅ **Security** - RLS policies and service role authentication

## Admin Usage

1. Go to http://localhost:3000/admin/blog
2. Click "Create New Post" to add content
3. Use the rich text editor for formatting
4. Toggle "Published" to make posts live
5. Changes appear instantly on the public blog

Your blog system is production-ready once the database table is created!
