import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

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

// async updateStock(stockId, stockData) {
//     const response = await ApiService.put(`${endpointConfig.updateStock}/${stockId}`, stockData)
//     return response.data
// }

// async deleteStock(stockId) {
//     const response = await ApiService.delete(`${endpointConfig.deleteStock}/${stockId}`)
//     return response.data
// }
