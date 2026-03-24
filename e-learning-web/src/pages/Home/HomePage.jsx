import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import StatsStrip from './sections/StatsStrip';
import TopCategories from './sections/TopCategories';
import WhyChooseUs from './sections/WhyChooseUs';
import InstructorsSection from './sections/InstructorsSection';
import CourseGrid from '../../components/common/CourseGrid';
import { getCourses } from '../../api/courses';

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filtering
  const [searchQuery, setSearchQuery] = useState('');

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
      .slice(0, 6);
  }, [courses]);

  const handleSearch = () => {
    navigate('/explore');
  };

  return (
    <div className="min-h-screen bg-white font-body selection:bg-[#1A73E8]/20 selection:text-[#1A73E8] overflow-x-hidden">
      <main className="w-full">
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />

        <StatsStrip />

        <TopCategories />

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
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2 text-[#1A73E8] font-black text-lg hover:translate-x-1 transition-all group"
                >
                  <span>Xem tất cả</span>
                  <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <CourseGrid
              courses={featuredCourses}
              loading={loading}
              columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-6"
              skeletonCount={6}
            />
          </div>
        </section>


        <WhyChooseUs />


        <InstructorsSection />



      </main>
    </div>
  );
};

export default HomePage;


