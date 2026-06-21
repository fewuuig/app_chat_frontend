import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
    onSend: (text: string) => void;
    onAttachImage: () => void;
    onAttachFile: () => void;
    onEmoji: () => void;
}

const EMOJI_LIST = ['😀','😃','😄','😁','😅','😂','🤣','😊','😇','🙂','😉','😌','😍','🥰','😘','😗','😙','😚','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','🥴','😷','🤒','🤕','🤢','🤮','🤧','😇','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖'];

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onAttachImage, onEmoji }) => {
    const [text, setText] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [showAttach, setShowAttach] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + 'px';
        }
    }, [text]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
                setShowEmoji(false);
                setShowAttach(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const addEmoji = (emoji: string) => {
        setText(prev => prev + emoji);
        setShowEmoji(false);
    };

    const attachOptions = [
        { icon: 'mic', label: 'Voice', onClick: () => { setShowAttach(false); } },
        { icon: 'location_on', label: 'Location', onClick: () => { setShowAttach(false); } },
        { icon: 'description', label: 'File', onClick: () => { setShowAttach(false); } },
        { icon: 'image', label: 'Image/Video', onClick: () => { onAttachImage(); setShowAttach(false); } },
    ];

    return (
        <div className="chat-input-area">
            <div className="chat-input-bar">
                <div className="attach-btn-wrapper">
                    <button
                        className="chat-input-btn"
                        onClick={() => setShowAttach(!showAttach)}
                        title="Attach"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    {showAttach && (
                        <div className="attach-popup" ref={emojiRef}>
                            {attachOptions.map(opt => (
                                <button key={opt.icon} className="attach-option" onClick={opt.onClick}>
                                    <span className="material-symbols-outlined">{opt.icon}</span>
                                    <span>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className="chat-input-btn" onClick={onAttachImage} title="Image">
                    <span className="material-symbols-outlined">image</span>
                </button>
                <div className="emoji-btn-wrapper">
                    <button className="chat-input-btn" onClick={() => setShowEmoji(!showEmoji)} title="Emoji">
                        <span className="material-symbols-outlined">sentiment_satisfied</span>
                    </button>
                    {showEmoji && (
                        <div className="emoji-picker" ref={emojiRef}>
                            {EMOJI_LIST.map(emoji => (
                                <button key={emoji} className="emoji-item" onClick={() => addEmoji(emoji)}>
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <textarea
                    ref={textareaRef}
                    className="chat-input-textarea"
                    placeholder="nhập văn bản ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button
                    className={`chat-input-btn send-btn ${text.trim() ? 'active' : ''}`}
                    onClick={handleSend}
                    disabled={!text.trim()}
                    title="Send"
                >
                    <span className="material-symbols-outlined fill">send</span>
                </button>
            </div>
        </div>
    );
};

export default ChatInput;