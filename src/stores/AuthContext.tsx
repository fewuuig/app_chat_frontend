import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types/auth';
import { authService, LoginResponse } from '../services/authService';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'SET_USER'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'CLEAR_ERROR' };

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,
    error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case 'SET_USER':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: null,
            };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            authService.getMe()
                .then((user) => dispatch({ type: 'SET_USER', payload: user }))
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                });
        }
    }, []);

    const login = async (email: string, password: string) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            const response = await authService.login({ email, password });
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            dispatch({ type: 'LOGIN_SUCCESS', payload: response });
        } catch (error: any) {
            const message = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
            dispatch({ type: 'LOGIN_FAILURE', payload: message });
            throw new Error(message);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch({ type: 'LOGOUT' });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;