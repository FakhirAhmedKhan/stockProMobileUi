/**
 * Authentication Service
 * Handles user authentication operations
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_NAME_IN_STORAGE, USER_ID_IN_STORAGE } from '../constant/api.constant';
import endpointConfig from '../constant/endpoint.config';
import { resetToLogin } from '../src/navigation/NavigationService';
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
            data: {
                email: email,
                password: password,
            },
        });

        if (response && response.token) {
            await AsyncStorage.setItem(TOKEN_NAME_IN_STORAGE, response.token);
            if (response.user && response.user.id) {
                await AsyncStorage.setItem(USER_ID_IN_STORAGE, response.user.id);
            }

            return {
                ...response,
                success: true,
                message: response.message || 'Login successful',
            };
        } else {
            return {
                success: false,
                message: response.message || 'Login failed',
            };
        }

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
export const isAuthenticated = (): boolean => {
    // In a real app, you would check for valid token
    return false;
};

export const getUserId = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(USER_ID_IN_STORAGE);
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
};