import React from 'react';

interface ChatItem {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread?: number;
    isOnline: boolean;
    isActive?: boolean;
}

interface ChatListProps {
    items: ChatItem[];
    activeId?: string;
    onSelect: (id: string) => void;
    filter: string;
}

const ChatList: React.FC<ChatListProps> = ({ items, activeId, onSelect, filter }) => {
    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="chat-list">
            {filtered.map(item => (
                <div
                    key={item.id}
                    className={`chat-list-item ${item.id === activeId ? 'active' : ''}`}
                    onClick={() => onSelect(item.id)}
                >
                    <div className="chat-list-avatar">
                        <img src={item.avatar} alt={item.name} />
                        {item.isOnline && <span className="online-dot" />}
                    </div>
                    <div className="chat-list-info">
                        <div className="chat-list-name-row">
                            <span className="chat-list-name">{item.name}</span>
                            <span className="chat-list-time">{item.timestamp}</span>
                        </div>
                        <div className="chat-list-message-row">
                            <span className="chat-list-message">{item.lastMessage}</span>
                            {item.unread ? (
                                <span className="chat-list-badge">{item.unread}</span>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
export type { ChatItem };