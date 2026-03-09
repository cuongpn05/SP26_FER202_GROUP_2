import axios from 'axios';

// Axios instance matching the local JSON server
const api = axios.create({
  baseURL: 'http://localhost:3500',
});

/**
 * Fetch all available courses and map categoryId to category name
 */
export const getCourses = async () => {
  try {
    const [coursesRes, catsRes] = await Promise.all([
      api.get('/courses'),
      api.get('/categories')
    ]);

    const categoriesMap = catsRes.data.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {});

    const mappedCourses = coursesRes.data.map(course => ({
      ...course,
      category: categoriesMap[course.categoryId] || 'Unknown'
    }));

    return { data: mappedCourses };
  } catch (error) {
    console.error("Error fetching courses from API:", error);
    throw error;
  }
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
