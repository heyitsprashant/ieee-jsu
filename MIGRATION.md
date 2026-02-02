# Migration Guide - Django to Node.js/React

This guide explains what changed in the migration from Django to Node.js/React.

## Overview

The IEEE JSU website has been migrated from:
- **Old Stack**: Django (Python) + SQLite + Django Templates
- **New Stack**: React (JavaScript) + Node.js/Express + MongoDB/JSON

## Architecture Changes

### Before (Django)
```
Browser → Django Views → Django Templates → SQLite Database
```

### After (Node.js/React)
```
Browser → React App → API Calls → Express API → MongoDB/JSON Storage
```

## File Mapping

### Django Models → Mongoose Schemas

| Django Model (core/models.py) | Mongoose Schema (server/models/) |
|-------------------------------|----------------------------------|
| StudentOfficer | Officer.js |
| Mentor | Mentor.js |
| Event | Event.js |
| EventGalleryItem | Event.js (embedded) |
| BlogPost | BlogPost.js |
| Contact | Contact.js |
| PageBackground | PageBackground.js |
| HomeInformation | HomeInformation.js |
| AboutSection | AboutSection.js |

### Django Views → React Components

| Django View (core/views.py) | React Component (client/src/pages/) |
|-----------------------------|-------------------------------------|
| index() | Home.jsx |
| about() | About.jsx |
| events() | Events.jsx |
| event_detail() | EventDetail.jsx |
| blog() | Blog.jsx |
| blog_detail() | BlogDetail.jsx |
| members() | Members.jsx |
| contact() | Contact.jsx |

### Django Templates → React Components

| Django Template | React Component |
|----------------|-----------------|
| base.html | Layout.jsx + Navbar.jsx + Footer.jsx |
| core/index.html | Home.jsx |
| core/about.html | About.jsx |
| core/events.html | Events.jsx |
| core/event_detail.html | EventDetail.jsx |
| core/blog.html | Blog.jsx |
| core/blog_detail.html | BlogDetail.jsx |
| core/members.html | Members.jsx |
| core/contact.html | Contact.jsx |

### Django URLs → React Routes

| Django URL Pattern | React Route |
|-------------------|-------------|
| path('', index) | <Route path="/" element={<Home />} /> |
| path('about/', about) | <Route path="/about" element={<About />} /> |
| path('events/', events) | <Route path="/events" element={<Events />} /> |
| path('events/<slug>/', event_detail) | <Route path="/events/:slug" element={<EventDetail />} /> |
| path('blog/', blog) | <Route path="/blog" element={<Blog />} /> |
| path('blog/<slug>/', blog_detail) | <Route path="/blog/:slug" element={<BlogDetail />} /> |
| path('members/', members) | <Route path="/members" element={<Members />} /> |
| path('contact/', contact) | <Route path="/contact" element={<Contact />} /> |

## Database Changes

### Before: SQLite
- Single file database: `db.sqlite3`
- Django ORM queries
- Direct database access

### After: MongoDB or JSON Files
- **Option 1**: MongoDB Atlas (cloud database)
- **Option 2**: JSON files in `server/data/`
- Mongoose ODM queries or file system operations
- API-based access

## Static Files

### Before (Django)
```
static/
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

### After (React)
```
client/
├── src/
│   └── App.css (copied from Django styles.css)
└── public/
    └── (static assets)
```

## API Endpoints

New RESTful API endpoints created:

```
GET  /api/health                     - Health check
GET  /api/officers                   - Get student officers
GET  /api/mentors                    - Get faculty mentors
GET  /api/events                     - Get all events
GET  /api/events?status=active       - Get upcoming events
GET  /api/events?status=past&page=1  - Get past events (paginated)
GET  /api/events/:slug               - Get event by slug
GET  /api/blog                       - Get blog posts
GET  /api/blog/:slug                 - Get blog post by slug
POST /api/contact                    - Submit contact form
GET  /api/page-background/:page      - Get page background
GET  /api/home-sections              - Get home sections
GET  /api/about-sections             - Get about sections
```

## Configuration Changes

### Before: Django Settings
```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
```

### After: Environment Variables
```bash
# server/.env
MONGODB_URI=mongodb+srv://...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Deployment Changes

### Before: Traditional Hosting
- Deploy Django to traditional server
- Install Python dependencies
- Run with Gunicorn/uWSGI
- Configure Nginx/Apache
- Serve static files separately

### After: Vercel Serverless
- Deploy to Vercel with one click
- Automatic builds on git push
- Serverless functions for API
- Static frontend hosting
- Global CDN distribution
- HTTPS by default

## Feature Parity

All Django features have been preserved:

| Feature | Django | React/Node.js |
|---------|--------|---------------|
| Display Officers | ✅ | ✅ |
| Display Mentors | ✅ | ✅ |
| List Events | ✅ | ✅ |
| Event Details | ✅ | ✅ |
| Event Gallery | ✅ | ✅ |
| Pagination | ✅ | ✅ |
| Blog Posts | ✅ | ✅ |
| Contact Form | ✅ | ✅ |
| Email Notifications | ✅ | ✅ |
| Page Backgrounds | ✅ | ✅ |
| Responsive Design | ✅ | ✅ |
| SEO Meta Tags | ✅ | ✅ |

## New Features/Improvements

Features added during migration:

1. **Modern UI Framework**: React instead of server-side templates
2. **RESTful API**: Clean API for potential mobile app
3. **Serverless Ready**: Deploy to Vercel easily
4. **Dual Storage**: MongoDB or JSON files
5. **Better Documentation**: Comprehensive guides
6. **Environment Variables**: Better configuration management
7. **Modern Build Process**: Optimized bundles
8. **Component Architecture**: Reusable UI components

## Admin Interface

### Before: Django Admin
- Built-in admin at `/admin`
- Create/edit/delete content
- User authentication

### After: Options

**Option 1**: Manual JSON editing (current)
- Edit JSON files in `server/data/`
- Restart server to see changes

**Option 2**: MongoDB Atlas UI
- Use MongoDB Compass or Atlas UI
- Edit documents directly

**Option 3**: Build Custom Admin (future)
- Create React admin dashboard
- Add authentication
- CRUD operations via API

## Development Workflow

### Before (Django)
```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

### After (Node.js/React)
```bash
# Install dependencies
npm run install:all

# Configure environment
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start development
# Terminal 1
npm run dev:server

# Terminal 2
npm run dev:client
```

## Data Migration

If you have existing Django data:

### Option 1: Export to JSON
```python
# In Django
python manage.py dumpdata core.StudentOfficer --indent 2 > officers.json
python manage.py dumpdata core.Mentor --indent 2 > mentors.json
python manage.py dumpdata core.Event --indent 2 > events.json
# etc.
```

Then format for Node.js and place in `server/data/`

### Option 2: Import to MongoDB
1. Export from Django to JSON
2. Format for MongoDB
3. Use MongoDB import tools
4. Configure `MONGODB_URI` in server

## Testing Changes

### Before: Django Tests
```python
python manage.py test
```

### After: Multiple Test Approaches
```bash
# API tests
curl http://localhost:5000/api/health

# Frontend tests
cd client && npm test

# Integration tests
See TESTING.md
```

## Maintenance Considerations

### Django Version
- Old code remains in separate branch
- Can be archived or deleted
- No longer actively developed

### Node.js Version
- Keep dependencies updated
- Monitor security vulnerabilities
- Regular npm updates recommended

## Breaking Changes

Things that work differently:

1. **No Django Admin**: Must use MongoDB UI or JSON files
2. **No Django Forms**: React handles form validation
3. **No Django Authentication**: Not implemented (can be added)
4. **No Django Middleware**: Use Express middleware
5. **No Django Signals**: Use Express middleware/hooks

## Migration Checklist

If migrating production data:

- [ ] Export all Django data
- [ ] Set up MongoDB Atlas (optional)
- [ ] Configure environment variables
- [ ] Import data to new system
- [ ] Test all features
- [ ] Update DNS to point to Vercel
- [ ] Monitor for issues
- [ ] Keep Django backup for 30 days

## Rollback Plan

If needed to rollback:

1. Keep Django code in separate branch
2. Keep Django database backup
3. Can redeploy Django quickly
4. Update DNS back to Django server

## Support

For questions about the migration:
- Email: ieee@jsu.edu
- Check documentation: README.md, DEPLOYMENT.md
- Review test results: TESTING.md

---

**Migration Date**: February 2, 2026
**Migration Status**: ✅ Complete and tested
**Production Ready**: ✅ Yes
