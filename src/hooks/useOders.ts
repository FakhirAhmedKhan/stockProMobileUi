import type { FormData } from '@/@types/Types'
import { getCustomers } from '@/services/CustomerService'
import { deleteOrder, getAllOrders } from '@/services/OrderService'
import { getProduct } from '@/services/ProductService'
import { getStockById } from '@/services/StockService'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'

const useOders = (onOrderCreated?: (order: any) => void, stock?: any) => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [pageSize, setPageSize] = useState(9)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    // Order form state
    const initialFormState: FormData = {
        stockTitle: '',
        totalQuantity: 0,
        stockPrice: 0,
        customerId: '',
        stockId: stock?.stockId || '',
        baseUnitPrice: 0,
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        paymentStatus: 'Paid',
        productIds: [],
        totalPaid: 0,
    }

    const [formData, setFormData] = useState<FormData>(initialFormState)
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [dataCache, setDataCache] = useState<Record<string | number, any>>({})
    const [isFormLoading, setIsFormLoading] = useState(false)

    // Fetch stock data when modal opens
    useEffect(() => {
        if (isModalOpen && stock?.stockId) {
            fetchStockById(stock.stockId)
        }
    }, [isModalOpen, stock?.stockId])

    const fetchStockById = useCallback(async (id: number) => {
        try {
            setIsFormLoading(true)
            const s = await getStockById(id)
            setFormData((prev) => ({
                ...prev,
                stockTitle: s.stockTitle,
                totalQuantity: s.quantityAvailable,
                stockPrice: s.stockPrice,
                stockId: s.stockId,
                unitPrice: Number(s.unitPrice) || 0,
                baseUnitPrice: Number(s.unitPrice) || 0,
            }))
        } catch (err) {
            console.error(err)
        } finally {
            setIsFormLoading(false)
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const num = ['quantity', 'unitPrice', 'totalPrice', 'totalPaid'].includes(name)
            ? Number(value) || 0
            : value

        const updated = { ...formData, [name]: num }
        if (name === 'quantity' || name === 'unitPrice') {
            updated.totalPrice = (updated.quantity || 0) * (updated.unitPrice || 0)
        }
        if (name === 'totalPaid' && updated.totalPaid > updated.totalPrice) {
            updated.totalPaid = updated.totalPrice
        }

        setFormData(updated)
        if (Object.keys(formErrors).length && formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' })
        }
    }

    // Auto-sync between quantity, unitPrice, and totalPrice
    useEffect(() => {
        const qty = Number(formData.quantity) || 0
        const unit = Number(formData.unitPrice) || 0
        const total = Number(formData.totalPrice) || 0
        const active = document.activeElement?.getAttribute('name')

        if ((active === 'quantity' || active === 'unitPrice') && qty > 0 && unit >= 0) {
            const newTotal = parseFloat((qty * unit).toFixed(4))
            if (Math.abs(newTotal - total) > 0.0001) {
                setFormData((p) => ({ ...p, totalPrice: newTotal }))
            }
        }

        if (active === 'totalPrice' && qty > 0) {
            const newUnit = parseFloat((total / qty).toFixed(4))
            if (Math.abs(newUnit - unit) > 0.0001) {
                setFormData((p) => ({ ...p, unitPrice: newUnit }))
            }
        }
    }, [formData.quantity, formData.unitPrice, formData.totalPrice])

    const handleFormSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()
        onOrderCreated({
            stockTitle: formData.stockTitle,
            quantity: formData.quantity,
            totalPrice: formData.totalPrice,
            customerId: formData.customerId,
            stockId: formData.stockId,
            unitPrice: formData.unitPrice,
            productIds: formData.productIds,
            totalAmountPaid: formData.totalPaid,
        })
        resetForm()
        setIsModalOpen(false)
    }

    const resetForm = () => {
        setFormData(initialFormState)
        setFormErrors({})
    }

    const loadProductOptions = async (search: string, _: any, additional: any) => {
        const page = additional?.page || 1
        const data = await getProduct(stock?.stockId, 'AvailbleForSale', page, 10, search)
        const options = data.items.map((p: any) => ({
            value: p.id,
            label: `${p.barcode} | ${p.name} | ${stock?.suppliarName}`,
        }))
        const newCache = Object.fromEntries(
            data.items.map((p: any) => [p.id, { barcode: p.barcode }])
        )
        setDataCache((prev) => ({ ...prev, ...newCache }))
        return { options, hasMore: page < data.totalPages, additional: { page: page + 1 } }
    }

    const loadCustomerOptions = async (search: string, _: any, additional: any) => {
        const page = additional?.page || 1
        const data = await getCustomers(page, 10, search)
        const options = data.items.map((c: any) => ({
            value: c.id,
            label: c.name,
        }))
        const cache = Object.fromEntries(
            data.items.map((c: any) => [c.id, { name: c.name }])
        )
        setDataCache((prev) => ({ ...prev, ...cache }))
        return {
            options,
            hasMore: page < data.totalPages,
            additional: { page: page + 1 },
        }
    }

    const profit = useMemo(() => {
        const base = Number(formData.baseUnitPrice) || 0
        const qty = Number(formData.quantity) || 0
        const total = Number(formData.totalPrice) || 0
        return total - qty * base
    }, [formData])

    const remaining = useMemo(() => {
        const total = Number(formData.totalPrice) || 0
        const paid = Number(formData.totalPaid) || 0
        return total - paid
    }, [formData])

    const margin = useMemo(() => {
        const base = Number(formData.baseUnitPrice) || 0
        const qty = Number(formData.quantity) || 0
        const totalBase = base * qty
        return totalBase > 0 ? ((profit / totalBase) * 100).toFixed(1) : '0.0'
    }, [profit, formData.baseUnitPrice, formData.quantity])

    const handleEdit = (order: any) => {
        setFormData({
            stockTitle: order.stockTitle || '',
            totalQuantity: 0,
            stockPrice: 0,
            customerId: order.customerId || '',
            stockId: order.stockId || '',
            baseUnitPrice: order.baseUnitPrice || 0,
            quantity: order.quantity || 0,
            unitPrice: order.unitPrice || 0,
            totalPrice: order.totalPrice || 0,
            paymentStatus: order.paymentStatus || 'Paid',
            productIds: order.productIds || [],
            totalPaid: order.totalAmountPaid || 0,
        })
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const handleSave = (order: any) => {
        onOrderCreated(order)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        resetForm()
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

    const handleView = (id: string) => {
        // Navigation logic here if needed, or pass navigation prop
        console.log("View order", id)
    }

    // ✅ Fetch orders
    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true)
            const data: any = await getAllOrders(currentPage, pageSize, searchTerm)
            setOrders(data.items)
            setOrders(data.items)
            setTotalCount(data?.totalCount ?? data.items.length)
            setTotalPages(Math.ceil((data?.totalCount ?? data.items.length) / pageSize))
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, pageSize, searchTerm])

    // ✅ Load data
    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    // ✅ Debounce search
    useEffect(() => {
        const t = setTimeout(fetchOrders, 350)
        return () => clearTimeout(t)
    }, [searchTerm, currentPage, pageSize, fetchOrders])

    // ✅ Reset pagination on search/filter change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, statusFilter, pageSize])

    // ✅ Calculate stats
    const stats = useMemo(
        () => ({
            total: orders.length,
            active: orders.filter((o) => o.activeStatus).length,
            totalOrders: orders.reduce((sum, o) => sum + (o.totalOrders || 0), 0),
            totalValue: orders.reduce((sum, o) => sum + (o.totalValue || 0), 0),
        }),
        [orders],
    )

    // ✅ Filtered Orders
    const filteredOrders = useMemo(() => {
        return orders.filter((o) => {
            const customerName = (o.customerName || '').toLowerCase()
            const email = o.email?.toLowerCase() || ''
            const phone = o.phoneNumber || ''

            const matchesSearch =
                customerName.includes(searchTerm.toLowerCase()) ||
                email.includes(searchTerm.toLowerCase()) ||
                phone.includes(searchTerm)

            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && o.activeStatus) ||
                (statusFilter === 'inactive' && !o.activeStatus)

            return matchesSearch && matchesStatus
        })
    }, [orders, searchTerm, statusFilter])

    // ✅ Return hook values
    return {
        // State
        isLoading,
        orders,
        totalCount,
        currentPage,
        itemsPerPage,
        searchTerm,
        statusFilter,

        // Setters
        setSearchTerm,
        setStatusFilter,
        setCurrentPage,
        setPageSize,

        // Computed values
        stats,
        filteredOrders,

        // Functions
        fetchOrders,
        isModalOpen,
        setIsModalOpen,
        selectedOrder,
        setSelectedOrder,
        handleEdit,
        handleSave,
        handleCloseModal,
        handleDelete,
        handleView,
        totalPages,

        // Form state and handlers
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        dataCache,
        setDataCache,
        isFormLoading,
        handleInputChange,
        handleFormSubmit,
        loadProductOptions,
        loadCustomerOptions,
        profit,
        remaining,
        margin,
    }
}

export default useOders