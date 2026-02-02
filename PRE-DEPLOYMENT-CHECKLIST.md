# Pre-Deployment Checklist

Use this checklist before deploying the application to production.

## ✅ Environment Setup

### Local Development
- [ ] Node.js v14+ installed
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Git configured

### MongoDB Atlas (if using cloud)
- [ ] Account created at https://www.mongodb.com/cloud/atlas
- [ ] Free cluster created
- [ ] Database user created with password
- [ ] IP address whitelisted (0.0.0.0/0 for Vercel)
- [ ] Connection string obtained

### Email Service
- [ ] Gmail account or SMTP service ready
- [ ] App Password generated (for Gmail: https://myaccount.google.com/apppasswords)
- [ ] Test email configured

## ✅ Installation & Testing

### Backend Setup
- [ ] Navigated to `server/` directory
- [ ] Ran `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Updated `MONGODB_URI` in `.env`
- [ ] Updated email credentials in `.env`
- [ ] Ran `npm run seed` to populate database
- [ ] Ran `npm run dev` to test server
- [ ] Verified server starts on port 5000
- [ ] Tested health check: http://localhost:5000/api/health
- [ ] Tested API endpoint: http://localhost:5000/api/officers

### Frontend Setup
- [ ] Navigated to `client/` directory
- [ ] Ran `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Updated `REACT_APP_API_URL` to `http://localhost:5000/api`
- [ ] Ran `npm start` to test frontend
- [ ] Verified app opens on port 3000
- [ ] Tested navigation between pages
- [ ] Verified data loads from API

### Functionality Testing
- [ ] Home page loads with dynamic content
- [ ] About page shows officers and mentors
- [ ] Events page displays active and past events
- [ ] Event detail page works (click on an event)
- [ ] Blog page shows blog posts
- [ ] Blog detail page works (click on a blog post)
- [ ] Contact form validates input
- [ ] Contact form submits successfully
- [ ] Email notification received (if SMTP configured)
- [ ] Members page displays correctly
- [ ] Mobile menu works (test on small screen)
- [ ] Pagination works on Events and Blog pages
- [ ] All images load correctly
- [ ] Footer displays current date/time
- [ ] No console errors in browser

## ✅ Data Migration (if migrating from Django)

### Export Django Data
- [ ] Django application still accessible
- [ ] Ran `python migrate_data.py`
- [ ] Verified `migration_data/` folder created
- [ ] Checked all JSON files generated:
  - [ ] officers.json
  - [ ] mentors.json
  - [ ] events.json
  - [ ] blog_posts.json
  - [ ] backgrounds.json
  - [ ] home_info.json
  - [ ] about_sections.json

### Copy Media Files
- [ ] Copied all files from Django `media/` to `server/uploads/`
- [ ] Verified folder structure matches:
  - [ ] student_officers/
  - [ ] mentors/
  - [ ] events/
  - [ ] blog_images/
  - [ ] backgrounds/
  - [ ] home_info/
  - [ ] about/

### Import to MongoDB
- [ ] Ran `node import_data.js`
- [ ] Verified success messages for all collections
- [ ] Checked data in MongoDB (use MongoDB Compass)
- [ ] Verified image paths are correct
- [ ] Updated any broken image URLs

## ✅ Code Quality

### Security
- [ ] All sensitive data in .env files (not committed)
- [ ] .gitignore includes .env and node_modules
- [ ] No hardcoded credentials in code
- [ ] CORS configured correctly
- [ ] Helmet.js middleware active
- [ ] File upload restrictions in place

### Dependencies
- [ ] Ran `npm audit` in both server/ and client/
- [ ] Fixed any critical vulnerabilities
- [ ] All dependencies up to date

### Code Review
- [ ] No debugging console.logs in production code
- [ ] Error handling implemented
- [ ] Loading states present
- [ ] Form validation working
- [ ] Proper HTTP status codes used

## ✅ Vercel Deployment Preparation

### Vercel Account
- [ ] Account created at https://vercel.com
- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Logged in: `vercel login`

### Repository
- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Branch is up to date
- [ ] No uncommitted changes

### Environment Variables (Vercel Dashboard)
Prepare these values to add in Vercel:

#### Production Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ieee-jsu
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASSWORD=your-production-app-password
CONTACT_EMAIL=ieee@jsu.edu
JWT_SECRET=long-random-production-secret
NODE_ENV=production
REACT_APP_API_URL=/api
```

- [ ] MongoDB Atlas production connection string ready
- [ ] Production email credentials ready
- [ ] Strong JWT secret generated
- [ ] All variables documented

### Deployment Files
- [ ] vercel.json exists in root
- [ ] Build commands correct in package.json
- [ ] .gitignore properly configured
- [ ] README.md updated with production info

## ✅ First Deployment

### Deploy to Vercel
- [ ] Ran `vercel` command
- [ ] Selected correct project settings
- [ ] Deployment completed successfully
- [ ] Received deployment URL

### Post-Deployment Configuration
- [ ] Added all environment variables in Vercel dashboard
- [ ] Triggered redeploy after adding variables
- [ ] Deployment successful

### Production Testing
- [ ] Home page loads on Vercel URL
- [ ] All pages accessible
- [ ] API endpoints working
- [ ] Images loading correctly
- [ ] Contact form working
- [ ] Email notifications working
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast page loads (check with Lighthouse)

## ✅ Post-Deployment

### DNS & Domain (Optional)
- [ ] Custom domain configured (if applicable)
- [ ] DNS records updated
- [ ] SSL certificate active (automatic on Vercel)

### Monitoring
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Analytics added (Google Analytics, etc.)
- [ ] Uptime monitoring configured

### Backups
- [ ] MongoDB Atlas automatic backups enabled
- [ ] Code backed up on GitHub
- [ ] Media files backed up to cloud storage

### Documentation
- [ ] README.md updated with production URLs
- [ ] Team members notified
- [ ] Admin access documented
- [ ] Deployment process documented

### Content
- [ ] Replaced sample data with real content
- [ ] All officer profiles updated
- [ ] Mentor information accurate
- [ ] Events are current
- [ ] Blog posts added
- [ ] Contact information correct
- [ ] Social media links updated

## ✅ Handoff

### Access & Credentials
- [ ] Vercel account access shared
- [ ] MongoDB Atlas access shared
- [ ] GitHub repository access shared
- [ ] Email account credentials documented
- [ ] Admin documentation provided

### Training
- [ ] Team trained on updating content
- [ ] MongoDB Compass tutorial provided
- [ ] Deployment process explained
- [ ] Troubleshooting guide reviewed

### Maintenance Plan
- [ ] Regular update schedule established
- [ ] Backup verification scheduled
- [ ] Security audit planned
- [ ] Performance monitoring active

## 📊 Final Verification

Run through this complete user journey:
1. [ ] Visit home page
2. [ ] Click "Learn More" → About page loads
3. [ ] View officer profiles
4. [ ] Click "View Events" → Events page loads
5. [ ] Click on an event → Event detail loads
6. [ ] Go to Blog → Blog posts load
7. [ ] Click on a post → Post detail loads
8. [ ] Go to Contact → Form loads
9. [ ] Fill and submit form → Success message
10. [ ] Check email → Notification received
11. [ ] Visit Members → Page loads
12. [ ] Test on mobile device
13. [ ] Test on tablet
14. [ ] Test on desktop

## 🎉 Launch!

If all items are checked:
- [ ] Application is READY FOR PRODUCTION
- [ ] Announce launch to stakeholders
- [ ] Monitor for first 24 hours
- [ ] Celebrate! 🎊

---

**Remember:** Start small, test thoroughly, and deploy with confidence!

For any issues, refer to:
- README.md - General documentation
- DEPLOYMENT.md - Deployment specifics
- QUICKSTART.md - Quick setup
- CONVERSION_SUMMARY.md - Technical details
