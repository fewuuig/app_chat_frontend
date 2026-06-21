import api from './api';
import { Conversation, Message, SendMessageRequest } from '../types/chat';

export const chatService = {
    getConversations: async (): Promise<Conversation[]> => {
        const response = await api.get<Conversation[]>('/chat/conversations');
        return response.data;
    },

    getMessages: async (conversationId: string): Promise<Message[]> => {
        const response = await api.get<Message[]>(`/chat/conversations/${conversationId}/messages`);
        return response.data;
    },

    sendMessage: async (data: SendMessageRequest): Promise<Message> => {
        const formData = new FormData();
        formData.append('conversationId', data.conversationId);
        formData.append('content', data.content);
        formData.append('type', data.type);
        if (data.replyTo) formData.append('replyTo', data.replyTo);
        if (data.attachments) {
            data.attachments.forEach((file) => formData.append('attachments', file));
        }
        const response = await api.post<Message>('/chat/messages', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    createConversation: async (participantIds: string[]): Promise<Conversation> => {
        const response = await api.post<Conversation>('/chat/conversations', { participantIds });
        return response.data;
    },
};