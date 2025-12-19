import endpointConfig from '@/constants/endpoint.config'
import ApiService from './ApiService'

export async function getStocks(
    pageNumber = 1,
    pageSize = 10,
    searchTerm = '',
) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.stocks}/?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchTerm}`,
        method: 'get',
    })
}
export async function getStockById(id) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.stocks}/${id}`,
        method: 'get',
    })
}
export async function getStockDetails(id) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.details}/${id}`,
        method: 'get',
    })
}
//     export async function apiSignOut() {
//     return ApiService.fetchDataWithAxios({
//         url: endpointConfig.signOut,
//         method: 'post',
//     })
// }

export async function postStock(stockData) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.stocks,
        method: 'post',
        data: stockData,
    })
}

// async updateStock(stockId, stockData) {
//     const response = await ApiService.put(`${endpointConfig.updateStock}/${stockId}`, stockData)
//     return response.data
// }

export async function deleteStock(stockId:string) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.stocks}/${stockId}`,
        method: 'delete',
        // data: stockData,
    })
}
