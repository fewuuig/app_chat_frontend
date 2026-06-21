import React from 'react';
import { useAuthContext } from '../../stores/AuthContext';
import { useTheme } from '../../stores/ThemeContext';

interface SettingsModalProps {
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { user, logout } = useAuthContext();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={e => e.stopPropagation()}>
                <div className="settings-header">
                    <div className="settings-avatar-section">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqEMVKrKAXNDbl9dGdv14cQMVVFrB6-kulRcnNbdaVopS4ktqfTVlSDvnjTZm308Cd6j24egAsUOX1-YOK4GLBJOC7Xf0CtzWDZi75g-QWlC9cS0mbPuc5E72mzIOTm4xdEZ2ClvvtlsM2Xl0WgSFtJU7WUl3iiGVHB8A7lozxLfcCUBc2GlbPWVKWhhmydZcZrto9oqOvk-qsndSF1qUEXFHUhpaRgr_gH0B7EEChmns5jlErb1Oonfj5pCm6wLY0mKLccHKRdPv3"
                            alt={user?.username || 'User'}
                            className="settings-avatar"
                        />
                        <div className="online-dot-lg" />
                    </div>
                    <h2 className="settings-name">{user?.username || 'User'}</h2>
                    <span className="settings-status">Đang hoạt động</span>
                </div>

                <div className="settings-body">
                    <button className="settings-item">
                        <span className="material-symbols-outlined settings-item-icon primary">person</span>
                        <span className="settings-item-label">Thông tin cá nhân</span>
                    </button>
                    <button className="settings-item">
                        <span className="material-symbols-outlined settings-item-icon">settings</span>
                        <span className="settings-item-label">Cài đặt tài khoản</span>
                    </button>
                    <button className="settings-item" onClick={toggleTheme}>
                        <span className="material-symbols-outlined settings-item-icon">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                        <span className="settings-item-label">
                            {theme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
                        </span>
                        <span className="settings-item-badge">{theme === 'dark' ? '🌙' : '☀️'}</span>
                    </button>

                    <div className="settings-divider" />

                    <button className="settings-item danger" onClick={logout}>
                        <span className="material-symbols-outlined settings-item-icon">logout</span>
                        <span className="settings-item-label">Đăng xuất</span>
                    </button>
                </div>

                <div className="settings-footer">
                    <button className="settings-close-btn" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;