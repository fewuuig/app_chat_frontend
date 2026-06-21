export interface Friend {
    id: string;
    userId: string;
    friendId: string;
    friend: FriendInfo;
    status: FriendStatus;
    createdAt: string;
    updatedAt: string;
}

export interface FriendInfo {
    id: string;
    username: string;
    displayName?: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
}

export type FriendStatus = 'pending' | 'accepted' | 'blocked';

export interface FriendRequest {
    id: string;
    senderId: string;
    receiverId: string;
    sender: FriendInfo;
    status: FriendStatus;
    createdAt: string;
}

export interface SendFriendRequest {
    friendId: string;
}

export interface FriendState {
    friends: Friend[];
    friendRequests: FriendRequest[];
    sentRequests: FriendRequest[];
    isLoading: boolean;
    error: string | null;
}