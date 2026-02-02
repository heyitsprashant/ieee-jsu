# IEEE JSU Student Branch - Full-Stack Application

Modern full-stack web application for the IEEE JSU (Jacksonville State University) Student Branch, built with React, Node.js/Express, and deployable on Vercel.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5.3.2** - CSS framework
- **Font Awesome 6** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB/Mongoose** - Database (optional, with JSON fallback)
- **Nodemailer** - Email functionality
- **Multer** - File uploads
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Serverless deployment platform

## 📁 Project Structure

```
ieee-jsu/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── data/               # JSON data files (fallback storage)
│   ├── uploads/            # File uploads directory
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env.example
├── package.json            # Root package.json
├── vercel.json             # Vercel deployment config
└── README.md
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (optional, can use JSON storage)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/heyitsprashant/ieee-jsu.git
   cd ieee-jsu
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   Or install separately:
   ```bash
   npm run install:client
   npm run install:server
   ```

3. **Configure environment variables**

   **Client** (`client/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   **Server** (`server/.env`):
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Optional: MongoDB connection (leave empty to use JSON storage)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ieeejsu
   
   # Email configuration (optional but recommended)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_TO=ieee@jsu.edu
   
   CLIENT_URL=http://localhost:3000
   ```

4. **Start development servers**

   Terminal 1 - Backend:
   ```bash
   npm run dev:server
   ```

   Terminal 2 - Frontend:
   ```bash
   npm run dev:client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📊 Data Storage Options

### Option 1: JSON File Storage (Default)
- No MongoDB setup required
- Data stored in `server/data/*.json` files
- Perfect for development and testing
- Easy to version control sample data

### Option 2: MongoDB Atlas (Production)
1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string and add to `server/.env`
4. Data will be stored in MongoDB instead of JSON files

The application automatically detects which storage method to use based on the `MONGODB_URI` environment variable.

## 📧 Email Configuration

To enable contact form email notifications:

1. **Gmail Setup** (recommended for development):
   - Enable 2-Factor Authentication on your Gmail account
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the app password in `SMTP_PASS`

2. **Other SMTP Providers**:
   - Update `SMTP_HOST`, `SMTP_PORT` accordingly
   - Some providers: SendGrid, Mailgun, AWS SES

## 🌐 API Endpoints

### Officers
- `GET /api/officers` - Get all active student officers

### Mentors
- `GET /api/mentors` - Get all active faculty mentors

### Events
- `GET /api/events` - Get all events
- `GET /api/events?status=active` - Get upcoming events
- `GET /api/events?status=past&page=1&limit=8` - Get past events (paginated)
- `GET /api/events/:slug` - Get event by slug

### Blog
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/:slug` - Get blog post by slug

### Contact
- `POST /api/contact` - Submit contact form

### Content
- `GET /api/page-background/:page` - Get page background
- `GET /api/home-sections` - Get home page sections
- `GET /api/about-sections` - Get about page sections

## 🚢 Deployment to Vercel

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick steps:
1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

## 🧪 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Get officers
curl http://localhost:5000/api/officers

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Test","last_name":"User","email":"test@test.com","subject":"Test","message":"Test message"}'
```

### Test Frontend
1. Start both servers
2. Navigate to http://localhost:3000
3. Test all pages and features

## 🎨 Customization

### Adding Sample Data
Edit JSON files in `server/data/`:
- `officers.json` - Student officers
- `mentors.json` - Faculty mentors
- `events.json` - Events
- `blog.json` - Blog posts
- `backgrounds.json` - Page backgrounds
- `home-sections.json` - Home page content
- `about-sections.json` - About page content

### Styling
- Modify `client/src/App.css` for custom styles
- Bootstrap classes available throughout
- CSS variables defined in `:root` for easy theming

## 🔒 Security Features

- CORS protection
- Input validation
- Environment variable protection
- Secure email handling
- File upload restrictions (when implemented)

## 📝 Migration from Django

The previous Django application has been converted to this modern stack:
- All Django models converted to Mongoose schemas
- All views converted to React components
- All templates converted to JSX
- Django admin can be replaced with custom admin panel (future)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👥 Credits

- **Developed by**: Prashant
- **Organization**: IEEE JSU Student Branch
- **University**: Jacksonville State University

## 📞 Support

For questions or issues:
- Email: ieee@jsu.edu
- Instagram: @jsu.ieee

## 🔄 Future Enhancements

- [ ] Admin dashboard for content management
- [ ] User authentication
- [ ] Event registration system
- [ ] Member directory
- [ ] Newsletter subscription
- [ ] Photo upload functionality
- [ ] Search functionality
- [ ] Dark mode

---

Made with ❤️ by IEEE JSU Student Branch
