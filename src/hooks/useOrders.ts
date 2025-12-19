import { deleteOrder, getAllOrders, getOrdersById } from '@/services/OrderService';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

export interface Order {
    id: string;
    orderId?: string;
    orderID?: string;
    stockId: string | number;
    stockTitle: string;
    customerName: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    orderDate: string;
    activeStatus?: boolean;
    [key: string]: any;
}

const useOrders = (stockId?: string | number) => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState<Order[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true)
            // Pass all filters to the service.
            const data: any = await getAllOrders(currentPage, pageSize, searchTerm, statusFilter, stockId)

            let items: any[] = []
            let totalPagesValue = 1
            let totalCountValue = 0

            if (Array.isArray(data)) {
                items = data
                totalCountValue = data.length
                totalPagesValue = Math.max(1, Math.ceil(totalCountValue / pageSize))
            } else if (data?.items && Array.isArray(data.items)) {
                items = data.items
                totalPagesValue = data.totalPages ?? Math.max(1, Math.ceil((data.totalCount ?? items.length) / pageSize))
                totalCountValue = data.totalCount ?? items.length
            } else if (data?.data && Array.isArray(data.data)) {
                items = data.data
                totalPagesValue = data.totalPages ?? Math.max(1, Math.ceil((data.totalCount ?? items.length) / pageSize))
                totalCountValue = data.totalCount ?? items.length
            } else {
                console.warn('Unexpected API response structure:', data)
            }

            const normalizedOrders = items.map((item: any, index: number) => ({
                ...item,
                id: item.id ?? item.orderId ?? item.orderID ?? `temp-${index}`,
            }));

            setOrders(normalizedOrders)
            setTotalCount(totalCountValue)
            setTotalPages(totalPagesValue)
        } catch (error: any) {
            console.error('Error fetching orders:', error)
            setOrders([])
            setTotalCount(0)
            setTotalPages(1)
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, pageSize, searchTerm, statusFilter, stockId])

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchOrders()
        }, 350)
        return () => clearTimeout(timer)
    }, [fetchOrders])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter, pageSize])

    const stats = useMemo(() => ({
        total: totalCount,
        active: orders.filter((o) => o.activeStatus).length,
        totalValue: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
    }), [orders, totalCount]);

    const handleEdit = (order: Order) => {
        setSelectedOrder(order)
    }

    const handleDelete = async (id: string) => {
        Alert.alert(
            "Delete Order",
            "Are you sure you want to delete this order?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteOrder(id)
                            fetchOrders()
                        } catch (error) {
                            console.error("Failed to delete order", error)
                        }
                    }
                }
            ]
        )
    }

    const handleView = async (id: string) => {
        try {
            const order = await getOrdersById(id)
            console.log("Order details:", order)
            // Navigation would usually happen here
        } catch (error) {
            console.error("Failed to fetch order details", error)
            Alert.alert("Error", "Failed to load order details")
        }
    }

    const fetchOrderById = useCallback(async (orderId: string) => {
        try {
            setIsLoading(true)
            const order = await getOrdersById(orderId)
            return order
        } catch (error: any) {
            console.error('Error fetching order by ID:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        // State
        isLoading,
        orders,
        totalCount,
        currentPage,
        pageSize,
        searchTerm,
        statusFilter,
        selectedOrder,

        // Setters
        setSearchTerm,
        setStatusFilter,
        setCurrentPage,
        setPageSize,
        setSelectedOrder,

        // Computed values
        stats,
        totalPages,

        // Functions
        fetchOrders,
        fetchOrderById,
        handleDelete,
        handleView,
        handleEdit,
    }
}

export default useOrders
