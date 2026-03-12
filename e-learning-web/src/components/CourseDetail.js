import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  Clock,
  Loader2,
  AlertCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import LessonFormModal from './LessonFormModal';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

  const isCourseManager = user && (user.role === 'admin' || (course && String(user.id) === String(course.instructorId)));

  const fetchLessons = async () => {
    try {
      const lessonsRes = await axios.get(`http://localhost:3636/lessons?courseId=${courseId}`);
      setLessons(lessonsRes.data);
    } catch (err) {
      console.error("Error fetching lessons:", err);
    }
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        // 1. Fetch course details
        const courseRes = await axios.get(`http://localhost:3636/courses/${courseId}`);
        const courseData = courseRes.data;

        // 2. Fetch all categories to find the name
        const categoriesRes = await axios.get(`http://localhost:3636/categories`);
        const categoryMatch = categoriesRes.data.find(c => String(c.id) === String(courseData.categoryId));
        courseData.categoryName = categoryMatch ? categoryMatch.name : 'Khác';

        // 3. Fetch lessons for this course
        await fetchLessons();

        // 4. Fetch instructor details
        if (courseData.instructorId) {
          const instructorRes = await axios.get(`http://localhost:3636/users/${courseData.instructorId}`);
          setInstructor(instructorRes.data);
        }

        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Có lỗi xảy ra khi tải thông tin khóa học.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId, user?.id]);

  const handleDeleteLesson = async (lessonId, lessonTitle) => {
    if (window.confirm(`Bạn có chắc muốn xóa bài học "${lessonTitle}" không? Hành động này không thể hoàn tác.`)) {
      try {
        await axios.delete(`http://localhost:3636/lessons/${lessonId}`);
        await fetchLessons();
      } catch (err) {
        console.error("Error deleting lesson:", err);
        alert("Có lỗi xảy ra khi xóa bài học.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-white">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-400 font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Đang đồng bộ dữ liệu...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-neutral-50 rounded-[2rem] border border-neutral-100 text-center shadow-2xl">
        <AlertCircle className="text-red-500 mx-auto mb-6" size={56} />
        <h2 className="text-2xl font-black text-neutral-800 mb-2 uppercase tracking-tighter">Lỗi truy cập</h2>
        <p className="text-neutral-500 mb-8 font-medium">{error || "Không tìm thấy thông tin khóa học"}</p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-neutral-900 text-white px-6 py-4 rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl"
        >
          <ArrowLeft size={18} /> Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20 font-sans">
      {/* Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white rounded-full shadow-md text-gray-400 hover:text-blue-600 transition-all border border-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mb-8">
          {/* Banner */}
          <div className="p-8">
            <div className="relative h-64 md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          {/* Course Header Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3 tracking-tighter">
                  {course.title}
                </h1>

                <p className="text-slate-500 font-medium leading-[1.6] text-base mb-6 max-w-2xl">
                  {course.description || "Chương trình được thiết kế với nội dung chất lượng cao, giúp bạn làm chủ mọi kỹ năng cần thiết trong môi trường làm việc chuyên nghiệp."}
                </p>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={instructor?.avatar || "https://i.pravatar.cc/150?u=instructor"}
                      alt={instructor?.name || course.instructor}
                      className="w-14 h-14 rounded-2xl object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-lg tracking-tight hover:text-blue-600 cursor-pointer transition-colors">{instructor?.name || course.instructor}</p>
                    <p className="text-slate-500 text-xs font-medium max-w-sm line-clamp-2">
                      {instructor?.bio || "Expert instructor dedicated to sharing knowledge and helping students succeed."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Container */}
          <div className="px-8 border-t border-gray-50">
            <div className="py-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Nội dung khóa học</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{lessons.length} bài đã sẵn sàng</p>
                </div>

                {isCourseManager && (
                  <button
                    onClick={() => {
                      setEditingLesson(null);
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:scale-105 transition-all"
                  >
                    <Plus size={16} /> Thêm bài học mới
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Lessons Grid */}
                <div className="space-y-4">
                  {lessons.map((lesson, idx) => (
                    <div key={lesson.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all flex flex-col md:flex-row items-center gap-6 group">
                      <div className="w-full md:w-32 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={lesson.picture || `https://picsum.photos/seed/${lesson.id}/200/150`}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Lesson</span>
                          <span className="text-gray-400 font-bold text-[10px] uppercase">Part {idx + 1}</span>
                        </div>
                        <h4 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight mb-1">{lesson.title}</h4>
                        <p className="text-slate-500 text-xs font-medium mb-3 line-clamp-1">{lesson.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-blue-600" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3">


                        {!isCourseManager && (
                          <Link
                            to={`/learning/${course.id}/${lesson.id}`}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                          >
                            Học ngay
                          </Link>
                        )}
                        {isCourseManager && (
                          <>
                            <button
                              onClick={() => {
                                setEditingLesson(lesson);
                                setIsModalOpen(true);
                              }}
                              className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl transition-all"
                              title="Chỉnh sửa bài học"
                            >
                              <Edit size={18} />
                            </button>

                            <button
                              onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                              title="Xóa bài học"
                            >
                              <Trash2 size={18} />
                            </button>

                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LessonFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId}
        onSuccess={fetchLessons}
        existingLesson={editingLesson}
      />
    </div>
  );
};

export default CourseDetail;
