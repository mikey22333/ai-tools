# 🚀 AllAiTools - Render.com Deployment Guide

## Quick Deploy to Render

### Step 1: Prepare Your Repository
Ensure your code is pushed to GitHub with all the latest changes.

### Step 2: Create Render Service

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign up/Login with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `allaitools` repository

3. **Configure Service Settings**
   ```
   Name: allaitools (or your preferred name)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

### Step 3: Environment Variables

Add these environment variables in Render dashboard:

```bash
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://allaitools.dev
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
JWT_SECRET=your-secure-random-string-32-chars-minimum
```

**To generate a secure JWT_SECRET:**
```bash
# Use this command to generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your app
3. Monitor the build logs for any errors
4. Your app will be available at `https://your-app-name.onrender.com`

### Step 5: Custom Domain (Optional)

1. In your service settings, go to "Custom Domains"
2. Add your domain (e.g., `allaitools.com`)
3. Configure DNS records as shown in Render
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## Render-Specific Optimizations

### Auto-Deploy
- Render automatically deploys when you push to your main branch
- Disable this in Settings if you want manual deploys

### Health Checks
- Render will check `/api/stats` endpoint to ensure your app is healthy
- This endpoint returns tool/category counts and confirms DB connection

### Scaling
- Start with the free tier for testing
- Upgrade to Starter ($7/month) or Standard ($25/month) for production
- Enable auto-scaling if needed

### Performance
- Render provides CDN automatically
- Static assets are cached appropriately
- Consider upgrading to faster instances for better performance

## Environment Variables Checklist

Required for basic functionality:
- ✅ `NODE_ENV=production`
- ✅ `NEXT_PUBLIC_BASE_URL` (your Render URL)
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `JWT_SECRET`

Optional for enhanced features:
- `NEXT_PUBLIC_GA_ID` (Google Analytics)
- `SMTP_*` variables (for email notifications)

## Troubleshooting

### Build Fails
1. Check build logs in Render dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### App Won't Start
1. Check if `npm start` works locally
2. Verify environment variables are set
3. Check application logs in Render

### Database Connection Issues
1. Verify Supabase credentials
2. Check if Supabase allows connections from Render IPs
3. Test connection with `curl https://your-app.onrender.com/api/stats`

### Performance Issues
1. Monitor in Render dashboard
2. Consider upgrading to a higher plan
3. Optimize images and database queries

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify tool search and filtering works
- [ ] Test admin login functionality
- [ ] Check tool submission form
- [ ] Verify contact form (if implemented)
- [ ] Test API endpoints
- [ ] Check performance with PageSpeed Insights
- [ ] Submit sitemap to Google Search Console

## Support

If you encounter issues:
- Check Render's documentation: https://render.com/docs
- Review build/application logs in Render dashboard
- Contact: riyassajeed233@gmail.com

---

**Estimated Deploy Time**: 5-10 minutes
**Cost**: Free tier available, $7/month for production
