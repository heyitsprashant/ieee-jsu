require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Import models
const StudentOfficer = require('./models/StudentOfficer');
const Mentor = require('./models/Mentor');
const Event = require('./models/Event');
const BlogPost = require('./models/BlogPost');
const PageBackground = require('./models/PageBackground');
const HomeInformation = require('./models/HomeInformation');
const AboutSection = require('./models/AboutSection');

// Sample data
const officers = [
  {
    name: 'John Doe',
    position: 'President',
    image: '/uploads/student_officers/default.jpg',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    email: 'john.doe@jsu.edu',
    is_active: true,
    order: 1
  },
  {
    name: 'Jane Smith',
    position: 'Vice President',
    image: '/uploads/student_officers/default.jpg',
    linkedin: 'https://linkedin.com/in/janesmith',
    email: 'jane.smith@jsu.edu',
    is_active: true,
    order: 2
  }
];

const mentors = [
  {
    name: 'Dr. Robert Johnson',
    position: 'Faculty Advisor',
    image: '/uploads/mentors/default.jpg',
    linkedin: 'https://linkedin.com/in/drjohnson',
    email: 'rjohnson@jsu.edu',
    google_scholar: 'https://scholar.google.com/citations?user=example',
    personal_website: 'https://example.com',
    bio: 'Dr. Johnson has been advising the IEEE student branch for over 10 years.',
    expertise: 'Electrical Engineering, Signal Processing',
    is_active: true,
    order: 1
  }
];

const events = [
  {
    title: 'IEEE Welcome Week',
    slug: 'ieee-welcome-week',
    date: new Date('2024-09-15'),
    location: 'Ayers Hall',
    description: 'Join us for our annual welcome week event!',
    excerpt: 'A great opportunity to meet fellow IEEE members and learn about upcoming activities.',
    content: 'Full content about the welcome week event...',
    image: '/uploads/events/default.jpg',
    registration_link: 'https://example.com/register',
    has_gallery: false,
    gallery_items: []
  },
  {
    title: 'Tech Workshop 2024',
    slug: 'tech-workshop-2024',
    date: new Date('2024-10-20'),
    location: 'Engineering Building',
    description: 'Hands-on workshop on emerging technologies.',
    excerpt: 'Learn about the latest in tech with industry experts.',
    content: 'Detailed workshop information...',
    image: '/uploads/events/default.jpg',
    has_gallery: false,
    gallery_items: []
  }
];

const blogPosts = [
  {
    title: 'Welcome to IEEE JSU',
    slug: 'welcome-to-ieee-jsu',
    author: 'IEEE JSU Team',
    content: 'Welcome to the official blog of IEEE JSU Student Branch. We are excited to share our journey with you!',
    excerpt: 'Welcome to our blog!',
    image: '/uploads/blog_images/default.jpg',
    is_published: true
  }
];

const backgrounds = [
  {
    page: 'home',
    title: 'Welcome to IEEE JSU',
    subtitle: 'Advancing Technology for Humanity',
    background_image: '/static/assets/jsu-anglehall.jpg',
    is_active: true
  },
  {
    page: 'about',
    title: 'About Us',
    subtitle: 'Learn more about our organization',
    background_image: '/static/assets/jsu-anglehall.jpg',
    is_active: true
  },
  {
    page: 'events',
    title: 'Our Events',
    subtitle: 'Discover our upcoming and past events',
    background_image: '/static/assets/jsu-anglehall.jpg',
    is_active: true
  },
  {
    page: 'blog',
    title: 'Our Blog',
    subtitle: 'Read our latest posts and updates',
    background_image: '/static/assets/jsu-anglehall.jpg',
    is_active: true
  },
  {
    page: 'members',
    title: 'Membership',
    subtitle: 'Join the IEEE JSU community',
    background_image: '/static/assets/jsu-anglehall.jpg',
    is_active: true
  },
  {
    page: 'contact',
    title: 'Contact Us',
    subtitle: 'Get in touch with us',
    background_image: '/static/assets/jsu-anglehall.jpg',
    is_active: true
  }
];

const homeInfo = [
  {
    title: 'About IEEE JSU',
    description: 'The IEEE JSU Student Branch is dedicated to promoting excellence in electrical and electronics engineering.',
    section_type: 'text_media',
    media_type: 'image',
    image: '/static/assets/ieee.png',
    is_homepage_feature: true,
    order: 1,
    is_active: true
  }
];

const aboutSections = [
  {
    title: 'About Us',
    content: 'The IEEE JSU Student Branch is dedicated to promoting excellence in the field of electrical and electronics engineering at Jacksonville State University.',
    section_order: 1,
    is_active: true
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await StudentOfficer.deleteMany({});
    await Mentor.deleteMany({});
    await Event.deleteMany({});
    await BlogPost.deleteMany({});
    await PageBackground.deleteMany({});
    await HomeInformation.deleteMany({});
    await AboutSection.deleteMany({});

    // Insert sample data
    await StudentOfficer.insertMany(officers);
    await Mentor.insertMany(mentors);
    await Event.insertMany(events);
    await BlogPost.insertMany(blogPosts);
    await PageBackground.insertMany(backgrounds);
    await HomeInformation.insertMany(homeInfo);
    await AboutSection.insertMany(aboutSections);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
