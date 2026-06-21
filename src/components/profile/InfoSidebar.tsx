import React, { useState } from 'react';
import FriendsPanel from '../sidebar/FriendsPanel';

interface InfoSidebarProps {
    activeChat: {
        id: string;
        name: string;
        avatar: string;
        isOnline: boolean;
    } | null;
    showFriends: boolean;
    friends: Array<{ id: string; name: string; avatar: string; isOnline: boolean; status?: string }>;
    onCloseFriends: () => void;
}

const InfoSidebar: React.FC<InfoSidebarProps> = ({ activeChat, showFriends, friends, onCloseFriends }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        'chat-info': true,
        'media': false,
        'privacy': false,
    });

    const toggleSection = (key: string) => {
        setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (showFriends) {
        return <FriendsPanel friends={friends} onClose={onCloseFriends} />;
    }

    if (!activeChat) {
        return (
            <div className="info-sidebar">
                <div className="info-sidebar-empty">
                    <span className="material-symbols-outlined" style={{ fontSize: 48, opacity: 0.3 }}>chat</span>
                    <p>Chọn một cuộc trò chuyện</p>
                </div>
            </div>
        );
    }

    return (
        <div className="info-sidebar">
            {/* Profile Info */}
            <div className="info-profile">
                <div className="info-avatar-section">
                    <img src={activeChat.avatar} alt={activeChat.name} className="info-avatar" />
                    {activeChat.isOnline && <span className="online-dot-lg" />}
                </div>
                <h2 className="info-name">{activeChat.name}</h2>
                <span className="info-status">{activeChat.isOnline ? 'Đang hoạt động' : 'Ngoại tuyến'}</span>
            </div>

            {/* Quick Actions */}
            <div className="info-actions">
                <button className="info-action-btn">
                    <div className="info-action-icon">
                        <span className="material-symbols-outlined fill">person</span>
                    </div>
                    <span className="info-action-label">Profile</span>
                </button>
                <button className="info-action-btn">
                    <div className="info-action-icon">
                        <span className="material-symbols-outlined">notifications</span>
                    </div>
                    <span className="info-action-label">Mute</span>
                </button>
                <button className="info-action-btn">
                    <div className="info-action-icon">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <span className="info-action-label">Search</span>
                </button>
            </div>

            {/* Search Messages */}
            <div className="info-search-section">
                <div className="info-search-bar">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin nhắn..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="info-search-input"
                    />
                    {searchQuery && (
                        <button className="info-search-clear" onClick={() => setSearchQuery('')}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <div className="info-search-results">
                        <div className="info-search-result-item">
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chat</span>
                            <span>Kết quả tìm kiếm cho "{searchQuery}"</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Collapsible Sections */}
            <div className="info-sections">
                <button className="info-section-btn" onClick={() => toggleSection('chat-info')}>
                    <span className="info-section-label">Chat info</span>
                    <span className={`material-symbols-outlined ${expandedSections['chat-info'] ? 'rotated' : ''}`}>
                        expand_more
                    </span>
                </button>
                <button className="info-section-btn" onClick={() => toggleSection('media')}>
                    <span className="info-section-label">Media, files and links</span>
                    <span className={`material-symbols-outlined ${expandedSections['media'] ? 'rotated' : ''}`}>
                        expand_more
                    </span>
                </button>
                <button className="info-section-btn" onClick={() => toggleSection('privacy')}>
                    <span className="info-section-label">Privacy & support</span>
                    <span className={`material-symbols-outlined ${expandedSections['privacy'] ? 'rotated' : ''}`}>
                        expand_more
                    </span>
                </button>
            </div>
        </div>
    );
};

export default InfoSidebar;