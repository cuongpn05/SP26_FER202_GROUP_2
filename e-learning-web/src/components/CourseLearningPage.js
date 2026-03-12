import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Menu, X } from 'lucide-react';

// Lazy load components
const VideoPlayer = lazy(() => import('./VideoPlayer'));
const CurriculumAccordion = lazy(() => import('./CurriculumAccordion'));
const NoteSystem = lazy(() => import('./NoteSystem'));

const API_URL = 'http://localhost:3636';

const CourseLearningPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum', 'info', or 'notes'

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const numericCourseId = Number(courseId);

        const [courseRes, lessonsRes, categoriesRes] = await Promise.all([
          axios.get(`${API_URL}/courses/${numericCourseId}`),
          axios.get(`${API_URL}/lessons?courseId=${numericCourseId}`),
          axios.get(`${API_URL}/categories`)
        ]);

        const courseData = courseRes.data;
        const categoryMatch = categoriesRes.data.find(c => String(c.id) === String(courseData.categoryId));
        courseData.category = categoryMatch ? categoryMatch.name : 'Khác';

        setCourse(courseData);
        setLessons(lessonsRes.data);

        if (lessonsRes.data.length > 0) {
          // If lessonId is provided in URL, find that lesson, otherwise default to the first one
          const targetLesson = lessonId 
            ? lessonsRes.data.find(l => String(l.id) === String(lessonId))
            : lessonsRes.data[0];
          
          setCurrentLesson(targetLesson || lessonsRes.data[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError('Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, lessonId]);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || 'Không tìm thấy khóa học'}</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900 overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-slate-100 flex items-center justify-between px-4 bg-white z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/course-detail/${courseId}`)}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-600"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] text-blue-600 font-black uppercase tracking-wider">{course.category}</span>
            <h1 className="text-sm font-black text-slate-900 truncate max-w-md uppercase tracking-tight">
              {course.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-blue-600"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Left Side - Video Player (8/12) */}
        <div className="lg:w-8/12 w-full flex flex-col bg-slate-50 overflow-hidden relative group/viewport">
          {/* Enhanced Video Environment */}
          <div className="flex-1 flex items-center justify-center relative">
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center bg-white">
                <div className="w-12 h-12 rounded-full border-t-2 border-blue-600 animate-spin mb-6"></div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Lesson Content...</p>
              </div>
            }>
              {currentLesson && (
                <div className="w-full h-full animate-fade-in relative flex items-center justify-center p-4">
                  <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />
                  {/* Subtle Vignette Overlay for Focus */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(255,255,255,0.4)]"></div>
                </div>
              )}
            </Suspense>
          </div>       
        </div>

        {/* Right Side - Intelligence Panel (4/12) */}
        <aside
          className={`
            fixed lg:relative inset-y-0 right-0 lg:w-4/12 w-[85%] bg-white border-l border-slate-100 transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 shadow-2xl flex flex-col
            ${isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full lg:hidden opacity-0'}
          `}
        >
          <div className="flex flex-col h-full bg-slate-50/30">
            {/* Sidebar Navigation Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">Bảng nội dung</h3>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Premium Tab Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200/50 mb-6">
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`flex-1 py-2.5 text-[9px] font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${activeTab === 'curriculum' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Lộ trình
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-2.5 text-[9px] font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${activeTab === 'info' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-2.5 text-[9px] font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${activeTab === 'notes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Ghi chú
                </button>
              </div>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-12">
              <Suspense fallback={
                <div className="p-20 text-center">
                  <div className="w-10 h-10 rounded-full border-t-2 border-primary animate-spin mx-auto mb-6"></div>
                  <span className="text-neutral-700 text-[9px] font-black uppercase tracking-[5px] animate-pulse">Syncing...</span>
                </div>
              }>
                {activeTab === 'curriculum' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <CurriculumAccordion
                      lessons={lessons}
                      currentLessonId={currentLesson?.id}
                      onLessonSelect={handleLessonSelect}
                    />
                  </div>
                )}

                {activeTab === 'info' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8 p-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Thông tin bài học</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                        {currentLesson?.title}
                      </h2>
                      <p className="text-slate-500 text-xs font-medium leading-relaxed">
                        {currentLesson?.description || "Chào mừng bạn đến với bài học này. Hãy tập trung và thực hành cùng giảng viên để đạt kết quả tốt nhất."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Giảng viên</p>
                        <p className="font-black text-slate-900 text-xs">{course.instructor}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Đánh giá</p>
                        <p className="font-black text-slate-900 text-xs">{course.rating} / 5.0</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-1000">
                    {currentLesson && (
                      <NoteSystem lessonId={currentLesson.id} userId={1} />
                    )}
                  </div>
                )}
              </Suspense>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CourseLearningPage;
