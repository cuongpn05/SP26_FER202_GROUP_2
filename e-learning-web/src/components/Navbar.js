import React, { useState } from 'react';
import { Search, Bell, Menu, LogOut, Settings, User as UserIcon, BookOpen, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openAuth = (mode) => {
    openAuthModal(mode);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-text-main tracking-tight">
              F-<span className="text-primary">Academy</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Tìm khóa học, giảng viên..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none transition-all text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 text-[10px] font-bold text-text-muted px-1.5 py-0.5 rounded border border-gray-300">
                ⌘ K
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button className="p-2.5 text-text-muted hover:text-primary hover:bg-primary-light rounded-xl transition-all relative cursor-pointer">
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 pl-2 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-pointer"
                  >
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-text-main leading-none">{user.name}</p>
                      <p className="text-[10px] text-text-muted leading-tight mt-0.5">Học viên Premium</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/20 p-0.5">
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <ChevronDown size={14} className={`text-text-muted transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 py-2 animate-fade-in overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Tài khoản</p>
                        <p className="text-sm font-semibold text-text-main truncate mt-0.5">{user.email}</p>
                      </div>
                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-text-muted hover:text-primary hover:bg-primary-light transition-colors cursor-pointer text-left">
                        <UserIcon size={18} />
                        <span>Hồ sơ của tôi</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-text-muted hover:text-primary hover:bg-primary-light transition-colors cursor-pointer text-left">
                        <Settings size={18} />
                        <span>Cài đặt</span>
                      </button>
                      <div className="h-px bg-gray-50 my-1"></div>
                      <button 
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <LogOut size={18} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openAuth('login')}
                  className="px-5 py-2.5 text-sm font-bold text-text-main hover:text-primary transition-colors cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button 
                  onClick={() => openAuth('signup')}
                  className="px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Tham gia ngay
                </button>
              </div>
            )}
            
            <button className="md:hidden p-2 text-text-main hover:bg-gray-100 rounded-xl cursor-pointer">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
