import endpointConfig from "@/configs/endpoint.config";
import ApiService from "@/services/ApiService";

// Get expenses (filtered)
export async function getExpenses(filters: Record<string, any>) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Expense,
        method: "get",
        params: filters,
    });
}
export async function getExpenseCategories() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.ExpenseCategories,
        method: "get"
    });
}
// Create expense
export async function createExpense(data: Record<string, any>) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.Expense,
        method: "post",
        data,
    });
}