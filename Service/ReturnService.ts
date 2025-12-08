import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function getReturns(stockId) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.GetReturn,
        method: 'get',
        params: { stockId }
    })
}

// export async function deleteReturn() {
//     return ApiService.fetchDataWithAxios({
//         url: endpointConfig.getAllOrders,
//         method: 'get',
//     })
// }
// export async function updateReturn(id) {
//     return ApiService.fetchDataWithAxios({
//         url: `${endpointConfig.orders}/${id}`,
//         method: 'get',
//     })
// }
export async function createReturn(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Return,
        method: 'post',
        data: data,
    })
}
