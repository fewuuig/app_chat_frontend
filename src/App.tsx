import React from 'react';
import { AuthProvider, useAuthContext } from './stores/AuthContext';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0f172a',
                color: '#f1f5f9',
            }}>
                <div style={{
                    width: 40,
                    height: 40,
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#2563eb',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                }} />
            </div>
        );
    }

    return isAuthenticated ? <ChatPage /> : <AuthPage />;
};

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;