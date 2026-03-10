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
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
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
        // Ensure courseId is a number for comparison
        const numericCourseId = Number(courseId);

        const [courseRes, chaptersRes, lessonsRes, categoriesRes] = await Promise.all([
          axios.get(`${API_URL}/courses/${numericCourseId}`),
          axios.get(`${API_URL}/chapters?courseId=${numericCourseId}`),
          axios.get(`${API_URL}/lessons`),
          axios.get(`${API_URL}/categories`)
        ]);

        const courseData = courseRes.data;
        const categoryMatch = categoriesRes.data.find(c => String(c.id) === String(courseData.categoryId));
        courseData.category = categoryMatch ? categoryMatch.name : 'Khác';

        setCourse(courseData);
        setChapters(chaptersRes.data);

        // Filter lessons for these chapters, ensuring numeric comparison
        const chapterIds = chaptersRes.data.map(c => Number(c.id));
        const filteredLessons = lessonsRes.data.filter(l => chapterIds.includes(Number(l.chapterId)));

        setLessons(filteredLessons);

        if (filteredLessons.length > 0) {
          setCurrentLesson(filteredLessons[0]);
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
  }, [courseId]);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || 'Không tìm thấy khóa học'}</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-neutral-100 overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-neutral-800 flex items-center justify-between px-4 bg-neutral-900 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{course.category}</span>
            <h1 className="text-lg font-semibold truncate max-w-md">
              {course.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Left Side - Video Player (8/12) */}
        <div className="lg:w-8/12 w-full flex flex-col bg-black overflow-hidden relative group/viewport">
          {/* Enhanced Video Environment */}
          <div className="flex-1 flex items-center justify-center relative">
            <Suspense fallback={
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0C0C0D]">
                <div className="w-12 h-12 rounded-full border-t-2 border-primary animate-spin mb-6"></div>
                <p className="text-neutral-700 text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing Lesson Content...</p>
              </div>
            }>
              {currentLesson && (
                <div className="w-full h-full animate-fade-in relative flex items-center justify-center p-4">
                  <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />
                  {/* Subtle Vignette Overlay for Focus */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]"></div>
                </div>
              )}
            </Suspense>
          </div>

          {/* Bottom Control Bar/Status within Player Area */}
          <div className="h-16 border-t border-white/5 bg-[#080809]/40 backdrop-blur-md px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                HD Streaming Active
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-[10px] font-black text-neutral-400 hover:text-white transition-colors uppercase tracking-widest">
                Tự động phát
                <div className="w-8 h-4 bg-white/10 rounded-full relative">
                  <div className="absolute right-1 top-1 w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Intelligence Panel (4/12) */}
        <aside
          className={`
            fixed lg:relative inset-y-0 right-0 lg:w-4/12 w-[85%] bg-[#0C0C0D] border-l border-white/5 transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col
            ${isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full lg:hidden opacity-0'}
          `}
        >
          <div className="flex flex-col h-full bg-gradient-to-b from-[#0C0C0D] to-black">
            {/* Sidebar Navigation Header */}
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <h3 className="font-black font-heading text-xl text-white uppercase tracking-tighter">Bảng điều khiển</h3>
                  <div className="h-1 w-8 bg-primary mt-2 rounded-full"></div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-2.5 hover:bg-white/5 rounded-xl text-neutral-500 hover:text-white transition-all border border-transparent hover:border-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Premium Tab Switcher */}
              <div className="flex p-1.5 bg-black/40 rounded-[20px] border border-white/5 mb-6 ring-1 ring-white/5 shadow-inner grow-0">
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`flex-1 py-3 text-[9px] font-black rounded-[15px] transition-all duration-500 uppercase tracking-[2px] ${activeTab === 'curriculum' ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'text-neutral-600 hover:text-neutral-400'}`}
                >
                  Lộ trình
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-3 text-[9px] font-black rounded-[15px] transition-all duration-500 uppercase tracking-[2px] ${activeTab === 'info' ? 'bg-white/10 text-white shadow-xl' : 'text-neutral-600 hover:text-neutral-400'}`}
                >
                  Chi tiết
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 py-3 text-[9px] font-black rounded-[15px] transition-all duration-500 uppercase tracking-[2px] ${activeTab === 'notes' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-neutral-600 hover:text-neutral-400'}`}
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
                      chapters={chapters}
                      lessons={lessons}
                      currentLessonId={currentLesson?.id}
                      onLessonSelect={handleLessonSelect}
                    />
                  </div>
                )}

                {activeTab === 'info' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10 p-4">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Hệ thống bài học 2026</span>
                      </div>
                      <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">
                        {currentLesson?.title}
                      </h2>
                      <p className="text-neutral-500 text-sm font-bold leading-relaxed">
                        Chào mừng bạn đến với khóa học <span className="text-neutral-300">{course.title}</span>. Bài học này sẽ giúp bạn nắm vững kiến thức từ {course.instructor}.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-2">Giảng viên</p>
                        <p className="font-black text-white text-sm">{course.instructor}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-2">Đánh giá</p>
                        <p className="font-black text-white text-sm">{course.rating} / 5.0</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 group cursor-default">
                      <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Tài liệu học tập</h4>
                      <p className="text-neutral-400 text-xs font-medium leading-relaxed group-hover:text-neutral-200 transition-colors">
                        Sử dụng mã nguồn và tài liệu đính kèm để thực hành song song với video bài giảng.
                      </p>
                      <button className="mt-5 w-full py-3 bg-white/[0.03] hover:bg-white/10 rounded-xl text-[10px] font-black text-white border border-white/5 transition-all uppercase tracking-widest">
                        Tải xuống Resources
                      </button>
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
