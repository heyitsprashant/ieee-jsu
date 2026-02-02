import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student Officers
export const getStudentOfficers = () => api.get('/officers');

// Mentors
export const getMentors = () => api.get('/mentors');

// Events
export const getEvents = (status = '', page = 1, limit = 8) => {
  let url = '/events';
  const params = new URLSearchParams();
  
  if (status) params.append('status', status);
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);
  
  const queryString = params.toString();
  if (queryString) url += `?${queryString}`;
  
  return api.get(url);
};

export const getEvent = (slug) => api.get(`/events/${slug}`);

// Blog
export const getBlogPosts = () => api.get('/blog');
export const getBlogPost = (slug) => api.get(`/blog/${slug}`);

// Contact
export const submitContact = (data) => api.post('/contact', data);

// Content
export const getPageBackground = (page) => api.get(`/page-background/${page}`);
export const getHomeSections = () => api.get('/home-sections');
export const getAboutSections = () => api.get('/about-sections');

export default api;
