import React, { useState, useEffect, useMemo, useRef } from 'react';
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

  // Sort States
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SORT_OPTIONS = [
    { id: 'featured', label: 'Mặc định (Featured)' },
    { id: 'popular', label: 'Bán chạy nhất' },
    { id: 'highest-rated', label: 'Đánh giá cao nhất' },
    { id: 'newest', label: 'Mới nhất' },
    { id: 'price-asc', label: 'Giá: Thấp đến Cao' },
    { id: 'price-desc', label: 'Giá: Cao đến Thấp' },
  ];

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

  const sortedCourses = useMemo(() => {
    const sorted = [...filteredCourses];
    switch (sortBy) {
      case 'highest-rated':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => {
          const idA = parseInt(a.id, 10);
          const idB = parseInt(b.id, 10);
          return (!isNaN(idA) && !isNaN(idB)) ? idB - idA : String(b.id).localeCompare(String(a.id));
        });
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popular':
      case 'featured':
      default:
        return sorted;
    }
  }, [filteredCourses, sortBy]);

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
                <p className="text-text-muted font-medium mt-1">Tìm thấy <span className="text-primary font-bold">{sortedCourses.length}</span> khóa học phù hợp với nhu cầu của bạn</p>
              </div>
              <div className="flex items-center space-x-3 relative" ref={sortRef}>
                <span className="text-sm font-bold text-text-muted">Sắp xếp theo:</span>
                <div
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-text-main flex items-center space-x-2 cursor-pointer hover:border-primary/40 transition-colors shadow-sm min-w-[200px] justify-between"
                >
                  <span>{SORT_OPTIONS.find(opt => opt.id === sortBy)?.label}</span>
                  <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </div>

                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                    {SORT_OPTIONS.map(option => (
                      <div
                        key={option.id}
                        className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${sortBy === option.id ? 'bg-primary/10 text-primary font-bold' : 'text-text-main hover:bg-gray-50 font-medium'}`}
                        onClick={() => {
                          setSortBy(option.id);
                          setIsSortOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <CourseGrid courses={sortedCourses} loading={loading} />
          </div>
        </div>
      </main>


    </div>
  );
};

export default CourseExplorer;
