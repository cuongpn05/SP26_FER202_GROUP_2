import axios from 'axios';
import { courses, categories } from './mockData';

// Giả lập Axios instance để demo logic yêu cầu
const api = axios.create({
  baseURL: 'http://localhost:3636', // Chạy với json-server --port 3636
});

export const getCourses = async () => {
  return api.get('/courses');
};

export const getCategories = async () => {
  return api.get('/categories');
};

export const updateUserProfile = async (userId, userData) => {
  // Cập nhật thông tin người dùng vào db.json qua json-server
  return api.patch(`/users/${userId}`, userData);
};

export const getUserProfile = async (userId) => {
  // Lấy dữ liệu người dùng từ db.json qua json-server
  return api.get(`/users/${userId}`);
};

export const changePassword = async (userId, newPassword) => {
  // Trong thực tế json-server không xử lý logic auth, nhưng ta vẫn PATCH để lưu mật khẩu mới
  return api.patch(`/users/${userId}`, { password: newPassword });
};
