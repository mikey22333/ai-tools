# Ezoic Setup Checklist

## Pre-Deployment ✓ COMPLETED

- [x] Install privacy scripts in `<head>`
- [x] Install Ezoic header script
- [x] Configure ads.txt redirect
- [x] Create reusable EzoicAd component
- [x] Add ad placements to homepage
- [x] Add ad placements to blog posts
- [x] Add ad placements to blog listing

## Deployment Steps 🚀

### 1. Test Locally
```powershell
npm run dev
```
Visit http://localhost:3000 and verify:
- [ ] Page loads without errors
- [ ] No console errors related to Ezoic
- [ ] Ad placeholder divs are present in HTML

### 2. Build for Production
```powershell
npm run build
```
- [ ] Build completes without errors
- [ ] No warnings about Ezoic components

### 3. Deploy to Production
```powershell
git add .
git commit -m "Add Ezoic ad integration with placements"
git push origin main
```
- [ ] Code pushed successfully
- [ ] Deployment completed (check your hosting platform)

### 4. Verify Live Site
```powershell
# Run verification script
.\scripts\verify-ezoic.ps1
```

OR manually check:
- [ ] Visit https://allaitools.dev/ads.txt
  - Should redirect to Ezoic's ads.txt
  - Should show list of authorized sellers
- [ ] View source on homepage
  - Look for Ezoic scripts in `<head>`
  - Look for ad placeholder divs
- [ ] Check browser console
  - No Ezoic-related errors
  - `window.ezstandalone` should be defined

## Ezoic Dashboard Setup 🎯

### 1. Log Into Ezoic
- [ ] Visit https://pubdash.ezoic.com/
- [ ] Log in to your account

### 2. Create Ad Placements

Create these placements in your Ezoic dashboard:

**Homepage:**
- [ ] Placement 101 - "Homepage Top Leaderboard"
  - Location: After hero section
  - Type: Leaderboard (728x90 or responsive)

- [ ] Placement 102 - "Homepage Mid Content"
  - Location: Between sections
  - Type: Medium Rectangle (300x250 or responsive)

- [ ] Placement 103 - "Homepage Bottom Leaderboard"
  - Location: Before footer
  - Type: Leaderboard (728x90 or responsive)

**Blog Posts:**
- [ ] Placement 104 - "Blog Post Top"
  - Location: After image, before content
  - Type: Leaderboard or Medium Rectangle

- [ ] Placement 105 - "Blog Post Bottom"
  - Location: After content
  - Type: Leaderboard or Medium Rectangle

**Blog Listing:**
- [ ] Placement 106 - "Blog Listing Top"
  - Location: After header
  - Type: Leaderboard (728x90 or responsive)

- [ ] Placement 107 - "Blog Sidebar"
  - Location: Sidebar
  - Type: Skyscraper (160x600) or Medium Rectangle

### 3. Configure Settings

- [ ] Enable automatic placeholder testing
- [ ] Set ad density preferences (recommend: 20-30%)
- [ ] Enable Ezoic Speed (optional but recommended)
- [ ] Configure privacy settings (GDPR/CCPA)

### 4. Activate Integration

- [ ] Mark integration as "Complete" in dashboard
- [ ] Enable mediation (if using other ad networks)
- [ ] Set up payment information

## Monitoring & Optimization 📊

### First 24 Hours
- [ ] Check that ads are appearing on live site
- [ ] Verify no console errors
- [ ] Monitor page speed (Core Web Vitals)
- [ ] Check mobile responsiveness

### First Week
- [ ] Review EPMV in dashboard
- [ ] Check ad viewability metrics
- [ ] Monitor user experience feedback
- [ ] Adjust ad density if needed

### Ongoing (Monthly)
- [ ] Review revenue trends
- [ ] Analyze top-performing pages
- [ ] Test new ad placements
- [ ] Review A/B test results
- [ ] Optimize based on data

## Troubleshooting 🔧

### Ads Not Showing?

1. **Check Ezoic Dashboard**
   - [ ] Placements created and active?
   - [ ] Integration status = "Complete"?
   - [ ] Any error messages?

2. **Check Website**
   - [ ] Clear browser cache
   - [ ] Disable ad blocker
   - [ ] Check browser console for errors
   - [ ] Verify placeholder divs exist in HTML

3. **Check Traffic**
   - [ ] Need real users (not just you)
   - [ ] Wait 1-2 hours for propagation
   - [ ] Check with different browsers/devices

### Revenue Not Showing?

- [ ] Wait 24-48 hours for data
- [ ] Verify you have actual traffic
- [ ] Check that ads are visible and viewable
- [ ] Review dashboard for any alerts

## Success Metrics 📈

Track these in your Ezoic dashboard:

- [ ] EPMV (Earnings Per Thousand Visitors)
  - Target: Varies by niche ($5-$50+)
- [ ] Ad Viewability
  - Target: 60%+ viewability
- [ ] Page Speed
  - Target: Good Core Web Vitals
- [ ] User Experience
  - Target: Bounce rate < 60%

## Resources 📚

- **Integration Guide:** `EZOIC_INTEGRATION.md`
- **Placement IDs:** `constants/ezoicPlacements.ts`
- **Component Code:** `components/EzoicAd.tsx`
- **Ezoic Support:** https://www.ezoic.com/support/
- **Dashboard:** https://pubdash.ezoic.com/

## Quick Reference

**Your Domain:** allaitools.dev
**Ads.txt URL:** https://allaitools.dev/ads.txt
**Total Placements:** 7 (101-107)

---

**Status:** ✅ Integration Complete - Ready for Dashboard Setup
**Last Updated:** November 23, 2025
