import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import CourseGrid from './CourseGrid';
import { getCourses } from '../api/courses';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await getCourses();
        // Lấy tối đa 9 khóa học đầu tiên cho trang chủ
        setCourses(response.data.slice(0, 9));
      } catch (error) {
        console.error("Lỗi khi tải khóa học:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Hero Section */}
      <HeroSection 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">
            Khóa học nổi bật
          </h2>
          <div className="h-2 w-24 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-text-muted text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Khám phá những khóa học được đánh giá cao nhất và bắt đầu hành trình chinh phục tri thức của bạn ngay hôm nay.
          </p>
        </div>

        {/* Course Grid - 3 cột x 3 hàng (thông qua slice(0,9) ở trên) */}
        <div className="mb-20">
          <CourseGrid courses={courses} loading={loading} />
        </div>

        {/* Nút Xem chi tiết */}
        <div className="flex justify-center pb-12">
          <Link 
            to="/explore" 
            className="group flex items-center space-x-3 bg-white border-2 border-primary text-primary px-10 py-5 rounded-2xl font-black transition-all hover:bg-primary hover:text-white shadow-xl shadow-primary/10 hover:shadow-primary/30 active:scale-95"
          >
            <span className="text-xl">Khám phá tất cả khóa học</span>
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
