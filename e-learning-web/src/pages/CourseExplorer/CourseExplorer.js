import React, { useState, useEffect, useMemo, useRef } from 'react';
import FilterSidebar from './components/FilterSidebar';
import CourseGrid from '../../components/common/CourseGrid';
import { getCourses, getCategories } from '../../api/courses';
import { Search, ChevronDown, Bell, UserCircle, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

import { useNavigate, useLocation } from 'react-router-dom';

const CourseExplorer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  // States
  const [originalCourses, setOriginalCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Sort States
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Sync search query with URL
  useEffect(() => {
    const query = queryParams.get('search') || '';
    setSearchQuery(query);
  }, [location.search]);

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
        if (selectedPriceRange === 'free') return course.price === 0;
        if (selectedPriceRange === 'under-400') return course.price > 0 && course.price < 400000;
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
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => {
          const idA = parseInt(a.id, 10);
          const idB = parseInt(b.id, 10);
          return (!isNaN(idA) && !isNaN(idB)) ? idB - idA : String(b.id).localeCompare(String(a.id));
        });
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      case 'featured':
      default:
        break;
    }
    return sorted;
  }, [filteredCourses, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLevel, selectedPriceRange, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 selection:bg-primary/20 selection:text-primary transition-colors duration-300">


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

            <CourseGrid courses={currentCourses} loading={loading} />

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 
                    ${currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-text-main hover:bg-primary hover:text-white shadow-sm border border-gray-100'}`}
                >
                  <ChevronLeft size={16} />
                  <span>Trước</span>
                </button>

                <div className="flex items-center space-x-2 mx-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 
                        ${currentPage === i + 1 
                          ? 'bg-primary text-white shadow-md shadow-primary/20 scale-110' 
                          : 'bg-white text-text-main hover:bg-primary/10 hover:text-primary'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 
                    ${currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-text-main hover:bg-primary hover:text-white shadow-sm border border-gray-100'}`}
                >
                  <span>Sau</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>


    </div>
  );
};

export default CourseExplorer;
