import endpointConfig from '@/constants/endpoint.config'
import ApiService from './ApiService'


export async function getRepairing(stockId?: String) {
    const res: any = await ApiService.fetchDataWithAxios({
        url: `${endpointConfig.repairingList}?stockId=${stockId}`,
        method: 'get',
    })
    // normalize to array
    if (Array.isArray(res)) return res
    if (res?.items && Array.isArray(res.items)) return res.items
    if (res?.repairs && Array.isArray(res.repairs)) return res.repairs
    return []
}
export async function getInRepairinglist(stockId?: String) {
    const res: any = await ApiService.fetchDataWithAxios({
        url: `${endpointConfig.InRepairinglist}?stockId=${stockId}`,
        method: 'get',
    })
    if (Array.isArray(res)) return res
    if (res?.items && Array.isArray(res.items)) return res.items
    if (res?.repairs && Array.isArray(res.repairs)) return res.repairs
    return []
}
export async function getRepairingById(id: string) {
    return ApiService.fetchDataWithAxios({
        url: `${endpointConfig.repairingById}/${id}`,
        method: 'get',
    })
}
export async function create(RData: any) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.repairing,
        method: 'post',
        data: RData,
    })
}
export async function completeRepairing(data: any) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.repairingComplete,
        method: 'post',
        data: data,
    })
}