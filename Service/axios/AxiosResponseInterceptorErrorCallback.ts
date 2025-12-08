import type { AxiosError } from 'axios';

import { resetToLogin } from '../../src/navigation/NavigationService';

const AxiosResponseInterceptorErrorCallback = (error: AxiosError) => {
    console.error('Axios Response Error:', error)
    if (error.response) {
        // Handle specific status codes here (e.g., 401 for unauthorized)
        if (error.response.status === 401) {
            console.log('Unauthorized access - redirecting to login')
            resetToLogin();
        }
    }
}

export default AxiosResponseInterceptorErrorCallback
