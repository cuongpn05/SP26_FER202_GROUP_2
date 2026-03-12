import React, { useState } from 'react';
import { Search, User, LogIn, Menu, X, LogOut, Settings, BookOpen, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchLocal, setSearchLocal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocal.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchLocal.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-[#1A73E8] rounded-[14px] flex items-center justify-center shadow-lg shadow-[#1A73E8]/20 transform group-hover:rotate-6 transition-all duration-300">
              <BookOpen className="text-white" size={22} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              <span className="text-[#202124]">F-</span>
              <span className="text-[#1A73E8]">Academy</span>
            </span>
          </Link>

          {/* Search Bar (Middle - Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F6368] group-focus-within:text-[#1A73E8] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Tìm khóa học, giảng viên..."
                value={searchLocal}
                onChange={(e) => setSearchLocal(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] rounded-full text-sm transition-all outline-none"
              />
            </form>
          </div>

          {/* Actions (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/explore" className="text-[#5F6368] hover:text-[#1A73E8] font-bold text-sm transition-colors px-3 py-2">
              Khám phá
            </Link>
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-1.5 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100"
                >
                  <div className="hidden lg:flex flex-col items-end mr-1">
                    <span className="text-sm font-bold text-[#1A73E8]">{user.name}</span>
                    
                  </div>
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#1A73E8]/20 shadow-sm relative">
                    <img 
                      src={user.avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1A73E8&color=fff`;
                      }}
                    />
                  </div>
                  <ChevronDown size={14} className={`text-[#5F6368] transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-xs font-bold text-[#5F6368] uppercase">Tài khoản</p>
                      <p className="text-sm font-bold text-[#202124] truncate">{user.name}</p>
                    </div>
                    <Link to="/profile" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors">
                      <User size={18} />
                      <span>Hồ sơ</span>
                    </Link>
                    {user.role !== 'admin' && (
                      <Link to="/my-courses" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-[#5F6368] hover:text-[#1A73E8] hover:bg-[#E8F0FE] transition-colors">
                        <BookOpen size={18} />
                        <span>Khóa học của tôi</span>
                      </Link>
                    )}
                    <button 
                      onClick={() => { logout(); navigate('/'); }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <button 
                  onClick={() => openAuthModal('login')}
                  className="bg-white text-[#1A73E8] border border-[#1A73E8] hover:bg-[#E8F0FE] px-5 py-2 rounded-lg font-bold text-sm transition-all"
                >
                  Đăng nhập
                </button>
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="bg-[#1A73E8] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#1557B0] transition-all shadow-lg shadow-[#1A73E8]/20"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#5F6368]">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <Link to="/explore" className="block font-bold text-[#202124]">Khám phá</Link>
          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => openAuthModal('login')} className="py-2.5 border border-[#1A73E8] text-[#1A73E8] rounded-xl font-bold">Đăng nhập</button>
              <button onClick={() => openAuthModal('signup')} className="py-2.5 bg-[#1A73E8] text-white rounded-xl font-bold">Đăng ký</button>
            </div>
          ) : (
            <button onClick={() => { logout(); navigate('/'); }} className="w-full py-2.5 text-red-500 font-bold">Đăng xuất</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


