import React from 'react';
import { Star, ChevronRight, User } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="group bg-white rounded-xl shadow-premium hover:shadow-premium-hover overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full animate-fade-in cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          {course.category}
        </div>
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 rounded">
          {course.level}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-main line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[3.5rem]">
          {course.title}
        </h3>
        
        <div className="flex items-center mt-3 text-text-muted text-sm space-x-2">
          <User size={14} className="text-primary" />
          <span className="font-medium">{course.instructor}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(course.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(course.rating) ? "text-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs font-bold ml-1.5 text-text-main">{course.rating}</span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-text-muted font-bold tracking-tighter">Giá khóa học</span>
            <span className="text-lg font-extrabold text-primary">
              {(course.price).toLocaleString('vi-VN')}đ
            </span>
          </div>
          <button className="flex items-center space-x-1 btn-primary py-2 px-3 text-sm font-semibold group-hover:bg-primary-dark shadow-md">
            <span>Chi tiết</span>
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
