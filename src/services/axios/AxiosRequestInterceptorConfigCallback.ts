import {
    REQUEST_HEADER_AUTH_KEY,
    TOKEN_NAME_IN_STORAGE,
    TOKEN_TYPE,
} from "@/constants/api.constant";
import appConfig from "@/constants/app.config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

const AxiosRequestInterceptorConfigCallback = async (
    config: InternalAxiosRequestConfig,
) => {
    const storage = appConfig.accessTokenPersistStrategy;
    let accessToken = '';
    let userId = '';

    if (Platform.OS === 'web' && (storage === 'localStorage' || storage === 'sessionStorage')) {
        if (storage === 'localStorage' && typeof localStorage !== 'undefined') {
            accessToken = localStorage.getItem(TOKEN_NAME_IN_STORAGE) || '';
            const sessionUser = localStorage.getItem('sessionUser');
            if (sessionUser) {
                try {
                    const parsed = JSON.parse(sessionUser);
                    userId = parsed?.state?.user?.userId || '';
                } catch (e) {
                    console.error('Failed to parse sessionUser from localStorage', e);
                }
            }
        } else if (storage === 'sessionStorage' && typeof sessionStorage !== 'undefined') {
            accessToken = sessionStorage.getItem(TOKEN_NAME_IN_STORAGE) || '';
            const sessionUser = sessionStorage.getItem('sessionUser');
            if (sessionUser) {
                try {
                    const parsed = JSON.parse(sessionUser);
                    userId = parsed?.state?.user?.userId || '';
                } catch (e) {
                    console.error('Failed to parse sessionUser from sessionStorage', e);
                }
            }
        }
    } else if (storage === 'asyncStorage') {
        try {
            accessToken = await AsyncStorage.getItem(TOKEN_NAME_IN_STORAGE) || '';
            const sessionUser = await AsyncStorage.getItem('sessionUser');
            if (sessionUser) {
                const parsed = JSON.parse(sessionUser);
                userId = parsed?.state?.user?.userId || '';
            }
        } catch (e) {
            console.error('Failed to get items from AsyncStorage', e);
        }
    }

    // ✅ Inject Authorization header (TOKEN_TYPE already includes trailing space)
    if (accessToken) {
        config.headers = config.headers || {};
        config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    // ✅ Send user id via header to avoid mutating payloads
    if (userId) {
        config.headers = config.headers || {};
        config.headers['x-user-id'] = userId;
    }

    return config;
};

export default AxiosRequestInterceptorConfigCallback;
