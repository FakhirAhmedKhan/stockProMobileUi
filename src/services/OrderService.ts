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
) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.getAllOrders}/?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchTerm}`,
        method: 'get',
    })
}
export async function getOrdersById(id) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.orders}/${id}`,
        method: 'get',
    })
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

