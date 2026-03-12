import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { updateUserProfile, getUserProfile, changePassword } from '../../api/courses';
import { User, Mail, Calendar, Lock, BookOpen, Save, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const ProfileSettings = () => {
  const { user: authUser, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    birthDate: '',
    avatar: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // Gọi trực tiếp đến API endpoint để lấy dữ liệu mới nhất
      if (!authUser?.id) return;
      try {
        setFetching(true);
        // Sử dụng fetch API truyền thống để làm rõ ràng việc lấy data từ link trực tiếp
        const apiUrl = `http://localhost:3636/users/${authUser.id}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        if (userData) {
          setFormData(prev => ({
            ...prev,
            name: userData.name || '',
            email: userData.email || '',
            role: userData.role || '',
            bio: userData.bio || '',
            birthDate: userData.birthDate || '',
            avatar: userData.avatar || ''
          }));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng từ link trực tiếp:", error);
        setStatus({ type: 'error', message: 'Không thể kết nối với API (Port 3636)' });
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [authUser?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Validation tên không được để trống
    if (!formData.name || formData.name.trim() === '') {
      setStatus({ type: 'error', message: 'Họ và tên không được để trống.' });
      setLoading(false);
      return;
    }

    // Validation ngày sinh
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      
      // Tính tuổi
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (birthDate > today) {
        setStatus({ type: 'error', message: 'Ngày sinh không được vượt quá ngày hiện tại.' });
        setLoading(false);
        return;
      }

      if (age < 5) {
        setStatus({ type: 'error', message: 'Bạn phải ít nhất 5 tuổi để tham gia.' });
        setLoading(false);
        return;
      }

      if (age >= 199) {
        setStatus({ type: 'error', message: 'Vui lòng kiểm tra lại năm sinh (phải nhỏ hơn 199 tuổi).' });
        setLoading(false);
        return;
      }
    }

    try {
      const updateData = {
        name: formData.name,
        bio: formData.bio,
        birthDate: formData.birthDate
      };
      
      const response = await updateUserProfile(authUser.id, updateData);
      
      if (response.status === 200) {
        // Cập nhật state local và context
        const updatedUser = { ...authUser, ...updateData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        login(updatedUser); 
        setStatus({ type: 'success', message: 'Cập nhật thông tin lên API thành công!' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Lỗi khi cập nhật dữ liệu vào db.json.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validation mật khẩu
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setStatus({ type: 'password-error', message: 'Vui lòng điền đầy đủ tất cả các trường mật khẩu.' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'password-error', message: 'Mật khẩu mới không khớp.' });
      return;
    }

    if (formData.newPassword.length < 6) {
      setStatus({ type: 'password-error', message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
      return;
    }
    
    setLoading(true);
    try {
      // Gọi API PATCH để cập nhật mật khẩu trong db.json
      await changePassword(authUser.id, formData.newPassword);
      setStatus({ type: 'password-success', message: 'Đổi mật khẩu trên hệ thống thành công!' });
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      setStatus({ type: 'password-error', message: 'Lỗi khi đổi mật khẩu trên hệ thống.' });
    } finally {
      setLoading(false);
    }
  };

  if (!authUser) return <div className="text-center p-10">Vui lòng đăng nhập để xem trang này.</div>;

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-medium italic">Đang tải dữ liệu hồ sơ...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-h-[700px] flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 md:p-14 text-white relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 text-4xl font-bold overflow-hidden shadow-inner">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt={formData.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentNode.innerHTML = formData.name.charAt(0);
                    }}
                  />
                ) : (
                  formData.name ? formData.name.charAt(0) : <User size={40} />
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full shadow-lg">
                <Sparkles size={16} className="animate-pulse" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{formData.name}</h1>
              <p className="opacity-90 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Mail size={16} /> {formData.email}
              </p>
              <span className="inline-block mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm uppercase tracking-wide">
                {formData.role === 'student' ? 'Học viên' : (formData.role === 'instructor' ? 'Giảng viên' : formData.role)}
              </span>
              
              <div className="mt-8">
                <Link 
                  to="/my-courses"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-all hover:bg-blue-50"
                >
                  <BookOpen size={20} />
                  Khóa học của tôi
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 flex-grow divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="md:col-span-2 p-10 md:p-14 space-y-10">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="text-blue-600" size={24} />
                Thông tin cá nhân
              </h2>
              
              <form onSubmit={handleUpdateInfo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Ngày sinh</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Giới thiệu bản thân</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Chia sẻ một chút về bạn..."
                    ></textarea>
                  </div>
                </div>

                {status.type.includes('success') && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm">
                    <CheckCircle2 size={18} /> {status.message}
                  </div>
                )}
                {status.type.includes('error') && !status.type.includes('password') && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                    <AlertCircle size={18} /> {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
                >
                   {loading ? 'Đang lưu...' : <><Save size={18}/> Lưu thay đổi</>}
                </button>
              </form>
            </section>
          </div>

          <div className="p-10 md:p-14 bg-gray-50/50">
            <section className="space-y-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Lock className="text-blue-600" size={24} />
                Đổi mật khẩu
              </h2>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mật khẩu mới</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {status.type === 'password-success' && (
                  <div className="text-green-600 text-xs mt-2">{status.message}</div>
                )}
                {status.type === 'password-error' && (
                  <div className="text-red-600 text-xs mt-2">{status.message}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-gray-200 transition-all shadow-sm disabled:opacity-50"
                >
                  Cập nhật mật khẩu
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;