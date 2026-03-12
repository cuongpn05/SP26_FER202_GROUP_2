import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import StatsStrip from './sections/StatsStrip';
import TopCategories from './sections/TopCategories';
import WhyChooseUs from './sections/WhyChooseUs';
import CTASection from './sections/CTASection';
import CourseGrid from '../../components/common/CourseGrid';
import FilterBar from './sections/FilterBar';
import { getCourses } from '../../api/courses';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for filtering (for the main explorer part)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Lỗi khi tải khóa học:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Top 4 courses by rating for Featured Section
  const featuredCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [courses]);

  // General filtered list for the grid at bottom
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const handleSearch = () => {
    const element = document.getElementById('explore-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-body selection:bg-[#1A73E8]/20 selection:text-[#1A73E8] overflow-x-hidden">
      <main className="w-full">
        {/* [Nặng] Hero Section */}
        <HeroSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* [Nhẹ] Stats Strip */}
        <StatsStrip />

        {/* [Vừa] Categories */}
        <TopCategories />

        {/* [Nặng] Featured Courses Section */}
        <section className="py-24 bg-gray-50/50">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
             >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                     <div className="w-8 h-1 bg-[#1A73E8] rounded-full"></div>
                     <span className="text-[#1A73E8] font-black uppercase tracking-widest text-xs">F-Choice</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#202124] tracking-tight">
                    Khóa học tiêu biểu
                  </h2>
                </div>
                <p className="text-[#5F6368] font-medium max-w-md">
                   Những khóa học được cộng đồng sinh viên FPT đánh giá cao nhất trong học kỳ này.
                </p>
             </motion.div>
             
             <CourseGrid courses={featuredCourses} loading={loading} />
          </div>
        </section>

        {/* [Nhẹ] Why Choose Us */}
        <WhyChooseUs />

        {/* Explorer Section (with filters) */}
        <section id="explore-section" className="py-24 bg-white scroll-mt-20">
          <div className="max-w-[1600px] mx-auto">
            <div className="px-4 sm:px-6 lg:px-8 mb-12">
               <h2 className="text-3xl md:text-4xl font-black text-[#202124] tracking-tight mb-4">
                 Tất cả khóa học
               </h2>
               <div className="h-1.5 w-20 bg-[#1A73E8] rounded-full"></div>
            </div>

            <FilterBar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />

            <div className="px-4 sm:px-6 lg:px-8 mt-12">
              <CourseGrid 
                courses={filteredCourses} 
                loading={loading} 
              />
            </div>
          </div>
        </section>

        {/* [Mạnh] Final CTA */}
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;


