# Deployment Guide

## Deploying to Vercel with MongoDB Atlas

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/ieee-jsu`)

### Step 2: Prepare Environment Variables

Create these environment variables in Vercel:

#### Backend Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ieee-jsu
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
CONTACT_EMAIL=smptpchecking@gmail.com
JWT_SECRET=your-super-secret-production-key
NODE_ENV=production
```

#### Frontend Variables
```
REACT_APP_API_URL=/api
```

Note: For production on Vercel, use `/api` as the API URL since frontend and backend are on the same domain.

### Step 3: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 4: Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? ieee-jsu
# - In which directory is your code located? ./
```

### Step 5: Configure Environment Variables

After deployment, go to your Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add all the variables listed above
3. Redeploy the project

### Step 6: Seed the Database

You can seed the database by:

1. **Option A**: Use MongoDB Compass to connect and manually add data
2. **Option B**: Create a temporary seeding endpoint:
   - Add `GET /api/seed` route temporarily
   - Visit `https://your-app.vercel.app/api/seed`
   - Remove the endpoint after seeding

### Step 7: Test the Deployment

1. Visit your Vercel URL
2. Test all pages
3. Test the contact form
4. Verify images load correctly

## Troubleshooting

### Images Not Loading
- Make sure to upload images to a cloud storage service (AWS S3, Cloudinary, etc.)
- Update image URLs in the database to use the cloud URLs

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Check database user permissions

### Email Not Sending
- Use Gmail App Password (not your regular password)
- Enable "Less secure app access" in Gmail settings
- Consider using a service like SendGrid or Mailgun for production

## Alternative Deployment Options

### GitHub Pages (Frontend only)
```bash
cd client
npm run build
# Deploy the build folder to GitHub Pages
```

### Railway (Backend)
1. Sign up at [Railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Render (Backend)
1. Sign up at [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variables
5. Deploy

## Production Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] All environment variables set in Vercel
- [ ] Database seeded with initial data
- [ ] Email service configured and tested
- [ ] Images migrated to cloud storage
- [ ] SSL/HTTPS enabled (automatic on Vercel)
- [ ] Custom domain configured (optional)
- [ ] SEO meta tags verified
- [ ] Performance tested
- [ ] Security headers configured (Helmet.js)
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Analytics configured (Google Analytics, etc.)

## Monitoring and Maintenance

### Logs
- View logs in Vercel dashboard
- Set up log monitoring with services like Logtail or Papertrail

### Backups
- Set up automatic MongoDB backups in Atlas
- Export database regularly

### Updates
- Keep dependencies updated
- Monitor for security vulnerabilities with `npm audit`

## Support

For issues or questions:
- Email: ieee@jsu.edu
- Check Vercel documentation: https://vercel.com/docs
- Check MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
