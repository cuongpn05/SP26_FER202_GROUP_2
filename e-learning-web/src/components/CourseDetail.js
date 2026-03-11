import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  BarChart, 
  Award, 
  CheckCircle, 
  Loader2, 
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import ProgressChart from './ProgressChart';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
    const { courseId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            if (!user?.id || !courseId) return;

            try {
                setLoading(true);
                // Fetch course details
                const courseRes = await axios.get(`http://localhost:3636/courses/${courseId}`);
                const courseData = courseRes.data;

                // Fetch enrollment status for this specific user & course
                const enrollmentRes = await axios.get(
                  `http://localhost:3636/enrollments?userId=${user.id}&courseId=${courseId}`
                );
                
                if (enrollmentRes.data.length === 0) {
                    setError("Bạn chưa đăng ký khóa học này.");
                    setLoading(false);
                    return;
                }

                setCourse(courseData);
                setEnrollment(enrollmentRes.data[0]);
            } catch (err) {
                console.error("Error fetching course details:", err);
                setError("Có lỗi xảy ra khi tải thông tin khóa học.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetail();
    }, [courseId, user?.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={48} />
                <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-sm">Đang tải chi tiết khóa học...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="max-w-xl mx-auto mt-20 p-8 bg-red-50 rounded-3xl border border-red-100 text-center">
                <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi truy cập</h2>
                <p className="text-red-600 mb-6 font-medium">{error || "Không tìm thấy thông tin khóa học"}</p>
                <button 
                  onClick={() => navigate('/my-courses')}
                  className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 mx-auto shadow-lg"
                >
                  <ArrowLeft size={18} /> Quay lại danh sách
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            {/* Header Sticky Bar */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/my-courses')}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors py-2 px-3 rounded-xl hover:bg-blue-50"
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline">Quay lại</span>
                    </button>
                    <h2 className="text-gray-800 font-bold truncate max-w-md hidden md:block">{course.title}</h2>
                    <Link 
                        to={`/learning/${course.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                        <PlayCircle size={18} /> Tiếp tục học
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
                          <div className="relative h-72 md:h-96">
                              <img 
                                  src={course.thumbnail} 
                                  alt={course.title} 
                                  className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                  <div className="flex flex-wrap gap-2 mb-4">
                                      <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                                          {course.level}
                                      </span>
                                      <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                          {course.duration}
                                      </span>
                                  </div>
                                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                                      {course.title}
                                  </h1>
                                  <p className="text-white/80 font-medium flex items-center gap-2">
                                      Giảng viên: <span className="text-white font-bold">{course.instructor}</span>
                                  </p>
                              </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                                <BookOpen className="text-blue-600" size={24} />
                                Giới thiệu khóa học
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                                {course.description || "Chưa có mô tả cho khóa học này."}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-400 text-[11px] font-black uppercase tracking-wider">Thời lượng</span>
                                <span className="text-gray-800 font-bold flex items-center gap-2"><Clock size={16} className="text-blue-600"/> {course.duration}</span>
                              </div>
                              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-400 text-[11px] font-black uppercase tracking-wider">Cấp độ</span>
                                <span className="text-gray-800 font-bold flex items-center gap-2"><BarChart size={16} className="text-blue-600"/> {course.level}</span>
                              </div>
                              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-400 text-[11px] font-black uppercase tracking-wider">Bài giảng</span>
                                <span className="text-gray-800 font-bold flex items-center gap-2"><BookOpen size={16} className="text-blue-600"/> {course.lessonsCount || 24}</span>
                              </div>
                              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span className="text-gray-400 text-[11px] font-black uppercase tracking-wider">Chứng chỉ</span>
                                <span className="text-gray-800 font-bold flex items-center gap-2"><Award size={16} className="text-blue-600"/> Có</span>
                              </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Progress Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center">
                            <h3 className="text-lg font-black text-gray-800 mb-6 w-full">Tiến độ của bạn</h3>
                            <ProgressChart progress={enrollment.progress} />
                            
                            <div className="mt-8 w-full space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 p-2 rounded-xl">
                                            <CheckCircle className="text-green-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 font-black uppercase tracking-wider leading-none">Trạng thái</p>
                                            <p className="text-sm font-bold text-gray-800 mt-1">
                                                {enrollment.status === 'completed' ? 'Đã hoàn thành' : 'Đang học'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-xl">
                                            <PlayCircle className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 font-black uppercase tracking-wider leading-none">Bài học tiếp theo</p>
                                            <p className="text-sm font-bold text-gray-800 mt-1">Sơ lược về khóa học</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link 
                                to={`/learning/${course.id}`}
                                className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-black text-center hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 group"
                            >
                                {enrollment.status === 'completed' ? 'Xem lại bài học' : 'Vào lớp học ngay'}
                                <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Support Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200/50">
                            <h4 className="font-black text-xl mb-2 italic">Hỗ trợ 24/7</h4>
                            <p className="text-white/80 text-sm font-medium leading-relaxed italic mb-6">
                                Bạn gặp khó khăn trong quá trình học tập? Hãy liên hệ ngay với giảng viên hoặc cộng đồng học viên!
                            </p>
                            <button className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-black py-3 rounded-2xl transition-all border border-white/20 uppercase tracking-widest text-xs">
                                Nhắn tin cho giảng viên
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;