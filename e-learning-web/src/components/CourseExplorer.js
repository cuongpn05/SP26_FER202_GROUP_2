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


    </div>
  );
};

export default CourseExplorer;
