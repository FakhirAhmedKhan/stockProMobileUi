import endpointConfig from '@/constants/endpoint.config'
import ApiService from './ApiService'

export async function getOrders() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.orders,
        method: 'get',
    })
}

export async function getAllOrders(
    pageNumber = 1,
    pageSize = 10,
    searchTerm = '',
    statusFilter: 'all' | 'active' | 'inactive' = 'all',
    stockId?: string | number
) {
    let url = `${endpointConfig.getAllOrders}/?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchTerm}`
    if (statusFilter && statusFilter !== 'all') {
        url += `&status=${statusFilter}`
    }
    if (stockId) {
        url += `&stockId=${stockId}`
    }
    console.log('getAllOrders - Request URL:', url)
    console.log('getAllOrders - Method: GET')
    
    try {
        const response = await ApiService.fetchDataWithAxios({
            url,
            method: 'get',
        })
        console.log('getAllOrders - Response received:', typeof response, Array.isArray(response) ? `Array with ${response.length} items` : 'Object')
        return response
    } catch (error: any) {
        console.error('getAllOrders - Error:', {
            message: error?.message,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            data: error?.response?.data,
            url: error?.config?.url,
        })
        throw error
    }
}

export async function getOrdersById(id: string | number) {
    const url = `${endpointConfig.orders}/${id}`
    console.log('getOrdersById - Request URL:', url)
    console.log('getOrdersById - Method: GET')
    
    try {
        const response = await ApiService.fetchDataWithAxios({
            url,
            method: 'get',
        })
        console.log('getOrdersById - Response received:', typeof response)
        return response
    } catch (error: any) {
        console.error('getOrdersById - Error:', {
            message: error?.message,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            data: error?.response?.data,
            url: error?.config?.url,
        })
        throw error
    }
}
//     export async function apiSignOut() {
//     return ApiService.fetchDataWithAxios({
//         url: endpointConfig.signOut,
//         method: 'post',
//     })
// }


export async function createOrder(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.orders,
        method: 'post',
        data: data,
    })
}

export async function editOrder(data) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.orders}/${data.id}`,
        method: 'put',
        data: data,
    })
}

export async function deleteOrder(id) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.orders}/${id}`,
        method: 'delete',
    })
}

