import { useSessionUser } from '@/store/authStore'
import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function getProduct(
    stockId?: string,
    filter: string = 'All',
    pageNumber = 1,
    pageSize = 10,
    search: string = '',
) {
    const params = new URLSearchParams({
        id: stockId || '',  
        filter,
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        search,
    })

    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.Product}?${params.toString()}`,
        method: 'get',
    })
}
export async function GetAllProduct(
    pageNumber = 1,
    pageSize = 10,
    searchTerm = '',
) {
    const user = useSessionUser.getState().user
    const userId = user?.userId || ''

    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.GetAllProduct}/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${searchTerm}`, // ✅ userId in path
        method: 'get',
    })
}
export async function GetProductById(productId: string) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.GetProductById}/${productId}`, // ✅ userId in path
        method: 'get',
    })
}
export async function createProduct(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Product,
        method: 'post',
        data: data,
    })
}
export async function editProduct(data) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.Product}/${data.id}`,
        method: 'put',
        data: data,
    })
}
export async function deleteProduct(id?: String) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.Product}/${id}`,
        method: 'delete',
    })
}
