import React, { useState, useEffect } from 'react';
import { getAllCategories, addCategory, deleteCategory, getCoursesByCategory } from '../api/courses';
import { Plus, Trash2, Eye, X, BookOpen } from 'lucide-react';

const CategoryManagement = () => {
    // states
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryCourses, setCategoryCourses] = useState([]);
    const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        try {
            await addCategory(newCategoryName);
            setNewCategoryName('');
            setIsAddModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (error) {
            console.error(error);
        }
    };

    const handleViewCourses = async (category) => {
        setSelectedCategory(category);
        setIsCoursesModalOpen(true);
        setLoadingCourses(true);
        try {
            const res = await getCoursesByCategory(category.id);
            setCategoryCourses(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCourses(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-80px)]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-text-main">Quản lí danh mục</h1>
                    <p className="text-text-muted mt-2">Quản lý các danh mục khóa học của hệ thống</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                    <Plus size={20} />
                    <span>Thêm danh mục mới</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 uppercase text-xs font-black text-text-muted tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Tên danh mục</th>
                                    <th className="px-6 py-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-text-muted">#{category.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-text-main">{category.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => handleViewCourses(category)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group relative cursor-pointer"
                                                    title="Xem khóa học"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Xóa danh mục"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-text-muted">
                                            Chưa có danh mục nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold text-text-main">Thêm danh mục mới</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCategory}>
                            <div className="mb-5">
                                <label className="block text-sm font-bold text-text-main mb-2">Tên danh mục</label>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="Nhập tên danh mục..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-sm font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 cursor-pointer"
                                    disabled={!newCategoryName.trim()}
                                >
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Courses Modal */}
            {isCoursesModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCoursesModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-fade-in">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <div>
                                <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
                                    <BookOpen size={24} className="text-primary" />
                                    Khóa học: {selectedCategory?.name}
                                </h3>
                            </div>
                            <button onClick={() => setIsCoursesModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {loadingCourses ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : categoryCourses.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {categoryCourses.map(course => (
                                        <div key={course.id} className="border border-gray-100 rounded-xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                                            <img src={course.thumbnail} alt={course.title} className="w-24 h-24 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-text-main text-sm line-clamp-2 mb-1">{course.title}</h4>
                                                <p className="text-xs text-text-muted mb-2">Giảng viên: {course.instructor}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="text-primary font-bold text-sm">{course.price.toLocaleString('vi-VN')} đ</span>
                                                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                                        {course.level}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <BookOpen size={24} className="text-gray-300" />
                                    </div>
                                    <p className="text-text-muted font-medium">Không có khóa học nào thuộc danh mục này.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;
