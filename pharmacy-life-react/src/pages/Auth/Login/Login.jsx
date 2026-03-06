import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white py-4 px-3" style={{
      backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(13, 110, 253, 0.03) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(13, 110, 253, 0.03) 0%, transparent 50%)'
    }}>
      <div className="container-fluid py-2">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-lg-10 col-xl-11 col-xxl-10">
            <div className="card shadow-2xl border-0 rounded-4 overflow-hidden position-relative" style={{ minHeight: '85vh' }}>
              {/* Trang trí phía trên */}
              <div className="position-absolute top-0 start-0 w-100 h-1 bg-primary" style={{ zIndex: 10 }}></div>
              
              <div className="row g-0 h-100" style={{ minHeight: '85vh' }}>
                {/* Phần bên trái - Chỉnh chu, tối giản */}
                <div className="col-lg-6 d-none d-lg-block position-relative overflow-hidden">
                  <div className="h-100 w-100 position-absolute" style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dad99901?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)'
                  }}></div>
                  <div className="position-relative h-100 d-flex flex-column align-items-center justify-content-center p-5 text-white bg-primary bg-opacity-20 text-center">
                    {/* Các khối trang trí hình học */}
                    <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: -1 }}>
                      <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: '300px', height: '300px', top: '-100px', left: '-100px' }}></div>
                      <div className="position-absolute rounded-circle bg-info opacity-10" style={{ width: '400px', height: '400px', bottom: '-150px', right: '-150px' }}></div>
                      <div className="position-absolute bg-white opacity-5" style={{ width: '100%', height: '1px', top: '25%', transform: 'rotate(-15deg)' }}></div>
                      <div className="position-absolute bg-white opacity-5" style={{ width: '100%', height: '1px', top: '75%', transform: 'rotate(15deg)' }}></div>
                    </div>

                    <div className="mt-n5"> {/* Chỉnh dời nội dung lên trên */}
                      <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg mb-4" style={{ width: '100px', height: '100px' }}>
                        <i className="bi bi-capsule-pill display-3 text-primary"></i>
                      </div>
                      
                      <h1 className="fw-black mb-1 display-3 text-uppercase tracking-tighter" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
                        Pharmacy<span className="text-info">Life</span>
                      </h1>
                      
                      <div className="bg-info rounded-pill mx-auto mb-4 shadow-sm" style={{ width: '60px', height: '4px' }}></div>
                      
                      <p className="lead fs-4 fw-medium mb-5 opacity-90 px-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)', lineHeight: '1.4' }}>
                        Quản lý dược phẩm thông minh, chính xác và hiệu quả cho nhà thuốc của bạn.
                      </p>

                      <div className="d-flex justify-content-center gap-4 mt-4">
                        <div className="text-center opacity-90 transition-all hover-scale">
                            <div className="bg-white bg-opacity-20 rounded-circle p-3 mb-2 mx-auto d-flex align-items-center justify-content-center border border-white border-opacity-25 shadow-sm" style={{ width: '60px', height: '60px' }}>
                                <i className="bi bi-award fs-3 text-info"></i>
                            </div>
                            <span className="fw-bold x-small letter-spacing-1 text-uppercase d-block" style={{ fontSize: '0.65rem' }}>GPP CERTIFIED</span>
                        </div>
                        <div className="text-center opacity-90 transition-all hover-scale">
                            <div className="bg-white bg-opacity-20 rounded-circle p-3 mb-2 mx-auto d-flex align-items-center justify-content-center border border-white border-opacity-25 shadow-sm" style={{ width: '60px', height: '60px' }}>
                                <i className="bi bi-patch-check fs-3 text-info"></i>
                            </div>
                            <span className="fw-bold x-small letter-spacing-1 text-uppercase d-block" style={{ fontSize: '0.65rem' }}>GMP STANDARD</span>
                        </div>
                        <div className="text-center opacity-90 transition-all hover-scale">
                            <div className="bg-white bg-opacity-20 rounded-circle p-3 mb-2 mx-auto d-flex align-items-center justify-content-center border border-white border-opacity-25 shadow-sm" style={{ width: '60px', height: '60px' }}>
                                <i className="bi bi-shield-check fs-3 text-info"></i>
                            </div>
                            <span className="fw-bold x-small letter-spacing-1 text-uppercase d-block" style={{ fontSize: '0.65rem' }}>FDA COMPLIANT</span>
                        </div>
                      </div>
                    </div>

                    <div className="position-absolute bottom-0 mb-5 w-100 px-5 text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2 opacity-75 border-top border-white border-opacity-10 pt-4">
                        <i className="bi bi-shield-lock-fill fs-5"></i>
                        <span className="small fw-semibold letter-spacing-1 text-uppercase" style={{ fontSize: '0.75rem' }}>Hệ thống bảo mật quốc tế SSL/256bit</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phần bên phải - Form đăng nhập */}
                <div className="col-12 col-lg-6 bg-white d-flex align-items-center justify-content-center py-5">
                  <div className="w-100 px-4 px-md-5" style={{ maxWidth: '520px' }}>
                    {/* Logo & Header (Mobile) */}
                    <div className="text-center mb-5 d-lg-none">
                      <div className="bg-primary bg-gradient rounded-4 d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: '70px', height: '70px' }}>
                        <LogIn size={30} className="text-white" />
                      </div>
                      <h1 className="fw-black text-dark mb-2 display-6">Pharmacy<span className="text-primary font-italic">Life</span></h1>
                    </div>
                    
                    {/* Header (Desktop) */}
                    <div className="text-start mb-5 d-none d-lg-block">
                      <h2 className="fw-black text-dark mb-2 display-5">Đăng Nhập</h2>
                      <p className="text-muted lead fs-6">Chào mừng bạn trở lại hệ thống quản lý.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      {/* Email Field */}
                      <div className="mb-4">
                        <label className="form-label small fw-bold text-uppercase tracking-wider text-secondary mb-2">Địa chỉ Email</label>
                        <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                          <span className="input-group-text bg-light border-0 text-muted px-4">
                            <Mail size={20} />
                          </span>
                          <input
                            type="email"
                            className="form-control bg-light border-0 ps-0 fs-6 py-3"
                            placeholder="yourname@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ boxShadow: 'none' }}
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <label className="form-label small fw-bold text-uppercase tracking-wider text-secondary">Mật khẩu</label>
                          <a href="#" className="text-primary small text-decoration-none fw-bold hover-underline">Quên mật khẩu?</a>
                        </div>
                        <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden">
                          <span className="input-group-text bg-light border-0 text-muted px-4">
                            <Lock size={20} />
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control bg-light border-0 ps-0 fs-6 py-3"
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ boxShadow: 'none' }}
                          />
                          <button
                            className="input-group-text bg-light border-0 text-muted px-3"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>

                      {/* Remember Me */}
                      <div className="mb-4 d-flex align-items-center">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="rememberMe" style={{ width: '2.5em' }} />
                          <label className="form-check-label small text-muted ms-2 cursor-pointer" htmlFor="rememberMe">
                            Duy trì đăng nhập trên thiết bị này
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-primary btn-lg w-100 py-3 rounded-3 fw-bold mb-4 shadow transform-hover-up d-flex align-items-center justify-content-center gap-2">
                        <span>Đăng nhập ngay</span>
                        <LogIn size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .transform-hover-up:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2) !important;
          transition: all 0.3s ease;
        }
        .hover-underline:hover {
          text-decoration: underline !important;
        }
        .fw-black { font-weight: 900; }
        .tracking-wider { letter-spacing: 0.05em; }
        .backdrop-blur { backdrop-filter: blur(8px); }
        .backdrop-blur-sm { backdrop-filter: blur(4px); }
        .transition-all { transition: all 0.3s ease; }
        .hover-scale:hover { transform: scale(1.1); opacity: 1 !important; }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .hover-bg-primary:hover { background-color: rgba(13, 110, 253, 0.3) !important; }
        .letter-spacing-1 { letter-spacing: 1px; }
      `}</style>
    </div>
  );
};

export default Login;
