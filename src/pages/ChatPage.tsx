import React from 'react';
import { useAuthContext } from '../stores/AuthContext';

const ChatPage: React.FC = () => {
    const { user, logout } = useAuthContext();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            color: '#f1f5f9',
            fontFamily: 'Inter, sans-serif',
            gap: '1rem',
        }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Chat Application</h1>
            <p>Welcome, {user?.username || 'User'}!</p>
            <button
                onClick={logout}
                style={{
                    padding: '0.75rem 2rem',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    fontWeight: 600,
                }}
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default ChatPage;