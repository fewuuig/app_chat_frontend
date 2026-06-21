import api from './api';
import { LoginRequest, User } from '../types/auth';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/account/login', data);
        return response.data;
    },

    getMe: async (): Promise<User> => {
        const response = await api.get<User>('/account/me');
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/account/logout');
    },
};