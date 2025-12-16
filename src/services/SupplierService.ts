import endpointConfig from '@/constants/endpoint.config'
import ApiService from './ApiService'

export async function getSupplier(pageNumber = 1, pageSize = 10, searchTerm?: string) {
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
    })

    if (searchTerm?.trim()) {
        params.append('search', searchTerm.trim())
    }

    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.Supplier}?${params.toString()}`,
        method: 'get',
    })
}

export async function createSupplier(supplier: any) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Supplier,
        method: 'post',
        data: supplier,
    })
}


