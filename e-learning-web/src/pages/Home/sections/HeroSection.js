import React from 'react';
import { motion } from 'framer-motion';
import { Play, Search, ArrowRight, Star } from 'lucide-react';

const HeroSection = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";
  };

  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#E8F0FE] overflow-hidden py-20">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/40 rounded-full -mr-40 -mt-40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1A73E8]/5 rounded-full -ml-20 -mb-20 blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-[#1A73E8]/10 text-[#1A73E8] px-4 py-2 rounded-full mb-8 border border-[#1A73E8]/20">
               <span className="w-2 h-2 rounded-full bg-[#1A73E8] animate-ping" />
               <span className="text-xs font-black uppercase tracking-widest">FPT Education Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#202124] leading-[1.1] mb-8 tracking-tight">
              Nâng tầm kiến thức <br />
              <span className="text-[#1A73E8]">Vững bước tương lai</span>
            </h1>

            <p className="text-lg md:text-xl text-[#5F6368] font-medium mb-10 max-w-2xl leading-relaxed">
              Khám phá hơn 500+ khóa học thực chiến từ các chuyên gia hàng đầu. Học mọi lúc, mọi nơi, trên mọi thiết bị.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onSearch}
                className="w-full sm:w-auto bg-[#1A73E8] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#1557B0] transition-all shadow-xl shadow-[#1A73E8]/20 flex items-center justify-center space-x-3 group"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-3 px-6 py-4">
                 <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <img 
                        key={i}
                        src={`https://i.pravatar.cc/150?img=${i+10}`} 
                        className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                        alt="student"
                      />
                    ))}
                 </div>
                 <div>
                    <div className="flex text-amber-500">
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                       <Star size={16} fill="currentColor" />
                    </div>
                    <p className="text-sm font-bold text-[#202124]">4.9/5 (15k+ Reviews)</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image/Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative z-10">
               <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-4 rounded-[4rem] shadow-2xl overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" 
                    alt="Student with laptop" 
                    onError={handleImageError}
                    className="w-full h-full object-cover rounded-[3.5rem]"
                  />
               </div>

               {/* Floating elements */}
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl flex items-center space-x-4 z-20 border border-[#1A73E8]/10"
               >
                  <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                     <Play size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#202124]">2.4k+ Video</h4>
                    <p className="text-xs font-bold text-[#5F6368] uppercase">Chất lượng 4K</p>
                  </div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 20, 0] }}
                 transition={{ repeat: Infinity, duration: 5 }}
                 className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center space-x-4 z-20 border border-[#1A73E8]/10"
               >
                  <div className="bg-blue-100 p-3 rounded-2xl text-[#1A73E8]">
                     <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#202124]">Cấp chứng chỉ</h4>
                    <p className="text-xs font-bold text-[#5F6368] uppercase">Sau mỗi khóa học</p>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


