import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, BookOpen } from 'lucide-react';

const instructors = [
  {
    name: "Trần Anh Quân",
    role: "Senior Fullstack Developer",
    courses: 12,
    students: "4,500+",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=11",
    bio: "Chuyên gia với 10 năm kinh nghiệm tại các tập đoàn công nghệ lớn."
  },
  {
    name: "Nguyễn Minh Hằng",
    role: "Economics Expert",
    courses: 8,
    students: "3,200+",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=5",
    bio: "Giảng viên tâm huyết với cách tiếp cận kiến thức kinh tế đầy thú vị."
  },
  {
    name: "Phạm Gia Bảo",
    role: "Creative Director",
    courses: 15,
    students: "6,000+",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=12",
    bio: "Phù thủy thiết kế với những sản phẩm đạt giải thưởng quốc tế."
  },
  {
    name: "Vương Thế Hải",
    role: "Cyber Security Specialist",
    courses: 10,
    students: "2,800+",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=13",
    bio: "Chuyên gia bảo mật hàng đầu, luôn cập nhật các xu hướng phòng thủ mới nhất."
  }
];

const InstructorsSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#1A73E8]/5 rounded-full blur-3xl -ml-32"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -mr-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-[#E8F0FE] text-[#1A73E8] px-4 py-2 rounded-full mb-4">
            <Award size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Đội ngũ chuyên gia</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#202124] tracking-tight mb-4">
            Học từ <span className="text-[#1A73E8]">những người giỏi nhất</span>
          </h2>
          <p className="text-[#5F6368] font-medium max-w-2xl mx-auto">
            Giảng viên của chúng tôi là các chuyên gia đầu ngành, luôn sẵn sàng chia sẻ kinh nghiệm thực chiến và dẫn dắt bạn đi đến thành công.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#1A73E8]/10 transition-all duration-500"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-3xl overflow-hidden border-4 border-[#E8F0FE] group-hover:border-[#1A73E8]/20 transition-colors duration-500">
                  <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-[#202124]">{instructor.rating}</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-black text-[#202124] group-hover:text-[#1A73E8] transition-colors">{instructor.name}</h3>
                <p className="text-sm font-bold text-[#5F6368] mt-1">{instructor.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[#1A73E8] mb-1">
                    <BookOpen size={16} />
                    <span className="text-sm font-black">{instructor.courses}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Khóa học</p>
                </div>
                <div className="text-center border-l border-gray-50">
                  <div className="flex items-center justify-center gap-1.5 text-[#1A73E8] mb-1">
                    <Users size={16} />
                    <span className="text-sm font-black">{instructor.students}</span>
                  </div>
                  <p className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Học viên</p>
                </div>
              </div>

              <p className="text-sm text-[#5F6368] text-center leading-relaxed italic line-clamp-2">
                "{instructor.bio}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
