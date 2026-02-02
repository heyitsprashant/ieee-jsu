# Deployment Guide - IEEE JSU Full-Stack Application

This guide will walk you through deploying the IEEE JSU application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works great)
- MongoDB Atlas account (optional, can use JSON storage)

## Step 1: Prepare Your Repository

1. **Ensure all code is committed**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify configuration files**
   - ✅ `vercel.json` exists in root
   - ✅ `package.json` exists in root, client, and server directories
   - ✅ `.gitignore` properly configured

## Step 2: Set Up MongoDB Atlas (Optional but Recommended)

If you want to use MongoDB instead of JSON file storage:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier
   - Create a new project (e.g., "IEEE-JSU")

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select a cloud provider and region (choose closest to your users)
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set permissions to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel's serverless functions
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ieeejsu` or your preferred name
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ieeejsu?retryWrites=true&w=majority`

## Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Log in to Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: Leave as `./`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: Leave empty (handled by vercel.json)
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   **Server Variables:**
   ```
   NODE_ENV = production
   MONGODB_URI = your-mongodb-connection-string (optional)
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = your-email@gmail.com
   SMTP_PASS = your-app-password
   EMAIL_TO = ieee@jsu.edu
   CLIENT_URL = https://your-vercel-url.vercel.app
   ```

   **Client Variables:**
   ```
   REACT_APP_API_URL = /api
   ```

   Note: For Vercel deployment, use `/api` not full URL since it's same domain

5. **Deploy**
   - Click "Deploy"
   - Wait for build and deployment to complete
   - You'll get a URL like `https://ieee-jsu.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add SMTP_HOST
   vercel env add SMTP_PORT
   vercel env add SMTP_USER
   vercel env add SMTP_PASS
   vercel env add EMAIL_TO
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 4: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project in Vercel dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., ieee.jsu.edu)

2. **Update DNS Records**
   - Add DNS records provided by Vercel
   - Typically an A record or CNAME
   - Wait for DNS propagation (can take up to 48 hours)

3. **Update Environment Variables**
   - Update `CLIENT_URL` to your custom domain
   - Redeploy if needed

## Step 5: Verify Deployment

1. **Test Website**
   - Visit your Vercel URL
   - Navigate through all pages
   - Test contact form
   - Check console for errors

2. **Test API Endpoints**
   ```bash
   curl https://your-url.vercel.app/api/health
   curl https://your-url.vercel.app/api/officers
   ```

3. **Monitor Logs**
   - Go to Vercel dashboard
   - Click on your project
   - Go to "Deployments"
   - Click on latest deployment
   - Check "Functions" tab for serverless logs

## Troubleshooting

### Build Failures

**Issue**: Build fails with module errors
```
Solution: 
- Check all dependencies are listed in package.json
- Ensure all imports are correct
- Check for case-sensitive file names
```

**Issue**: React build runs out of memory
```
Solution:
- Add to vercel.json build config:
  "env": { "NODE_OPTIONS": "--max-old-space-size=4096" }
```

### Runtime Errors

**Issue**: 500 errors on API calls
```
Solution:
- Check Vercel function logs
- Verify environment variables are set
- Check MongoDB connection string
- Verify CORS settings
```

**Issue**: Cannot connect to MongoDB
```
Solution:
- Verify connection string is correct
- Check MongoDB Atlas network access allows 0.0.0.0/0
- Verify database user has correct permissions
```

**Issue**: Email not sending
```
Solution:
- Verify SMTP credentials are correct
- For Gmail: use App Password, not regular password
- Check SMTP_HOST and SMTP_PORT values
- Look at function logs for error messages
```

### Data Issues

**Issue**: No data showing on site
```
Solution:
If using MongoDB:
- Verify connection string
- Import sample data to MongoDB
- Check collection names match models

If using JSON:
- Verify JSON files exist in server/data/
- Check JSON file syntax
- Ensure files are deployed (not in .gitignore)
```

## Step 6: Continuous Deployment

Vercel automatically deploys on every push to main branch:

1. **Make Changes Locally**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Automatic Deployment**
   - Vercel detects the push
   - Builds the project
   - Deploys automatically
   - You get a notification

3. **Preview Deployments**
   - Every PR gets a preview URL
   - Test changes before merging
   - Share preview with team

## Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use different values for production
   - Keep secrets secure

2. **Database Backups**
   - Regularly backup MongoDB data
   - Export important collections
   - Test restore process

3. **Monitoring**
   - Check Vercel analytics
   - Monitor function execution times
   - Set up uptime monitoring

4. **Performance**
   - Optimize images before uploading
   - Use lazy loading for images
   - Monitor bundle size

5. **Security**
   - Keep dependencies updated
   - Use HTTPS only
   - Validate all inputs
   - Rate limit API endpoints

## Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update client dependencies
cd client
npm update

# Update server dependencies
cd ../server
npm update

# Test locally before deploying
npm start
```

### Database Maintenance

- Monitor MongoDB Atlas metrics
- Optimize queries if needed
- Clean up old contact form submissions
- Backup data regularly

## Support

If you encounter issues:

1. Check Vercel documentation: https://vercel.com/docs
2. Check MongoDB Atlas docs: https://docs.atlas.mongodb.com/
3. Review function logs in Vercel dashboard
4. Contact IEEE JSU team: ieee@jsu.edu

## Cost Considerations

### Free Tier Limits

**Vercel Free Tier:**
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless function execution
- ✅ Automatic HTTPS
- ✅ Unlimited projects

**MongoDB Atlas Free Tier:**
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ No credit card required

These limits are sufficient for most student organization websites.

### Scaling Up

If you exceed free tier:
- Vercel Pro: $20/month
- MongoDB Atlas: Pay as you go
- Consider optimizing before upgrading

---

## Quick Reference

### Deployment Commands
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add VARIABLE_NAME

# View logs
vercel logs
```

### Important URLs
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com/
- GitHub Repo: https://github.com/heyitsprashant/ieee-jsu

---

Happy Deploying! 🚀
