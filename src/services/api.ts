import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor để unwrap ApiResponse: kiểm tra success, lấy data, throw message nếu lỗi
api.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const body = response.data;
        if (body && typeof body.success === 'boolean') {
            if (!body.success) {
                const error: any = new Error(body.message || 'Yêu cầu thất bại');
                error.response = { data: body, status: response.status };
                throw error;
            }
            // Wrap lại data gốc để service có thể lấy cả data lẫn message
            response.data = body.data !== undefined ? body.data : body;
            (response as any).apiMessage = body.message;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // Nếu đã có message từ body thì không xử lý thêm
        if (error.response?.data?.message && error.response?.data?.success === false) {
            return Promise.reject(error);
        }
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${API_BASE_URL}/account/refresh`, {
                    refreshToken,
                });
                const { accessToken } = response.data?.data || response.data;
                localStorage.setItem('accessToken', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { API_BASE_URL };