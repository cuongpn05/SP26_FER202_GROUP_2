import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, BarChart3, Languages, Briefcase, Camera, BookOpen } from 'lucide-react';


const getCategoryStyle = (name) => {
  const styles = {
    'Khoa học máy tính': { icon: <Code size={32} />, color: 'bg-blue-50 text-blue-600' },
    'Tư duy lập trình': { icon: <Code size={32} />, color: 'bg-blue-50 text-blue-600' },
    'Thiết kế đồ họa': { icon: <Palette size={32} />, color: 'bg-purple-50 text-purple-600' },
    'Marketing': { icon: <BarChart3 size={32} />, color: 'bg-orange-50 text-orange-600' },
    'Ngoại ngữ': { icon: <Languages size={32} />, color: 'bg-emerald-50 text-emerald-600' },
    'Kinh tế': { icon: <Briefcase size={32} />, color: 'bg-amber-50 text-amber-600' },
    'Kỹ năng mềm': { icon: <BookOpen size={32} />, color: 'bg-rose-50 text-rose-600' },
  };
  return styles[name] || { icon: <BookOpen size={32} />, color: 'bg-gray-50 text-gray-600' };
};

const TopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3636/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-[#202124] mb-4">Danh mục nổi bật</h2>
          <p className="text-[#5F6368] font-medium max-w-xl mx-auto">
            Khám phá các lĩnh vực đang dẫn đầu xu hướng và bắt đầu hành trình của bạn.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73E8]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, index) => {
              const style = getCategoryStyle(cat.name);
              return (
                <motion.div
                  key={cat.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:bg-[#1A73E8] group-hover:shadow-2xl group-hover:shadow-[#1A73E8]/30 group-hover:border-[#1A73E8]">
                    <div className={`${style.color} p-5 rounded-2xl mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors`}>
                      {style.icon}
                    </div>
                    <h3 className="font-black text-[#202124] group-hover:text-white transition-colors mb-2 text-lg whitespace-nowrap">{cat.name}</h3>
                    {/* <p className="text-[#5F6368] text-xs font-bold group-hover:text-white/80 transition-colors uppercase tracking-tight">Khám phá ngay</p> */}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCategories;
