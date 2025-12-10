import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'


// export async function getDashboardData() {
//     return ApiService.fetchDataWithAxios({
//         url: endpointConfig.Dashboard,
//         method: 'get',
//     })
// }

// export async function getSalesChart(range: string) {
//     return ApiService.fetchDataWithAxios({
//         url: endpointConfig.salesChart.replace('daily', range),
//         method: 'get',
//     })
// }


export async function getDashboardData(startDate?: string, endDate?: string) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.Dashboard,
    method: "GET",
    params: { startDate, endDate },
  });
}

export async function getSalesChart(
  range: string,
  startDate?: string,
  endDate?: string
) {
  return ApiService.fetchDataWithAxios({
    url: endpointConfig.salesChart,
    method: "GET",
    params: { range, startDate, endDate },
  });
}

// export async function create(data) {
//     return ApiService.fetchDataWithAxios({
//         url: endpointConfig.customers,
//         method: 'post',
//         data: data,
//     })
// }