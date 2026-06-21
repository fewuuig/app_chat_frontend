export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    displayName?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    password: string;
    displayName: string;
    email: string;
    sex: boolean;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
}

export interface ActiveRequest {
    email: string;
    verifyCode: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
    meta: any;
    error: any;
}

export interface VerifyRequest {
    email: string;
    code: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}