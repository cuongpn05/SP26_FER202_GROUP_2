import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import CourseCard from './CourseCard';
import { BookOpen, Loader2, PlayCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyCourses = async () => {
            if (!user?.id) return;
            try {
                setLoading(true);
                // 1. Fetch enrollments for this user
                const enrollmentsRes = await axios.get(`http://localhost:3636/enrollments?userId=${user.id}`);
                const enrollments = enrollmentsRes.data;

                if (enrollments.length === 0) {
                    setCourses([]);
                    setLoading(false);
                    return;
                }

                // 2. Fetch all courses
                const coursesRes = await axios.get('http://localhost:3636/courses');
                const allCourses = coursesRes.data;
                const categoriesRes = await axios.get('http://localhost:3636/categories');
                const categories = categoriesRes.data;

                const categoryMap = new Map(categories.map(c => [String(c.id), c.name]));

                // 3. Filter courses that the user has enrolled in
                const enrolledCourseIds = enrollments.map(e => String(e.courseId));
                const myEnrolledCourses = allCourses
                    .filter(c => enrolledCourseIds.includes(String(c.id)))
                    .map(c => {
                        const enrollment = enrollments.find(e => String(e.courseId) === String(c.id));
                        return {
                            ...c,
                            category: categoryMap.get(String(c.categoryId)) || 'Khác',
                            enrollmentStatus: enrollment?.status,
                            progress: enrollment?.progress || 0
                        };
                    });

                setCourses(myEnrolledCourses);
            } catch (err) {
                console.error("Error fetching my courses:", err);
                setError("Không thể tải danh sách khóa học của bạn.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, [user?.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-gray-500 font-medium italic">Đang tải khóa học của bạn...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-red-500">
                <AlertCircle size={40} />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <BookOpen className="text-blue-600" size={32} />
                        Khóa học của tôi
                    </h1>
                    <p className="text-gray-600 mt-2">Dưới đây là danh sách các khóa học bạn đã tham gia hoặc mua.</p>
                </div>
                <Link to="/" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                    Tiếp tục học tập <PlayCircle size={18} />
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-12 text-center">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PlayCircle className="text-blue-600" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Bạn chưa tham gia khóa học nào</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto font-medium">
                        Hãy khám phá hàng ngàn khóa học hấp dẫn để bắt đầu hành trình học tập của bạn ngay hôm nay!
                    </p>
                    <Link 
                        to="/" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 inline-block"
                    >
                        Khám phá khóa học
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {courses.map(course => (
                        <div key={course.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full relative">
                            <div className="flex flex-col h-full">
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-lg backdrop-blur-sm ${
                                            course.enrollmentStatus === 'completed' 
                                            ? 'bg-green-500/90 text-white' 
                                            : 'bg-blue-600/90 text-white'
                                        }`}>
                                            {course.enrollmentStatus === 'completed' ? 'Hoàn thành' : 'Đang học'}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 rounded">
                                        {course.level}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors min-h-[3.5rem]">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center mt-3 text-gray-500 text-sm space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <PlayCircle size={14} />
                                        </div>
                                        <span className="font-semibold">{course.instructor}</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 space-y-1.5">
                                        <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
                                            <span>Tiến độ</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${course.enrollmentStatus === 'completed' ? 'bg-green-500' : 'bg-blue-600'}`}
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer - Sửa nút 'Học ngay' thành 'Chi tiết' */}
                                    <div className="mt-auto pt-5 flex justify-center border-t border-gray-50">
                                        <Link 
                                            to={`/course-detail/${course.id}`}
                                            className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm decoration-transparent"
                                        >
                                            <span>Chi tiết</span>
                                            <PlayCircle size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
