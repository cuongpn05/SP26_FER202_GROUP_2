import React, { useState, useEffect, useMemo } from 'react';
import HeroSection from './HeroSection';
import FilterSidebar from './FilterSidebar';
import CourseGrid from './CourseGrid';
import { getCourses, getCategories } from '../api/courses';
import { Search, ChevronDown, Bell, UserCircle, ShoppingCart } from 'lucide-react';

const CourseExplorer = () => {
  // States
  const [originalCourses, setOriginalCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesRes, catsRes] = await Promise.all([
          getCourses(),
          getCategories()
        ]);
        setOriginalCourses(coursesRes.data);
        setCategories(catsRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering Logic with useMemo for Optimization
  const filteredCourses = useMemo(() => {
    return originalCourses.filter(course => {
      // Search logic (Tiếng Việt không dấu có thể thêm sau, ở đây dùng includes cơ bản)
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category logic
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      
      // Level logic
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      // Price range logic
      const matchesPrice = selectedPriceRange === 'all' || (() => {
        if (selectedPriceRange === 'under-400') return course.price < 400000;
        if (selectedPriceRange === '400-600') return course.price >= 400000 && course.price <= 600000;
        if (selectedPriceRange === 'above-600') return course.price > 600000;
        return true;
      })();

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [originalCourses, searchQuery, selectedCategory, selectedLevel, selectedPriceRange]);

  return (
    <div className="min-h-screen bg-gray-50/30 selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      {/* Mini Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
         <div className="flex items-center space-x-12">
            <h2 className="text-2xl font-black tracking-tighter text-primary">
              F<span className="text-[#F37021]">.</span>Academy
            </h2>
            <div className="hidden lg:flex items-center space-x-8 text-sm font-bold text-text-muted">
               <a href="#" className="text-primary hover:opacity-80 transition-opacity">Khóa học</a>
               <a href="#" className="hover:text-primary transition-colors">Giảng viên</a>
               <a href="#" className="hover:text-primary transition-colors">Cấp chứng chỉ</a>
               <a href="#" className="hover:text-primary transition-colors">Doanh nghiệp</a>
            </div>
         </div>
         <div className="flex items-center space-x-5">
            <button className="p-2 text-text-muted hover:text-primary transition-colors relative group">
               <Bell size={24} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
            </button>
            <button className="p-2 text-text-muted hover:text-primary transition-colors">
               <ShoppingCart size={24} />
            </button>
            <div className="h-8 w-[1px] bg-gray-200 hidden sm:block" />
            <div className="flex items-center space-x-3 cursor-pointer group">
               <UserCircle size={32} className="text-gray-400 group-hover:text-primary transition-colors" />
               <div className="hidden sm:block">
                  <p className="text-xs font-black uppercase text-text-main line-clamp-1">Trần Anh Quân</p>
                  <p className="text-[10px] font-bold text-text-muted">Student-SE123456</p>
               </div>
               <ChevronDown size={14} className="text-text-muted group-hover:translate-y-0.5 transition-transform" />
            </div>
         </div>
      </nav>

      {/* Hero Section */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - 25% */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
            />
          </div>

          {/* Grid Content - 75% */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 space-y-4 sm:space-y-0">
               <div>
                  <h2 className="text-3xl font-black text-text-main">Khám phá khóa học</h2>
                  <p className="text-text-muted font-medium mt-1">Tìm thấy <span className="text-primary font-bold">{filteredCourses.length}</span> khóa học phù hợp với nhu cầu của bạn</p>
               </div>
               <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-text-muted">Sắp xếp theo:</span>
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-text-main flex items-center space-x-2 cursor-pointer hover:border-primary/40 transition-colors shadow-sm">
                     <span>Bán chạy nhất</span>
                     <ChevronDown size={14} />
                  </div>
               </div>
            </div>

            <CourseGrid courses={filteredCourses} loading={loading} />
          </div>
        </div>
      </main>

      {/* Footer Light */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
               <h2 className="text-xl font-black tracking-tighter text-primary">
                 F<span className="text-[#F37021]">.</span>Academy
               </h2>
               <span className="text-text-muted text-sm border-l border-gray-200 pl-3">© 2026 FPT Education. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm font-bold text-text-muted">
               <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
               <a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a>
               <a href="#" className="hover:text-primary transition-colors">Trung tâm hỗ trợ</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default CourseExplorer;
