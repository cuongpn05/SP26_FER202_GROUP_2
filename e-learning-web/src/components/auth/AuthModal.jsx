import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { loginUser, registerUser } from '../../api/courses';

const AuthModal = () => {
  const { isAuthModalOpen: isOpen, closeAuthModal: onClose, authMode: mode, setAuthMode: setMode, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  React.useEffect(() => {
    setFormData({
      email: '',
      password: '',
      fullName: ''
    });
    setAuthError('');
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      if (mode === 'login') {
        const normalizedEmail = formData.email.trim().toLowerCase();
        const normalizedPassword = formData.password.trim();
        const response = await fetch(
          `http://localhost:3636/users?email=${encodeURIComponent(normalizedEmail)}`
        );
        const users = await response.json();

        if (!Array.isArray(users) || users.length === 0) {
          setAuthError('Email hoac mat khau khong dung.');
          return;
        }

        const matchedUser = users.find(
          (item) =>
            String(item.email || '').toLowerCase() === normalizedEmail &&
            String(item.password || '') === normalizedPassword
        );

        if (!matchedUser) {
          setAuthError('Email hoac mat khau khong dung.');
          return;
        }

        login({
          id: String(matchedUser.id),
          email: matchedUser.email,
          name: matchedUser.name,
          role: matchedUser.role,
          avatar: matchedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(matchedUser.name || 'user')}`,
        });
        return;
      }

      login({
        id: Date.now().toString(),
        email: formData.email,
        name: formData.fullName || 'Hoc vien moi',
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NewUser',
      });
    } catch (error) {
      setAuthError('Khong the ket noi den may chu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    if (authError) setAuthError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-300">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 pb-0 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-text-main">
              {mode === 'login' ? 'Chào mừng trở lại' : 'Tham gia cùng chúng tôi'}
            </h2>
            <p className="text-sm text-text-muted">
              {mode === 'login' 
                ? 'Đăng nhập để tiếp tục hành trình học tập.' 
                : 'Bắt đầu hành trình chinh phục kiến thức ngay hôm nay.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-text-muted" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mt-6 border-b border-gray-100">
          <button
            className={`pb-3 px-4 text-sm font-semibold transition-all cursor-pointer border-b-2 ${
              mode === 'login' 
                ? 'text-primary border-primary' 
                : 'text-text-muted border-transparent hover:text-text-main'
            }`}
            onClick={() => setMode('login')}
          >
            Đăng nhập
          </button>
          <button
            className={`pb-3 px-4 text-sm font-semibold transition-all cursor-pointer border-b-2 ${
              mode === 'signup' 
                ? 'text-primary border-primary' 
                : 'text-text-muted border-transparent hover:text-text-main'
            }`}
            onClick={() => setMode('signup')}
          >
            Đăng ký
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold animate-pulse text-center">
              {authError}
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
                Họ và Tên
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                required
                placeholder="example@f-academy.edu"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Mật khẩu
              </label>
              {mode === 'login' && (
                <button type="button" className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                  Quên mật khẩu?
                </button>
              )}
            </div>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors p-1 rounded-lg cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          {authError && (
            <p className="text-sm font-semibold text-red-500 px-1">{authError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Đang xử lý...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Đăng nhập ngay' : 'Tạo tài khoản'}</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="p-6 pt-0 text-center">
          <p className="text-sm text-text-muted">
            {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="ml-1.5 text-primary font-bold hover:underline cursor-pointer"
            >
              {mode === 'login' ? 'Đăng ký miễn phí' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
