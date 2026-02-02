# IEEE JSU Student Branch Website

A full-stack web application for the IEEE JSU Student Branch at Jacksonville State University, built with **React** (frontend) and **Node.js/Express** (backend).

## 🚀 Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Bootstrap 5
- Font Awesome icons

### Backend
- Node.js & Express
- MongoDB with Mongoose ODM
- Nodemailer for email notifications
- Multer for file uploads
- Helmet for security
- CORS enabled

## 📁 Project Structure

```
ieee-jsu/
├── client/                 # React frontend
│   ├── public/
│   │   ├── assets/        # Static images
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── Navigation.js
│   │   │   ├── Footer.js
│   │   │   ├── EventCard.js
│   │   │   ├── OfficerCard.js
│   │   │   ├── BlogCard.js
│   │   │   ├── Gallery.js
│   │   │   └── Loading.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Events.js
│   │   │   ├── EventDetail.js
│   │   │   ├── Blog.js
│   │   │   ├── BlogDetail.js
│   │   │   ├── Contact.js
│   │   │   └── Members.js
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── styles/        # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── server/                # Node.js backend
│   ├── config/
│   │   └── database.js    # MongoDB connection
│   ├── models/            # Mongoose models
│   │   ├── StudentOfficer.js
│   │   ├── Mentor.js
│   │   ├── Event.js
│   │   ├── BlogPost.js
│   │   ├── Contact.js
│   │   ├── PageBackground.js
│   │   ├── HomeInformation.js
│   │   ├── AboutSection.js
│   │   └── MissionSection.js
│   ├── routes/            # API routes
│   │   ├── officers.js
│   │   ├── mentors.js
│   │   ├── events.js
│   │   ├── blog.js
│   │   ├── contact.js
│   │   └── pages.js
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Custom middleware
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── uploads/           # File upload directory
│   ├── index.js           # Server entry point
│   ├── seed.js            # Database seeding script
│   ├── .env.example
│   └── package.json
├── vercel.json            # Vercel deployment config
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/heyitsprashant/ieee-jsu.git
cd ieee-jsu
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ieee-jsu

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=smptpchecking@gmail.com

# JWT Secret (for future admin authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option A: Seed with Sample Data
```bash
cd server
node seed.js
```

#### Option B: Migrate from Django
If you have existing Django data, export it and create a migration script.

### 5. Start Development Servers

#### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Start Frontend
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📡 API Endpoints

### Public Endpoints

#### Officers
- `GET /api/officers` - Get all active student officers

#### Mentors
- `GET /api/mentors` - Get all active mentors

#### Events
- `GET /api/events?status=active&page=1&limit=8` - Get events
  - Query params: `status` (active/past), `page`, `limit`
- `GET /api/events/:slug` - Get single event by slug

#### Blog
- `GET /api/blog?page=1&limit=6` - Get blog posts (paginated)
- `GET /api/blog/:slug` - Get single blog post by slug

#### Contact
- `POST /api/contact` - Submit contact form
  - Body: `{ first_name, last_name, email, subject, message }`

#### Pages
- `GET /api/home` - Get home page sections
- `GET /api/about` - Get about page sections
- `GET /api/backgrounds/:page` - Get page background
  - Params: page (home/about/events/blog/members/contact)

### Admin Endpoints (Future Implementation)

All admin endpoints will require authentication:
- POST, PUT, DELETE for officers, mentors, events, blog posts

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add all environment variables from `.env` files

### Environment Variables for Production

#### Backend (Vercel)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ieee-jsu
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=smptpchecking@gmail.com
JWT_SECRET=your-production-secret
NODE_ENV=production
```

#### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-domain.vercel.app/api
```

### Alternative: Deploy to Other Platforms

#### Backend Options
- Railway
- Render
- Heroku
- AWS Elastic Beanstalk

#### Frontend Options
- GitHub Pages (static hosting)
- Netlify
- Vercel

## 📝 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dynamic page backgrounds
- ✅ Event management with galleries
- ✅ Blog system with pagination
- ✅ Contact form with email notifications
- ✅ Student officers and mentors profiles
- ✅ SEO-friendly URLs with slugs
- ✅ Pagination for events and blog posts
- ✅ Loading states and error handling

## 🔒 Security

- Helmet.js for HTTP headers security
- CORS configuration
- Input validation
- File upload restrictions
- Environment variable protection

## 🧪 Testing

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- **Prashant** - Initial development

## 📞 Contact

For questions or support, please contact:
- Email: ieee@jsu.edu
- Instagram: [@jsu.ieee](https://www.instagram.com/jsu.ieee/)

## 🔗 Links

- [IEEE.org](https://www.ieee.org/)
- [Jacksonville State University](https://www.jsu.edu/)

---

**Made with ❤️ by Prashant for IEEE JSU Student Branch**
