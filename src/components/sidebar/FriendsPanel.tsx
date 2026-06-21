import React from 'react';

interface Friend {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    status?: string;
}

interface FriendsPanelProps {
    friends: Friend[];
    onClose: () => void;
}

const FriendsPanel: React.FC<FriendsPanelProps> = ({ friends, onClose }) => {
    return (
        <div className="info-sidebar">
            <div className="info-sidebar-header">
                <h3>Bạn bè</h3>
                <button className="icon-btn" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className="friends-search">
                <span className="material-symbols-outlined search-icon">search</span>
                <input type="text" placeholder="Tìm bạn bè..." className="friends-search-input" />
            </div>
            <div className="friends-list">
                {friends.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <div className="friend-avatar">
                            <img src={friend.avatar} alt={friend.name} />
                            {friend.isOnline && <span className="online-dot-sm" />}
                        </div>
                        <div className="friend-info">
                            <span className="friend-name">{friend.name}</span>
                            <span className="friend-status">
                                {friend.isOnline ? 'Đang hoạt động' : friend.status || 'Ngoại tuyến'}
                            </span>
                        </div>
                        <button className="friend-msg-btn">
                            <span className="material-symbols-outlined">chat</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsPanel;