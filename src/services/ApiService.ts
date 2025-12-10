import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosBase from './axios/AxiosBase';

const ApiService = {
    async fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ): Promise<Response> {
        try {
            const response: AxiosResponse<Response> = await AxiosBase(param);
            return response.data;
        } catch (error) {
            // Re-throwing is cleaner than the previous catch-throw pattern
            throw error;
        }
    },
}

export default ApiService
