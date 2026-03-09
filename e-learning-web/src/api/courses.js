import axios from 'axios';

// Axios instance matching the local JSON server
const api = axios.create({
  baseURL: 'http://localhost:3636', // Chạy với json-server --port 3636
});

/**
 * Fetch all available courses and map categoryId to category name
 */
export const getCourses = async () => {
  return api.get('/courses');
};

/**
 * Fetch all course categories and return as simple strings
 */
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    const categoryNames = response.data.map(cat => cat.name);
    return { data: categoryNames };
  } catch (error) {
    console.error("Error fetching categories from API:", error);
    throw error;
  }
};

/**
 * Fetch a user profile by ID from json-server
 */
export const getUserProfile = async (userId) => {
  return api.get(`/users/${userId}`);
};

/**
 * Update a user profile using PATCH via json-server
 */
export const updateUserProfile = async (userId, userData) => {
  return api.patch(`/users/${userId}`, userData);
};

/**
 * Change a user's password using PATCH via json-server
 */
export const changePassword = async (userId, newPassword) => {
  return api.patch(`/users/${userId}`, { password: newPassword });
};
