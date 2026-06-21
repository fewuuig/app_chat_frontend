import React, { useState } from 'react';
import { useAuthContext } from '../../stores/AuthContext';
import './LoginForm.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const { login, isLoading, error, clearError } = useAuthContext();

    const displayError = localError || error;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setLocalError(null);

        if (!email.trim()) {
            setLocalError('Vui lòng nhập email hoặc số điện thoại');
            return;
        }
        if (!password.trim()) {
            setLocalError('Vui lòng nhập mật khẩu');
            return;
        }

        try {
            await login(email, password);
        } catch (err: any) {
            setLocalError(err.message);
        }
    };

    return (
        <div className="login-card">
            <div className="login-card-header">
                <h1 className="login-title">Chào mừng trở lại</h1>
                <p className="login-subtitle">Đăng nhập để tiếp tục trò chuyện</p>
            </div>

            {displayError && (
                <div className="login-error">
                    <span className="material-symbols-outlined">error</span>
                    <span>{displayError}</span>
                </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="sr-only" htmlFor="email">Email hoặc Số điện thoại</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">mail</span>
                        <input
                            id="email"
                            type="text"
                            className="input-field"
                            placeholder="Email hoặc Số điện thoại"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); clearError(); setLocalError(null); }}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon">lock</span>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); clearError(); setLocalError(null); }}
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
                    <div className="forgot-password">
                        <a href="/forgot-password" className="forgot-link">Quên mật khẩu?</a>
                    </div>
                </div>

                <button
                    type="submit"
                    className="login-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="loading-spinner" />
                    ) : (
                        'Đăng nhập'
                    )}
                </button>
            </form>

            <div className="divider">
                <div className="divider-line" />
                <span className="divider-text">Hoặc đăng nhập với</span>
                <div className="divider-line" />
            </div>

            <div className="social-buttons">
                <button type="button" className="social-btn">
                    <svg className="social-icon" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Google</span>
                </button>
                <button type="button" className="social-btn">
                    <svg className="social-icon" fill="#1877F2" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                </button>
            </div>

            <div className="signup-prompt">
                            <p>Chưa có tài khoản? <a href="/signup" className="signup-link">Đăng ký ngay</a></p>
            </div>
        </div>
    );
};

export default LoginForm;