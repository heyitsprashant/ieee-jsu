import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Officers
export const getOfficers = () => api.get('/officers');

// Mentors
export const getMentors = () => api.get('/mentors');

// Events
export const getEvents = (params = {}) => api.get('/events', { params });
export const getEventBySlug = (slug) => api.get(`/events/${slug}`);

// Blog
export const getBlogPosts = (params = {}) => api.get('/blog', { params });
export const getBlogPostBySlug = (slug) => api.get(`/blog/${slug}`);

// Contact
export const submitContact = (data) => api.post('/contact', data);

// Pages
export const getHomeInfo = () => api.get('/home');
export const getAboutSections = () => api.get('/about');
export const getPageBackground = (page) => api.get(`/backgrounds/${page}`);

export default api;
