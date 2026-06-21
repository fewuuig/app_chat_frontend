import api from './api';
import { LoginRequest, SignupRequest, ActiveRequest, User, LoginResponse, ApiResponse } from '../types/auth';

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/account/login', data);
        return response.data;
    },

    signup: async (data: SignupRequest): Promise<{ message: string }> => {
        const response = await api.post<any>('/account/signup', data);
        const message = (response as any).apiMessage || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực.';
        return { message };
    },

    activeAccount: async (data: ActiveRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/account/active', data);
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