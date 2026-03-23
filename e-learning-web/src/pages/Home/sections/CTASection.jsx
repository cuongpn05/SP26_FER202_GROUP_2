import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-[#1A73E8] rounded-[3rem] p-12 lg:p-20 relative overflow-hidden group shadow-2xl shadow-[#1A73E8]/30"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-[250px] -mt-[250px] blur-[100px] group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full -ml-[150px] -mb-[150px] blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="bg-white/20 p-4 rounded-2xl mb-8 backdrop-blur-md"
          >
            <Sparkles className="text-white" size={40} />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight max-w-4xl">
            Sẵn sàng để trở thành phiên bản tốt hơn của chính mình?
          </h2>
          
          <p className="text-blue-100 text-xl font-medium mb-12 max-w-2xl leading-relaxed">
            Đăng ký tài khoản ngay hôm nay để nhận ưu đãi lên đến <span className="text-white font-black underline decoration-2 underline-offset-4">50%</span> cho khóa học đầu tiên.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-white text-[#1A73E8] px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center justify-center space-x-3">
              <span>Đăng ký ngay</span>
              <MousePointer2 size={24} />
            </button>
            <button className="bg-[#1A73E8] text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
