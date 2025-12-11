import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosBase from './axios/AxiosBase';

const ApiService = {
    async fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ): Promise<Response> {
        const response: AxiosResponse<Response> = await AxiosBase(param);
        return response.data;
    },
}

export default ApiService
