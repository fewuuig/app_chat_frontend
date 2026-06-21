import React from 'react';

interface MessageBubbleProps {
    content: string;
    isSent: boolean;
    timestamp?: string;
    isReply?: boolean;
    replyContent?: string;
    replySender?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
    content, isSent, timestamp, isReply, replyContent, replySender
}) => {
    return (
        <div className={`message-block ${isSent ? 'sent' : 'received'}`}>
            {isReply && (
                <div className="message-reply-indicator">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>reply</span>
                    <span>{replySender} replied to you</span>
                </div>
            )}
            <div className={`message-bubble ${isSent ? 'sent-bubble' : 'received-bubble'}`}>
                {content}
            </div>
            {timestamp && <span className="message-time">{timestamp}</span>}
        </div>
    );
};

export default MessageBubble;