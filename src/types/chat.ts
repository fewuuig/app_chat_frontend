export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    type: MessageType;
    status: MessageStatus;
    replyTo?: string;
    attachments?: Attachment[];
    createdAt: string;
    updatedAt: string;
}

export type MessageType = 'text' | 'image' | 'file' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Attachment {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
}

export interface Conversation {
    id: string;
    participants: string[];
    participantDetails?: Participant[];
    lastMessage?: Message;
    unreadCount: number;
    isGroup: boolean;
    groupName?: string;
    groupAvatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Participant {
    userId: string;
    username: string;
    displayName?: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
}

export interface SendMessageRequest {
    conversationId: string;
    content: string;
    type: MessageType;
    replyTo?: string;
    attachments?: File[];
}

export interface ChatState {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}