import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3636',
  timeout: 5000,
});

/**
 * Fetch all available courses and map categoryId to category name
 */
export const getCourses = async () => {
  const [coursesRes, categoriesRes] = await Promise.all([
    api.get('/courses'),
    api.get('/categories'),
  ]);

  const categoryMap = new Map(
    categoriesRes.data.map((category) => [category.id, category.name])
  );

  const normalizedCourses = coursesRes.data.map((course) => ({
    ...course,
    category: categoryMap.get(course.categoryId) || 'Khac',
  }));

  return { data: normalizedCourses };
};

/**
 * Fetch all course categories and return as simple strings for the filter sidebar
 */
export const getCategories = async () => {
  const response = await api.get('/categories');
  return { data: response.data.map((category) => category.name) };
};

export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const updateCourse = (id, payload) => api.patch(`/courses/${id}`, payload);
