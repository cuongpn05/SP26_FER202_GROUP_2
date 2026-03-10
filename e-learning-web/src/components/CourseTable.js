import React, { useEffect, useMemo, useState } from "react";
import { deleteCourse, getCourses, updateCourse } from "../api/courses";
import { useAuth } from "../context/AuthContext";

export default function CourseTable({ courses, onEdit, onDelete, onAddNew }) {
  const { user } = useAuth();
  const [internalCourses, setInternalCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    instructor: "",
    level: "Beginner",
    price: "",
    categoryId: "",
  });

  const hasExternalCourses = Array.isArray(courses) && courses.length > 0;

  useEffect(() => {
    if (hasExternalCourses) return;

    let isMounted = true;
    const fetchCourses = async () => {
      setLoading(true);
      setError("");
      try {
        // If user is instructor, only fetch their courses
        const instructorId = user?.role === 'instructor' ? user.id : null;
        const response = await getCourses(instructorId);
        if (isMounted) setInternalCourses(response.data || []);
      } catch (err) {
        if (isMounted) setError("Không tải được dữ liệu khóa học");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, [hasExternalCourses, user]);

  const rows = useMemo(
    () => (hasExternalCourses ? courses : internalCourses),
    [hasExternalCourses, courses, internalCourses]
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Ban co chac muon xoa khoa hoc nay?");
    if (!confirmed) return;

    setError("");
    setDeletingId(id);
    try {
      if (onDelete) {
        await onDelete(id);
      } else {
        await deleteCourse(id);
        setInternalCourses((prev) => prev.filter((course) => course.id !== id));
      }
    } catch (err) {
      setError("Xoa khoa hoc that bai. Vui long thu lai.");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (course) => {
    if (onEdit) {
      onEdit(course);
      return;
    }

    setEditingId(course.id);
    setEditForm({
      title: course.title || "",
      instructor: course.instructor || "",
      level: course.level || "Beginner",
      price: String(course.price ?? ""),
      categoryId: String(course.categoryId ?? "1"),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", instructor: "", level: "Beginner", price: "", categoryId: "" });
  };

  const handleSaveEdit = async (id) => {
    const title = editForm.title.trim();
    const instructor = editForm.instructor.trim();
    const priceNumber = Number(editForm.price);

    if (!title || !instructor || Number.isNaN(priceNumber)) {
      setError("Du lieu sua chua hop le.");
      return;
    }

    setSavingId(id);
    setError("");

    const payload = {
      title,
      instructor,
      level: editForm.level,
      price: priceNumber,
      categoryId: Number(editForm.categoryId),
    };

    try {
      await updateCourse(id, payload);
      setInternalCourses((prev) =>
        prev.map((course) => (course.id === id ? { ...course, ...payload } : course))
      );
      cancelEdit();
    } catch (err) {
      setError("Cap nhat khoa hoc that bai. Vui long thu lai.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-premium overflow-hidden">
       {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-text-main">Course Table</h2>
            <p className="text-sm text-text-muted mt-1">Quan ly danh sach khoa hoc</p>
          </div>
          <button
            onClick={onAddNew}
            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            + Thêm khóa học
          </button>
        </div>
        {/* Header */}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">ID</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Title</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Instructor</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Category</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Level</th>
                <th className="px-6 py-3 text-left font-bold text-text-muted uppercase tracking-wide">Price</th>
                <th className="px-6 py-3 text-right font-bold text-text-muted uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-muted font-medium">
                    Dang tai du lieu...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-red-500 font-semibold">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                    Chua co khoa hoc nao.
                  </td>
                </tr>
              )}

              {!loading && !error &&
                rows.map((c) => {
                  const isEditing = editingId === c.id;
                  return (
                    <tr key={c.id} className="hover:bg-primary/5 transition-colors align-top">
                      <td className="px-6 py-4 font-semibold text-text-main">{c.id}</td>

                      <td className="px-6 py-4 text-text-main font-medium">
                        {isEditing ? (
                          <input
                            value={editForm.title}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          c.title
                        )}
                      </td>

                      <td className="px-6 py-4 text-text-muted">
                        {isEditing ? (
                          <input
                            value={editForm.instructor}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, instructor: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          c.instructor || "N/A"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editForm.categoryId}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          >
                            <option value="1">Khoa học máy tính</option>
                            <option value="2">Kinh tế</option>
                            <option value="3">Ngoại ngữ</option>
                            <option value="4">Kỹ năng mềm</option>
                            <option value="5">Thiết kế đồ họa</option>
                            <option value="6">Marketing</option>
                          </select>
                        ) : (
                          <span className="text-text-main font-medium">{c.category || "Khác"}</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editForm.level}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, level: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs whitespace-nowrap">
                            {c.level || "N/A"}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 font-semibold text-text-main">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, price: e.target.value }))}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : typeof c.price === "number" ? (
                          `${c.price.toLocaleString("vi-VN")}d`
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(c.id)}
                                disabled={savingId === c.id}
                                className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition-colors"
                              >
                                {savingId === c.id ? "Saving..." : "Save"}
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(c)}
                                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(c.id)}
                                disabled={deletingId === c.id}
                                className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-colors"
                              >
                                {deletingId === c.id ? "Deleting..." : "Delete"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
