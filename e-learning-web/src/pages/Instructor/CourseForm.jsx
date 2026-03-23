import React, { useEffect, useState } from "react";
import { createCourse, updateCourse, getCategories, getCourses } from "../../api/courses";
import { useAuth } from "../../context/AuthContext";

export default function CourseForm({ course, onSuccess, onCancel }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    description: "",
    thumbnail: "",
    price: "",
    level: "Beginner",
    categoryId: "1",
    rating: 5,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Populate form if editing existing course
  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        instructor: course.instructor || "",
        description: course.description || "",
        thumbnail: course.thumbnail || "",
        price: course.price || "",
        level: course.level || "Beginner",
        categoryId: course.categoryId || "1",
        rating: course.rating || 5,
      });
    } else if (user) {
      // Set instructor info for new course
      setFormData((prev) => ({
        ...prev,
        instructor: user.name || "",
      }));
    }
  }, [course, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { title, instructor, thumbnail, price, level, categoryId } = formData;

    // Validation
    if (!title.trim() || !thumbnail.trim() || !price) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      setLoading(false);
      return;
    }

    // Check instructor only when editing existing course
    if (course && !instructor.trim()) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
      setLoading(false);
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError("Giá khóa học phải là một số dương.");
      setLoading(false);
      return;
    }


    try {
      const payload = {
        title: title.trim(),
        instructor: course ? instructor.trim() : (user?.name || ""),
        description: formData.description.trim(),
        thumbnail: thumbnail.trim(),
        price: Number(price),
        level,
        categoryId,
        rating: formData.rating,
        instructorId: user?.id || (course && course.instructorId) || undefined,
      };

      if (course && course.id) {
        // Update existing course
        await updateCourse(course.id, payload);
      } else {
        // Create new course: lấy id lớn nhất dạng chuỗi số, +1, rồi chuyển lại thành chuỗi
        const allCoursesRes = await getCourses();
        const allCourses = allCoursesRes.data || [];
        // Lọc id là chuỗi số
        const stringNumberIds = allCourses
          .map((c) => typeof c.id === 'string' && /^\d+$/.test(c.id) ? parseInt(c.id, 10) : (typeof c.id === 'number' ? c.id : NaN))
          .filter((id) => !isNaN(id));
        if (stringNumberIds.length > 0) {
          const maxId = Math.max(...stringNumberIds);
          payload.id = String(maxId + 1);
        } else {
          // Nếu không có id số nào, fallback random chuỗi
          payload.id = Math.random().toString(36).substr(2, 10);
        }
        await createCourse(payload);
      }

      setFormData({
        title: "",
        instructor: "",
        description: "",
        thumbnail: "",
        price: "",
        level: "Beginner",
        categoryId: "1",
        rating: 5,
      });

      onSuccess?.();
    } catch (err) {
      setError(
        course
          ? "Cập nhật khóa học thất bại. Vui lòng thử lại."
          : "Tạo khóa học thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
          <h2 className="text-2xl font-black text-text-main">
            {course ? "Cập nhật khóa học" : "Tạo khóa học mới"}
          </h2>
          <p className="text-sm text-text-muted mt-1">
            {course
              ? "Chỉnh sửa thông tin khóa học"
              : "Thêm một khóa học mới vào hệ thống"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Tiêu đề khóa học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề khóa học"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Instructor - Hidden for new courses, shown for editing */}
            {course && (
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Giảng viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="Nhập tên giảng viên"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Phân loại
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={String(idx + 1)}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Mức độ
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Giá (đồng) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Nhập giá khóa học"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Đánh giá (0-5)
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-text-main mb-2">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả khóa học"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-text-main mb-2">
              URL ảnh đại diện <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {formData.thumbnail && (
              <div className="mt-2">
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500x300?text=Invalid+URL";
                  }}
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading
                ? course
                  ? "Đang cập nhật..."
                  : "Đang tạo..."
                : course
                ? "Cập nhật"
                : "Tạo khóa học"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
