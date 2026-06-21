import React, { useState } from 'react';
import { useAuthContext } from '../stores/AuthContext';
import { useTheme } from '../stores/ThemeContext';
import ChatList from '../components/sidebar/ChatList';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import InfoSidebar from '../components/profile/InfoSidebar';
import SettingsModal from '../components/common/SettingsModal';
import './ChatPage.css';

const MOCK_CHATS = [
    { id: '1', name: 'khang', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMdmlPWsEUP76qCvcpdoSt7eHhQ7u2LEom4mg_lNyF1TmQDglF6IyBGSXEMFukU6feMtxfpW7YMf3u_0SIfsaHDb7My4zkxHmbhIb1DZvZIDhm3V9r6d58Ngf4KNxRpLEHLmXH7djM9JdK4mCyXpzELBCOvYi9ofXANHty4EjDz0FHWgT7WLJZAXYpkJMvOScYIPOQ1dnJolV0rxpBj8cAAvlPMbfJO89KvgM_FliMoPJ2w66yjxuUtr0CF_HW54k-9dOEl71lzw2E', lastMessage: 'You: Này hỏi a7', timestamp: '1m', unread: 2, isOnline: true, isActive: true },
    { id: '2', name: 'Linh Linh', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBg1o1wmtevH8c4zFkkz9AReKvxPQcppwGlRV5uqx9JwGgmaNplsX10--b-bGA2fk_wm3DJSPIeeJVKUIaaB21FeXh9hTwrDZTqxxh8zIVrpqNZnr4_bJX3RRPvGcbv4ZqAJoZpzA3iYHAj2JcaCptFOY5T3fD6FNdd3qqY8s5o74MNGHhFv3l2Vr7VfdYtJDm5uMS5rZff3ycgf58ZFaUlWmakFmCYekWUSMLZKhBQ_-9ZlIfoCjeN5IHLA-ZOS03LHEiC2KeKxmB', lastMessage: 'Sent a video. · 4d', timestamp: '4d', isOnline: false },
    { id: '3', name: 'Anh Duy', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVjmKVsrrzecv7YzWA2BvxNSJ2AQerOBBhyRmFEtlJBJ3PPNbUDw2igcllZ87GfzrK1SblNJM9uyDyk43t4l_PcvUVaGFaX9iTeYRDZtduR6AStVrTHTfaXF-l0Qsae8AmE4KotpC5Rbg2OL0p31Jx1jjzfLW33peKHUOpcyfLuQjj79ya77oT1TVivCUJgKUcigNS546QXW55652jHtEjMndY8_LFHz7YorY0JcMFV_iqBlwADM3siEGBtoSl9kiEXRGuhU0XoIm8', lastMessage: 'Bo manh · 3d', timestamp: '3d', isOnline: true },
];

const MOCK_MESSAGES = [
    { id: '1', content: 'Pháp làm sao đá kbt khops ko', isSent: false },
    { id: '2', content: 'biết thế đéo nàoà lần', isSent: true },
    { id: '3', content: '18 xem a t đá mở cái mắt ra', isSent: true },
    { id: '4', content: 'Kbt wc măm nay euro có bằng wc ko nhể', isSent: false },
    { id: '5', content: 'đéo bt', isSent: true },
    { id: '6', content: 'Này hỏi a7', isSent: false, isReply: true, replySender: 'khang' },
    { id: '7', content: 'messi giờ sang chile đá kiếm cái word cup nx là thành hay nhất', isSent: true },
];

const MOCK_FRIENDS = [
    { id: '1', name: 'khang', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMdmlPWsEUP76qCvcpdoSt7eHhQ7u2LEom4mg_lNyF1TmQDglF6IyBGSXEMFukU6feMtxfpW7YMf3u_0SIfsaHDb7My4zkxHmbhIb1DZvZIDhm3V9r6d58Ngf4KNxRpLEHLmXH7djM9JdK4mCyXpzELBCOvYi9ofXANHty4EjDz0FHWgT7WLJZAXYpkJMvOScYIPOQ1dnJolV0rxpBj8cAAvlPMbfJO89KvgM_FliMoPJ2w66yjxuUtr0CF_HW54k-9dOEl71lzw2E', isOnline: true, status: 'Đang hoạt động' },
    { id: '2', name: 'Linh Linh', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBg1o1wmtevH8c4zFkkz9AReKvxPQcppwGlRV5uqx9JwGgmaNplsX10--b-bGA2fk_wm3DJSPIeeJVKUIaaB21FeXh9hTwrDZTqxxh8zIVrpqNZnr4_bJX3RRPvGcbv4ZqAJoZpzA3iYHAj2JcaCptFOY5T3fD6FNdd3qqY8s5o74MNGHhFv3l2Vr7VfdYtJDm5uMS5rZff3ycgf58ZFaUlWmakFmCYekWUSMLZKhBQ_-9ZlIfoCjeN5IHLA-ZOS03LHEiC2KeKxmB', isOnline: false, status: '30 phút trước' },
    { id: '3', name: 'Anh Duy', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVjmKVsrrzecv7YzWA2BvxNSJ2AQerOBBhyRmFEtlJBJ3PPNbUDw2igcllZ87GfzrK1SblNJM9uyDyk43t4l_PcvUVaGFaX9iTeYRDZtduR6AStVrTHTfaXF-l0Qsae8AmE4KotpC5Rbg2OL0p31Jx1jjzfLW33peKHUOpcyfLuQjj79ya77oT1TVivCUJgKUcigNS546QXW55652jHtEjMndY8_LFHz7YorY0JcMFV_iqBlwADM3siEGBtoSl9kiEXRGuhU0XoIm8', isOnline: true, status: 'Đang hoạt động' },
];

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

interface Friend {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    status?: string;
}

const ChatPage: React.FC = () => {
    const { user } = useAuthContext();
    const { theme, toggleTheme } = useTheme();
    const [activeChat, setActiveChat] = useState<string>('1');
    const [chatFilter, setChatFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFriends, setShowFriends] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const chats: ChatItem[] = MOCK_CHATS;
    const friends: Friend[] = MOCK_FRIENDS;
    const messages = MOCK_MESSAGES;
    const currentChat = chats.find(c => c.id === activeChat);

    const handleSend = (text: string) => {
        console.log('Send:', text);
    };

    return (
        <div className="chat-app">
            {/* TopAppBar */}
            <header className="top-app-bar">
                <div className="top-app-bar-left">
                    <span className="app-logo">{/* Logo placeholder */}</span>
                </div>
                <div className="top-app-bar-right">
                    <button className="icon-btn" onClick={() => setShowFriends(!showFriends)} title="Bạn bè">
                        <span className="material-symbols-outlined">group</span>
                    </button>
                    <button className="icon-btn" title="Search">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="icon-btn" onClick={() => setShowSettings(true)} title="Cài đặt">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button className="icon-btn" onClick={toggleTheme} title="Chế độ sáng/tối">
                        <span className="material-symbols-outlined">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Left Column: Chat List */}
                <aside className="sidebar-left">
                    <div className="sidebar-header">
                        <div className="sidebar-title-row">
                            <h2 className="sidebar-title">Chats</h2>
                            <div className="sidebar-title-actions">
                                <button className="icon-btn sm">
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                                <button className="icon-btn sm">
                                    <span className="material-symbols-outlined">edit_square</span>
                                </button>
                            </div>
                        </div>
                        <div className="sidebar-search">
                            <span className="material-symbols-outlined search-icon">search</span>
                            <input
                                type="text"
                                placeholder="Search Messenger"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="sidebar-search-input"
                            />
                        </div>
                        <div className="sidebar-filter-row">
                            {['all', 'unread', 'groups'].map(f => (
                                <button
                                    key={f}
                                    className={`filter-chip ${chatFilter === f ? 'active' : ''}`}
                                    onClick={() => setChatFilter(f)}
                                >
                                    {f === 'all' ? 'All' : f === 'unread' ? 'Unread' : 'Groups'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="sidebar-list">
                        <ChatList
                            items={chats}
                            activeId={activeChat}
                            onSelect={setActiveChat}
                            filter=""
                        />
                    </div>
                </aside>

                {/* Center Column: Chat Canvas */}
                <section className="chat-canvas">
                    {currentChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="chat-header">
                                <div className="chat-header-left">
                                    <div className="chat-header-avatar">
                                        <img src={currentChat.avatar} alt={currentChat.name} />
                                        {currentChat.isOnline && <span className="online-dot-sm" />}
                                    </div>
                                    <div>
                                        <div className="chat-header-name">{currentChat.name}</div>
                                        <div className="chat-header-status">
                                            {currentChat.isOnline ? 'Active now' : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-header-actions">
                                    <button className="icon-btn primary">
                                        <span className="material-symbols-outlined fill">call</span>
                                    </button>
                                    <button className="icon-btn primary">
                                        <span className="material-symbols-outlined fill">videocam</span>
                                    </button>
                                    <button className="icon-btn primary hide-mobile">
                                        <span className="material-symbols-outlined fill">info</span>
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="chat-messages">
                                {messages.map(msg => (
                                    <MessageBubble
                                        key={msg.id}
                                        content={msg.content}
                                        isSent={msg.isSent}
                                        isReply={msg.isReply}
                                        replySender={msg.replySender}
                                    />
                                ))}
                            </div>

                            {/* Input */}
                            <ChatInput
                                onSend={handleSend}
                                onAttachImage={() => {}}
                                onAttachFile={() => {}}
                                onEmoji={() => {}}
                            />
                        </>
                    ) : (
                        <div className="chat-empty">
                            <span className="material-symbols-outlined" style={{ fontSize: 64, opacity: 0.3 }}>chat</span>
                            <p>Chọn một cuộc trò chuyện để bắt đầu</p>
                        </div>
                    )}
                </section>

                {/* Right Column: Info Sidebar */}
                <aside className="sidebar-right">
                    <InfoSidebar
                        activeChat={currentChat ? { id: currentChat.id, name: currentChat.name, avatar: currentChat.avatar, isOnline: currentChat.isOnline } : null}
                        showFriends={showFriends}
                        friends={friends}
                        onCloseFriends={() => setShowFriends(false)}
                    />
                </aside>
            </main>

            {/* Settings Modal */}
            {showSettings && (
                <SettingsModal onClose={() => setShowSettings(false)} />
            )}
        </div>
    );
};

export default ChatPage;