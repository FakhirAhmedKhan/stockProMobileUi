import type { AxiosError } from 'axios'
import axios from 'axios'
import AxiosRequestInterceptorConfigCallback from './AxiosRequestInterceptorConfigCallback'
import AxiosResponseInterceptorErrorCallback from './AxiosResponseInterceptorErrorCallback'
import appConfig from '@/constants/app.config'

const AxiosBase = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

AxiosBase.interceptors.request.use(
    (config) => {
        return AxiosRequestInterceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        AxiosResponseInterceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBase
