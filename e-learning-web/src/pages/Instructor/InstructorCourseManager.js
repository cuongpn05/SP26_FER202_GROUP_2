import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getCourses } from "../../api/courses";
import CourseForm from "./CourseForm";
import { useAuth } from "../../context/AuthContext";

export default function InstructorCourseManager() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const instructorId = user?.role === "instructor" ? user.id : null;
      const response = await getCourses(instructorId);
      setCourses(response.data || []);
    } catch (err) {
      setError("Không thể tải danh sách khóa học.");
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (!confirmed) return;

    setError("");
    try {
      await deleteCourse(courseId);
      await loadCourses();
    } catch (err) {
      setError("Xóa khóa học thất bại.");
    }
  };

  if (showForm) {
    return (
      <CourseForm
        course={editingCourse}
        onSuccess={async () => {
          setShowForm(false);
          setEditingCourse(null);
          await loadCourses();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingCourse(null);
        }}
      />
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent flex flex-wrap gap-3 justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-text-main">Quản lý khóa học</h2>
            <p className="text-sm text-text-muted mt-1">
              {user?.role === "admin"
                ? "Xem và quản lý tất cả khóa học trong hệ thống"
                : "Quản lý các khóa học do bạn giảng dạy"}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingCourse(null);
              setShowForm(true);
            }}
            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
          >
            + Tạo khóa học
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">ID</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Tên khóa học</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Giảng viên</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Mức độ</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Giá</th>
                <th className="px-6 py-3 text-right font-bold text-text-muted uppercase tracking-wide">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-muted font-medium">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-red-600 font-semibold">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && courses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                    Chưa có khóa học nào.
                  </td>
                </tr>
              )}

              {!loading && !error &&
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-text-main font-semibold">{course.id}</td>
                    <td className="px-6 py-4 text-text-main font-medium">{course.title}</td>
                    <td className="px-6 py-4 text-text-muted">{course.instructor || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs whitespace-nowrap">
                        {course.level || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-text-main">
                      {typeof course.price === "number"
                        ? `${course.price.toLocaleString("vi-VN")}đ`
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 flex-wrap">
                        <button
                          onClick={() => navigate(`/lesson-editor/${course.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors"
                        >
                          Bài học
                        </button>
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setShowForm(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
