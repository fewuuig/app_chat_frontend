import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './SignupForm.css';

const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        displayName: '',
        email: '',
        phone: '',
        sex: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.username.trim()) { setError('Vui lòng nhập tên đăng nhập'); return; }
        if (!formData.displayName.trim()) { setError('Vui lòng nhập tên hiển thị'); return; }
        if (!formData.email.trim()) { setError('Vui lòng nhập email'); return; }
        if (!formData.sex) { setError('Vui lòng chọn giới tính'); return; }
        if (!formData.password.trim()) { setError('Vui lòng nhập mật khẩu'); return; }
        if (formData.password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự'); return; }

        setIsLoading(true);
        try {
            const sexBoolean = formData.sex === 'male';
            const result = await authService.signup({
                username: formData.username.trim(),
                displayName: formData.displayName.trim(),
                email: formData.email.trim(),
                password: formData.password,
                sex: sexBoolean,
            });
            setSuccess(result.message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
        } catch (err: any) {
            setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="signup-card">
                <div className="signup-card-header">
                    <div className="success-icon">
                        <span className="material-symbols-outlined">mark_email_read</span>
                    </div>
                    <h1 className="signup-title">Đăng ký thành công!</h1>
                    <p className="signup-subtitle">{success}</p>
                    <button
                        className="signup-button"
                        onClick={() => navigate('/auth')}
                        style={{ marginTop: '1rem' }}
                    >
                        Quay lại đăng nhập
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="signup-card">
            <div className="signup-card-header">
                <h1 className="signup-title">Tạo tài khoản mới</h1>
                <p className="signup-subtitle">Tham gia để kết nối tức thì</p>
            </div>

            {error && (
                <div className="signup-error">
                    <span className="material-symbols-outlined">error</span>
                    <span>{error}</span>
                </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="input-group">
                    <label className="sr-only" htmlFor="signup-username">Tên đăng nhập</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">person</span>
                        <input
                            id="signup-username"
                            name="username"
                            type="text"
                            className="input-field"
                            placeholder="Tên đăng nhập"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Display Name */}
                <div className="input-group">
                    <label className="sr-only" htmlFor="displayName">Tên hiển thị</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">badge</span>
                        <input
                            id="displayName"
                            name="displayName"
                            type="text"
                            className="input-field"
                            placeholder="Tên hiển thị"
                            value={formData.displayName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="input-group">
                    <label className="sr-only" htmlFor="signup-email">Email</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">mail</span>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            className="input-field"
                            placeholder="Địa chỉ Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="input-group">
                    <label className="sr-only" htmlFor="phone">Số điện thoại</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">phone</span>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="input-field"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Sex Dropdown */}
                <div className="input-group">
                    <label className="sr-only" htmlFor="sex">Giới tính</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">wc</span>
                        <select
                            id="sex"
                            name="sex"
                            className="input-field select-field"
                            value={formData.sex}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                        <span className="material-symbols-outlined select-arrow">expand_more</span>
                    </div>
                </div>

                {/* Password */}
                <div className="input-group">
                    <label className="sr-only" htmlFor="signup-password">Mật khẩu</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">lock</span>
                        <input
                            id="signup-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                            <span className="material-symbols-outlined">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="signup-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading-spinner" />
                    ) : (
                        'Đăng ký'
                    )}
                </button>
            </form>

            <div className="signup-prompt">
                <p>Đã có tài khoản? <a href="/auth" className="login-link">Đăng nhập</a></p>
            </div>
        </div>
    );
};

export default SignupForm;