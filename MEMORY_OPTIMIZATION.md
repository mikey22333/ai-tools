# Deployment Troubleshooting Guide

## Memory Issues on Render

### 🚨 Common Memory Errors

#### "Web Service exceeded its memory limit"
This error occurs when your app uses more than 512MB RAM on Render's starter plan.

**Immediate Solutions:**
1. **Upgrade Plan**: Switch to Professional plan (2GB RAM)
2. **Restart Service**: Temporary fix to clear memory
3. **Check Logs**: Identify memory-intensive operations

### 🔧 Memory Optimization Checklist

#### ✅ **Application Level**
- [ ] Set `NODE_OPTIONS=--max-old-space-size=512` in environment
- [ ] Reduced displayLimit to 50 tools per page
- [ ] Implemented proper cleanup in useEffect hooks
- [ ] Limited database connection pool size
- [ ] Optimized image loading and caching

#### ✅ **Next.js Configuration**
- [ ] Added memory limits in next.config.js
- [ ] Disabled worker threads for memory savings
- [ ] Optimized image device sizes
- [ ] Enabled compression and minification

#### ✅ **Deployment Settings**
- [ ] Use `npm ci --only=production` for builds
- [ ] Set proper NODE_OPTIONS in environment
- [ ] Configure health check endpoint
- [ ] Monitor memory usage in dashboard

### 🔍 Debugging Memory Issues

#### **Local Testing**
```bash
# Test with memory limits locally
NODE_OPTIONS='--max-old-space-size=512' npm start

# Monitor memory usage
node --inspect npm start
# Then open chrome://inspect in Chrome browser
```

#### **Production Monitoring**
1. Check Render dashboard metrics
2. Monitor response times and error rates
3. Watch for memory usage spikes
4. Set up alerts at 80% memory usage

### 🚀 Performance Optimization

#### **Database Queries**
- Limit query results (pagination)
- Use SELECT only needed columns
- Implement proper indexing
- Use connection pooling

#### **Frontend Optimization**
- Lazy load components and images
- Implement virtual scrolling for large lists
- Use React.memo for expensive components
- Optimize bundle size with tree shaking

#### **Caching Strategy**
- Cache frequently accessed data
- Use Redis for session storage
- Implement proper cache invalidation
- Cache static assets with CDN

### 📈 Scaling Strategy

#### **Growth Path**
1. **Start**: Render Starter (512MB) - Good for testing
2. **Growth**: Render Professional (2GB) - Production ready
3. **Scale**: Multiple instances + Load balancer
4. **Enterprise**: Dedicated infrastructure

#### **Cost Optimization**
- Monitor actual resource usage
- Scale down during low traffic
- Use Render's auto-scaling features
- Implement proper error handling to prevent cascading failures

### 🆘 Emergency Actions

#### **If Service is Down**
1. **Immediate**: Restart service in Render dashboard
2. **Quick**: Upgrade to Professional plan temporarily
3. **Short-term**: Check and fix memory leaks
4. **Long-term**: Implement all optimizations above

#### **Contact Support**
If optimizations don't help, contact:
- Render Support: support@render.com
- Include: Error logs, service metrics, optimization attempts

### 📊 Key Metrics to Monitor

- **Memory Usage**: Should stay under 80% of limit
- **CPU Usage**: Monitor for spikes during traffic
- **Response Time**: Should stay under 2 seconds
- **Error Rate**: Keep under 1%
- **Build Time**: Optimize if over 10 minutes

### 🎯 Success Indicators

✅ Service stays online during traffic spikes
✅ Memory usage consistently under 80%
✅ Build times under 5 minutes
✅ Page load times under 2 seconds
✅ Zero memory-related restarts
