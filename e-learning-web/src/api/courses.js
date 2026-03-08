import axios from 'axios';
import { courses, categories } from './mockData';

// Giả lập Axios instance để demo logic yêu cầu
const api = axios.create({
  baseURL: 'https://fake-api.fpt-academy.com', // Endpoint giả định
});

export const getCourses = async () => {
  // Thực tế sẽ dùng api.get('/courses')
  // Ở đây giả lập độ trễ 1.5s
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: courses });
    }, 1500);
  });
};

export const getCategories = async () => {
  // Thực tế sẽ dùng api.get('/categories')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: categories });
    }, 800);
  });
};
