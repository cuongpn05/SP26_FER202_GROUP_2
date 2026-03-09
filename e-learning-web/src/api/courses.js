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
