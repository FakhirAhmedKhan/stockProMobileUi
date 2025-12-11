import endpointConfig from '@/constants/endpoint.config'
import { Customer } from '@/types/interface'
import ApiService from './ApiService'

export async function getCustomers(
    pageNumber = 1,
    pageSize = 10,
    searchTerm = '',
) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.customers}/?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchTerm}`,
        method: 'get',
    })
}

export async function create(data: Customer) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.customers,
        method: 'post',
        data: data,
    })
}