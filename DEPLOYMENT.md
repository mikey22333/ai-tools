# AllAiTools - Deployment Guide

## 🚀 Deployment Checklist

### Pre-Deployment Requirements

1. **Environment Variables**
   - [ ] Copy `.env.example` to `.env.production`
   - [ ] Set `NEXT_PUBLIC_BASE_URL` to your production domain
   - [ ] Configure Supabase production credentials
   - [ ] Set secure `JWT_SECRET` (minimum 32 characters)
   - [ ] Configure email settings (optional)
   - [ ] Set up analytics IDs (optional)

2. **Database Setup**
   - [ ] Supabase project configured
   - [ ] Database schema migrated
   - [ ] Tools data imported
   - [ ] Categories set up
   - [ ] Row Level Security (RLS) policies configured

3. **Build Verification**
   - [ ] Run `npm run build` successfully
   - [ ] No TypeScript errors
   - [ ] No ESLint errors
   - [ ] All pages load correctly

### Deployment Platforms

#### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel --prod
   ```

2. **Environment Variables**
   - Add all production environment variables in Vercel dashboard
   - Ensure `NEXT_PUBLIC_BASE_URL` matches your Vercel domain

3. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Configure DNS records
   - Enable HTTPS (automatic)

#### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Environment Variables**
   - Add all variables in Netlify dashboard
   - Set `NODE_ENV=production`

#### Railway

1. **Deploy from GitHub**
   - Connect GitHub repository
   - Railway will auto-detect Next.js

2. **Environment Variables**
   - Add production variables
   - Configure custom domain

#### Render (Recommended for this project)

1. **Create Web Service**
   - Connect your GitHub repository
   - Service Type: Web Service
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Node Version: 18+

2. **Environment Variables**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_BASE_URL=https://your-app-name.onrender.com
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   JWT_SECRET=your-secure-jwt-secret-32-chars-minimum
   ```

3. **Auto-Deploy Settings**
   - Auto-Deploy: Yes (deploys on git push)
   - Branch: main
   - Root Directory: (leave empty)

4. **Health Check**
   - Health Check Path: `/api/stats` (returns app status)

#### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   COPY --from=builder /app/public ./public
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t allaitools .
   docker run -p 3000:3000 allaitools
   ```

### Post-Deployment Steps

1. **Domain Setup**
   - [ ] Configure custom domain
   - [ ] Set up SSL certificate
   - [ ] Update `NEXT_PUBLIC_BASE_URL`

2. **Performance Optimization**
   - [ ] Enable CDN
   - [ ] Configure caching headers
   - [ ] Set up image optimization
   - [ ] Enable compression

3. **Monitoring**
   - [ ] Set up error tracking (Sentry)
   - [ ] Configure analytics
   - [ ] Set up uptime monitoring
   - [ ] Database performance monitoring

4. **SEO & Security**
   - [ ] Submit sitemap to Google
   - [ ] Configure robots.txt
   - [ ] Set up security headers
   - [ ] Enable rate limiting

### Environment Variables Guide

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `NEXT_PUBLIC_BASE_URL`

**Optional:**
- Email configuration (SMTP_*)
- Analytics (GA_ID, GTM_ID)
- Stripe (for payments)

### Performance Optimizations

1. **Image Optimization**
   - Next.js Image component used throughout
   - WebP and AVIF formats enabled
   - Responsive images configured

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Vendor chunks separated
   - Route-based code splitting

3. **Caching Strategy**
   - Static assets cached for 1 year
   - API routes cached appropriately
   - Database queries optimized

### Troubleshooting

**Build Errors:**
- Check TypeScript errors: `npm run type-check`
- Fix linting issues: `npm run lint:fix`
- Clear cache: `rm -rf .next`

**Runtime Errors:**
- Check environment variables
- Verify Supabase connection
- Check browser console for errors

**Performance Issues:**
- Analyze bundle: `npm run build:analyze`
- Check Core Web Vitals
- Optimize images and fonts

## 📞 Support

For deployment issues, contact: riyassajeed233@gmail.com
Location: Alappuzha, Kerala, India
