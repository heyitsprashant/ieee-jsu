# Quick Start Guide

## Prerequisites
- Node.js v14+ installed
- MongoDB (local or Atlas account)
- Git

## Installation (5 minutes)

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/heyitsprashant/ieee-jsu.git
cd ieee-jsu

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
cd ..
```

### 2. Set Up Environment Variables

#### Backend (.env in server/)
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ieee-jsu
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ieee-jsu

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=ieee@jsu.edu
JWT_SECRET=your-secret-key
```

#### Frontend (.env in client/)
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Seed the Database (Optional)

```bash
cd server
npm run seed
```

## Running the Application

### Option 1: Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# App opens on http://localhost:3000
```

### Option 2: Production Build

```bash
# Build frontend
cd client
npm run build

# Serve from backend
cd ../server
npm start
# Full app runs on http://localhost:5000
```

## First Time Setup with MongoDB Atlas

If you don't have MongoDB installed locally:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create a cluster

2. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Update `MONGODB_URI` in `server/.env`

3. **Seed Database**
   ```bash
   cd server
   npm run seed
   ```

## Testing the Application

Once running, test these URLs:

### Frontend (http://localhost:3000)
- Home: http://localhost:3000/
- About: http://localhost:3000/about
- Events: http://localhost:3000/events
- Blog: http://localhost:3000/blog
- Contact: http://localhost:3000/contact
- Members: http://localhost:3000/members

### Backend API (http://localhost:5000/api)
- Health Check: http://localhost:5000/api/health
- Officers: http://localhost:5000/api/officers
- Events: http://localhost:5000/api/events
- Blog: http://localhost:5000/api/blog

## Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB locally or use MongoDB Atlas connection string

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `server/.env` or kill the process using port 5000

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Ensure backend is running and REACT_APP_API_URL is correct

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` in server or client directory

## Next Steps

1. **Customize Content**
   - Edit seed.js with your actual data
   - Run `npm run seed` to update database

2. **Add Your Images**
   - Place images in `server/uploads/`
   - Update database image paths

3. **Configure Email**
   - Use Gmail App Password
   - Update EMAIL_USER and EMAIL_PASSWORD

4. **Deploy**
   - See DEPLOYMENT.md for deployment instructions

## Quick Commands Reference

```bash
# Backend
cd server
npm run dev          # Start development server
npm start            # Start production server
npm run seed         # Seed database with sample data

# Frontend
cd client
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests

# Both
npm install          # Install dependencies
npm audit fix        # Fix security vulnerabilities
```

## Getting Help

- Check README.md for detailed documentation
- Check DEPLOYMENT.md for deployment help
- Check CONVERSION_SUMMARY.md for technical details

## Support

- Email: ieee@jsu.edu
- GitHub Issues: https://github.com/heyitsprashant/ieee-jsu/issues
