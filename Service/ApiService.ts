import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import AxiosBase from './axios/AxiosBase'

const ApiService = {
    fetchDataWithAxios<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>,
    ) {
        return AxiosBase(param)
            .then((response: AxiosResponse<Response>) => {
                return response.data
            })
            .catch((errors: AxiosError) => {
                throw errors
            })
    },
}

export default ApiService
