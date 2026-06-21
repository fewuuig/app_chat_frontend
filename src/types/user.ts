export interface UserProfile {
    id: string;
    username: string;
    email: string;
    displayName?: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    status: UserStatus;
    isOnline: boolean;
    lastSeen?: string;
    createdAt: string;
    updatedAt: string;
}

export type UserStatus = 'online' | 'offline' | 'away' | 'busy';

export interface UpdateProfileRequest {
    displayName?: string;
    bio?: string;
    phone?: string;
    avatar?: File;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UserSearchResult {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    isOnline: boolean;
    isFriend: boolean;
}