import React from 'react';
import { Search, MapPin, Play, Clock, Users, Globe } from 'lucide-react';

const HeroSection = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="relative bg-[#F37021] text-white overflow-hidden py-16 lg:py-24 rounded-3xl shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-white/20 rounded-full blur-2xl"></div>
      
      {/* Floating UI Elements for aesthetic */}
      <div className="hidden xl:block absolute top-12 right-[15%] glass-card p-4 animate-bounce duration-[3000ms]">
        <div className="flex items-center space-x-3 text-text-main">
          <div className="bg-primary/10 p-2 rounded-lg">
             <Globe size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-text-muted font-bold uppercase">Học viên toàn quốc</p>
            <p className="text-sm font-extrabold font-sans">15,000+ Students</p>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute bottom-20 left-[10%] glass-card p-4 animate-pulse duration-[4000ms]">
        <div className="flex items-center space-x-3 text-text-main">
          <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
             <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] text-text-muted font-bold uppercase">Truy cập trọn đời</p>
            <p className="text-sm font-extrabold font-sans">Lifetime Access</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Badge */}
        <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/30 flex items-center space-x-2 animate-fade-in group cursor-default">
           <span className="w-2 h-2 rounded-full bg-white group-hover:bg-primary-light transition-colors" />
           <span className="text-xs font-bold font-sans uppercase tracking-[0.2em]">FPT Education</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-center mb-6 leading-tight max-w-4xl tracking-tight drop-shadow-lg font-sans">
          F-Academy: <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-100">Kiến tạo tương lai số</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-orange-50 font-medium mb-12 text-center max-w-2xl opacity-90 leading-relaxed font-sans">
          Nền tảng học trực tuyến chất lượng cao dành riêng cho sinh viên FPT. Học từ giảng viên hàng đầu, thực chiến dự án thực tế.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl transform hover:scale-[1.01] transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-3 flex flex-col md:row space-y-3 sm:space-y-0 sm:flex-row items-center border border-white/50 backdrop-blur-xl bg-white/95">
            <div className="flex-1 w-full relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-primary-dark transition-colors" size={24} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Khóa học bạn đang tìm kiếm là gì?"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-text-main placeholder-text-muted/60 text-lg transition-all focus:ring-0 outline-none hover:bg-gray-50/50"
              />
            </div>
            <button className="w-full sm:w-auto btn-primary py-4 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40">
              Tìm kiếm ngay
            </button>
          </div>
        </div>

        {/* Sub-stats or trust signals can go here if needed */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-12 text-white/90">
           <div className="flex items-center space-x-2">
              <Play size={20} className="text-white fill-white/20" />
              <span className="font-bold text-sm">200+ Khóa học</span>
           </div>
           <div className="flex items-center space-x-2 border-l border-white/20 pl-6 sm:pl-12">
              <Users size={20} className="text-white fill-white/20" />
              <span className="font-bold text-sm">50+ Giảng viên SE</span>
           </div>
           <div className="flex items-center space-x-2 border-l border-white/20 pl-6 sm:pl-12">
              <MapPin size={20} className="text-white fill-white/20" />
              <span className="font-bold text-sm">FPT Courtyard</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
