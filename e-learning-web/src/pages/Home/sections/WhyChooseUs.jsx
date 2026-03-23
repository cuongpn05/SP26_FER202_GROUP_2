import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="text-[#1A73E8]" size={24} />,
      title: "Lộ trình chuẩn FPT",
      description: "Nội dung được thẩm định bởi các chuyên gia học thuật hàng đầu tại FPT Education."
    },
    {
      icon: <Zap className="text-[#1A73E8]" size={24} />,
      title: "Học cùng chuyên gia",
      description: "Tương tác trực tiếp với các giảng viên là chuyên gia đang làm việc tại tập đoàn FPT."
    },
    {
      icon: <Award className="text-[#1A73E8]" size={24} />,
      title: "Cấp chứng chỉ uy tín",
      description: "Nhận chứng chỉ hoàn thành khóa học có giá trị cao trong hệ sinh thái FPT."
    }
  ];

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";
  };

  return (
    <section className="py-24 bg-[#E8F0FE]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240682705-011c341352e8?w=800&q=80" 
                alt="FPT Students" 
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1A73E8]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/50 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-5xl font-black text-[#202124] mb-8 leading-tight">
              Tại sao hàng nghìn sinh viên chọn F-Academy?
            </h2>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-50 hover:shadow-xl transition-shadow group"
                >
                  <div className="bg-[#E8F0FE] p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#202124] mb-2">{benefit.title}</h3>
                    <p className="text-[#5F6368] font-medium leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
