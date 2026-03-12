import React from 'react';
import { Star, User, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1541462608141-ad60397d4bc7?q=80&w=2070&auto=format&fit=crop";
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <Link 
      to={`/course/${course.id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          onError={handleImageError}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#1A73E8] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg">
            {course.category || 'Course'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center space-x-1 text-[#FABB05] mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              fill={i < Math.floor(course.rating) ? "currentColor" : "none"} 
              className={i < Math.floor(course.rating) ? "" : "text-gray-300"}
            />
          ))}
          <span className="text-[11px] font-bold text-[#5F6368] ml-1">({course.rating})</span>
        </div>

        <h3 className="text-[#202124] font-black text-lg mb-2 leading-snug group-hover:text-[#1A73E8] transition-colors line-clamp-2">
          {course.title}
        </h3>

        <div className="flex items-center space-x-2 text-[#5F6368] text-xs font-medium mb-4">
          <div className="bg-gray-100 p-1.5 rounded-full">
            <User size={14} />
          </div>
          <span>{course.instructor}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-[10px] text-[#5F6368] font-bold uppercase tracking-tight">Giá khóa học</span>
             <span className="text-[#1A73E8] font-black text-xl">
               {course.price.toLocaleString('vi-VN')}đ
             </span>
          </div>
          <div className="bg-[#E8F0FE] p-2 rounded-xl text-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white transition-all">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(CourseCard);
