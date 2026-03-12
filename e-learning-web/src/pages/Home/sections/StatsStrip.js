import React from 'react';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsStrip = () => {
  const stats = [
    {
      icon: <Users size={24} />,
      label: "Học viên",
      value: "10,000+",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <BookOpen size={24} />,
      label: "Khóa học",
      value: "500+",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      icon: <GraduationCap size={24} />,
      label: "Giảng viên",
      value: "100+",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: <Award size={24} />,
      label: "Chứng chỉ",
      value: "5,000+",
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="w-full bg-white py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-black text-[#202124] tracking-tight">{stat.value}</h3>
              <p className="text-[#5F6368] text-sm font-bold uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsStrip;
