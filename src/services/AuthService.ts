/**
 * Authentication Service
 * Handles user authentication operations
 */
import { TOKEN_NAME_IN_STORAGE, USER_ID_IN_STORAGE } from '@/constants/api.constant';
import endpointConfig from '@/constants/endpoint.config';
import { resetToLogin } from '@/navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from './ApiService';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

/**
 * Login function
 * Authenticates user with email and password
 */
export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const response = await ApiService.fetchDataWithAxios<AuthResponse>({
            url: endpointConfig.signIn,
            method: 'post',
            data: { email, password },
        });

        const token = response?.token;
        // Be defensive about user id shape from backend (id, userId, userID, etc.)
        const rawUser: any = response?.user || {};
        const userId = rawUser.id ?? rawUser.userId ?? rawUser.userID;

        if (!token) {
            return {
                success: false,
                message: response?.message || 'Login failed',
            };
        }

        await AsyncStorage.setItem(TOKEN_NAME_IN_STORAGE, token);
        if (userId) {
            await AsyncStorage.setItem(USER_ID_IN_STORAGE, String(userId));
        }

        return {
            ...response,
            success: true,
            message: response?.message || 'Login successful',
        };

    } catch (error: any) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error?.response?.data?.message || 'Invalid credentials or network error',
        };
    }
};

/**
 * Mock logout function
 */
export const logout = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(TOKEN_NAME_IN_STORAGE);
        await AsyncStorage.removeItem(USER_ID_IN_STORAGE);
        resetToLogin();
    } catch (error) {
        console.error('Logout error:', error);
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_NAME_IN_STORAGE);
        return !!token;
    } catch (error) {
        console.error('Auth check error:', error);
        return false;
    }
};

export const getUserId = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(USER_ID_IN_STORAGE);
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
};