import appConfig from '@/constant/app.config';
import {
    TOKEN_TYPE,
    REQUEST_HEADER_AUTH_KEY,
    TOKEN_NAME_IN_STORAGE,
} from '@/constant/api.constant';
import type { InternalAxiosRequestConfig } from 'axios';

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    const storage = appConfig.accessTokenPersistStrategy;

    if (storage === 'localStorage' || storage === 'sessionStorage') {
        let accessToken = '';

        if (storage === 'localStorage') {
            accessToken = localStorage.getItem(TOKEN_NAME_IN_STORAGE) || '';
        }

        if (storage === 'sessionStorage') {
            accessToken = sessionStorage.getItem(TOKEN_NAME_IN_STORAGE) || '';
        }

        // ✅ Get userId from stored session
        const sessionUser = localStorage.getItem('sessionUser');
        let userId = '';
        if (sessionUser) {
            try {
                const parsed = JSON.parse(sessionUser);
                userId = parsed?.state?.user?.userId || '';
            } catch (e) {
                console.error('Failed to parse sessionUser from localStorage', e);
            }
        }

        // ✅ Inject Authorization header
        if (accessToken) {
            config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${accessToken}`;
        }

        // ✅ Inject userId safely without breaking FormData
        if (config.method === 'post' && config.data) {
            if (config.data instanceof FormData) {
                config.data.append('userId', userId);
            } else if (typeof config.data === 'object') {
                config.data = { ...config.data, userId };
            }
        }
    }

    return config;
};

export default AxiosRequestIntrceptorConfigCallback;
