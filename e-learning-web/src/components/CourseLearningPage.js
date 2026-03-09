import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Menu } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' or 'notes'

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Ensure courseId is a number for comparison
        const numericCourseId = Number(courseId);
        
        const [courseRes, chaptersRes, lessonsRes] = await Promise.all([
          axios.get(`${API_URL}/courses/${numericCourseId}`),
          axios.get(`${API_URL}/chapters?courseId=${numericCourseId}`),
          axios.get(`${API_URL}/lessons`)
        ]);

        setCourse(courseRes.data);
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
          <h1 className="text-lg font-semibold truncate max-w-md hidden sm:block">
            {course.title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Main Content Areas */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Section */}
          <div className="w-full bg-black flex items-center justify-center aspect-video max-h-[75vh]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center bg-neutral-800 animate-pulse">
                <p className="text-neutral-400">Đang tải trình phát video...</p>
              </div>
            }>
              {currentLesson && (
                <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />
              )}
            </Suspense>
          </div>

          {/* Info Section */}
          <div className="p-6 max-w-4xl mx-auto w-full">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{currentLesson?.title}</h2>
              <p className="text-neutral-400 italic">Cập nhật lúc 2026</p>
            </div>
          </div>
        </div>

        {/* Sidebar - Curriculum */}
        <aside 
          className={`
            fixed lg:relative inset-y-0 right-0 w-80 sm:w-[400px] bg-neutral-900 border-l border-neutral-800 transform transition-transform duration-300 ease-in-out z-20
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:hidden'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Tabs Header */}
            <div className="flex border-b border-neutral-800">
              <button 
                onClick={() => setActiveTab('curriculum')}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'curriculum' ? 'text-indigo-500 bg-neutral-800/20' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Nội dung
                {activeTab === 'curriculum' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${activeTab === 'notes' ? 'text-indigo-500 bg-neutral-800/20' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                Ghi chú
                {activeTab === 'notes' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
              </button>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-4 hover:bg-neutral-800 rounded lg:hidden text-neutral-500"
              >
                <ChevronLeft className="rotate-180" size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <Suspense fallback={<div className="p-8 text-center text-neutral-500 animate-pulse">Đang tải...</div>}>
                {activeTab === 'curriculum' ? (
                  <CurriculumAccordion 
                    chapters={chapters} 
                    lessons={lessons} 
                    currentLessonId={currentLesson?.id}
                    onLessonSelect={handleLessonSelect}
                  />
                ) : (
                  <div className="p-4 animate-in fade-in slide-in-from-right-2 duration-300">
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
