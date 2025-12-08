import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import { Supplier } from '@/@types/interface'

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

export async function createSupplier(supplier: Supplier) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Supplier,
        method: 'post',
        data: supplier,
    })
}


