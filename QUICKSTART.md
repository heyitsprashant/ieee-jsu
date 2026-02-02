# Quick Start Guide

Get the IEEE JSU application running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm installed
- Git installed

## Step 1: Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/heyitsprashant/ieee-jsu.git
cd ieee-jsu

# Install all dependencies
npm run install:all
```

## Step 2: Configure Environment (1 minute)

### Backend Configuration

Create `server/.env`:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` (optional for basic testing):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Optional: Leave empty to use JSON file storage
MONGODB_URI=

# Optional: Email configuration
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_TO=
```

### Frontend Configuration

Create `client/.env`:

```bash
cd ../client
cp .env.example .env
```

The default values work for local development:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 3: Start Development Servers (2 minutes)

Open two terminal windows:

### Terminal 1 - Backend

```bash
cd server
npm run dev
```

You should see:
```
MongoDB URI not provided. Using JSON file storage mode.
Server running on port 5000
```

### Terminal 2 - Frontend

```bash
cd client
npm start
```

You should see:
```
Compiled successfully!
Local: http://localhost:3000
```

## Step 4: Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## Available Pages

- Home: http://localhost:3000/
- About: http://localhost:3000/about
- Events: http://localhost:3000/events
- Blog: http://localhost:3000/blog
- Members: http://localhost:3000/members
- Contact: http://localhost:3000/contact

## Test the Contact Form

1. Go to http://localhost:3000/contact
2. Fill in the form
3. Submit
4. Check `server/data/contacts.json` to see the saved submission

## Sample Data

The application comes with sample data in `server/data/`:
- `officers.json` - Student officers
- `mentors.json` - Faculty mentors
- `events.json` - Events
- `blog.json` - Blog posts
- `backgrounds.json` - Page backgrounds
- `home-sections.json` - Home page content
- `about-sections.json` - About page content

You can edit these files to customize the content!

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend**: Edit `server/.env` and change `PORT=5000` to another port
**Frontend**: Create `client/.env.local` and add `PORT=3001`

### Module Not Found

If you see module errors:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### API Not Responding

Make sure:
1. Backend server is running (check Terminal 1)
2. Port 5000 is not blocked
3. No firewall issues

### React Build Errors

If you see React errors:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

## Next Steps

### Add Your Own Data

1. Edit JSON files in `server/data/`
2. Follow the existing format
3. Restart the server

### Set Up MongoDB (Optional)

1. Create MongoDB Atlas account
2. Get connection string
3. Add to `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://...
   ```
4. Restart server

### Enable Email Notifications

1. Get SMTP credentials (Gmail App Password recommended)
2. Add to `server/.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_TO=ieee@jsu.edu
   ```
3. Restart server

### Deploy to Vercel

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

## Development Scripts

### Root Directory

```bash
npm run install:all      # Install all dependencies
npm run install:client   # Install client dependencies
npm run install:server   # Install server dependencies
npm run build:client     # Build React app for production
npm run dev:client       # Start React development server
npm run dev:server       # Start Node.js development server
npm start               # Start production server
```

### Server Directory

```bash
npm start               # Start production server
npm run dev            # Start development server with nodemon
```

### Client Directory

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
```

## File Structure Overview

```
ieee-jsu/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── services/     # API service layer
│   └── public/           # Static files
├── server/               # Node.js backend
│   ├── controllers/      # Business logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   ├── data/            # JSON data files
│   └── uploads/         # Uploaded files
└── docs/                # Documentation
```

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
- Check [TESTING.md](TESTING.md) for test results
- Email: ieee@jsu.edu
- Instagram: @jsu.ieee

---

**Happy Coding!** 🚀
