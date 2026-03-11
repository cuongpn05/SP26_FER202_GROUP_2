import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 decoration-transparent">
              <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black text-text-main tracking-tight">
                F-<span className="text-primary">Academy</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Nền tảng học trực tuyến hàng đầu, giúp bạn chinh phục đỉnh cao tri thức với đội ngũ giảng viên giàu kinh nghiệm.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-50 text-text-muted hover:text-primary hover:bg-primary-light rounded-lg transition-all cursor-pointer">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-text-muted hover:text-primary hover:bg-primary-light rounded-lg transition-all cursor-pointer">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-text-muted hover:text-primary hover:bg-primary-light rounded-lg transition-all cursor-pointer">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-text-muted hover:text-primary hover:bg-primary-light rounded-lg transition-all cursor-pointer">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-main font-bold mb-6">Về chúng tôi</h4>
            <ul className="space-y-4">
              {['Giới thiệu', 'Tác giả', 'Công việc', 'Blog', 'Liên hệ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-all cursor-pointer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-text-main font-bold mb-6">Khóa học</h4>
            <ul className="space-y-4">
              {['Lập trình', 'Thiết kế đồ họa', 'Marketing Online', 'Kỹ năng mềm', 'Kinh doanh'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-all cursor-pointer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-text-main font-bold mb-6">Thông tin liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-text-muted text-sm">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Số 123, Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-3 text-text-muted text-sm">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+84 (123) 456 789</span>
              </li>
              <li className="flex items-center space-x-3 text-text-muted text-sm">
                <Mail className="text-primary shrink-0" size={18} />
                <span>support@f-academy.edu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-text-muted text-xs">
            © {currentYear} F-Academy. Bảo lưu mọi quyền.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-text-muted text-xs hover:text-primary transition-colors cursor-pointer">Chính sách bảo mật</a>
            <a href="#" className="text-text-muted text-xs hover:text-primary transition-colors cursor-pointer">Điều khoản dịch vụ</a>
            <a href="#" className="text-text-muted text-xs hover:text-primary transition-colors cursor-pointer">Chính sách Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
