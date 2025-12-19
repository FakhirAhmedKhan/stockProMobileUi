import { navigate } from '@/navigation/NavigationService'
import { createOrder } from '@/services/OrderService'
import { deleteStock, getStockDetails, getStocks, postStock } from '@/services/StockService'
import { getSupplier } from '@/services/SupplierService'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'

// Note: Replaced useNavigation and useRoute with manual params and NavigationService
// to avoid "Couldn't find a navigation context" errors in complex layouts.
const useStock = (idFromParams?: string) => {
    /* -------------------------------------------------------------------------- */
    /* 📝 State                                                                   */
    /* -------------------------------------------------------------------------- */
    const [searchTerm, setSearchTerm] = useState('')
    const [stocks, setStocks] = useState<any[]>([])
    const [stock, setStock] = useState<any>(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)

    // Use passed id or fallback to state
    const stockId = idFromParams

    const [isPanelVisible, setIsPanelVisible] = useState(true)
    const [activeTab, setActiveTab] = useState('Product')
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    /* -------------------------------------------------------------------------- */
    /* 📝 Form State (Manual handling)                                            */
    /* -------------------------------------------------------------------------- */
    const initialFormState = {
        stockTitle: "",
        totalQuantity: "",
        unitPrice: "",
        totalPrice: "",
        totalPaid: "",
        totalRemaining: "",
        supplierId: null as any,
        storage: "",
        color: "",
        condition: "",
        category: "",
        expiryDate: "",
        generateUniqueBarcode: false,
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Reset form
    const resetForm = useCallback(() => {
        setFormData(initialFormState)
        setErrors({})
    }, [])

    useEffect(() => {
        if (isModalOpen) {
            resetForm()
        }
    }, [isModalOpen, resetForm])

    // Specific category logic
    useEffect(() => {
        if (formData.category !== "Food") {
            setFormData(prev => ({ ...prev, expiryDate: "" }))
            setErrors(prev => ({ ...prev, expiryDate: "" }))
        }
    }, [formData.category])

    /* -------------------------------------------------------------------------- */
    /* 🛠 Auto-Calculation & Input Handling                                       */
    /* -------------------------------------------------------------------------- */

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev: any) => {
            const updated = { ...prev, [field]: value }

            // Auto Calculations
            const q = parseFloat(String(updated.totalQuantity)) || 0
            const u = parseFloat(String(updated.unitPrice)) || 0
            const t = parseFloat(String(updated.totalPrice)) || 0
            const paid = parseFloat(String(updated.totalPaid)) || 0

            // If quantity or unit price changes, update Total Price
            if ((field === "totalQuantity" || field === "unitPrice") && q > 0 && u > 0) {
                updated.totalPrice = (q * u).toFixed(2)
            }

            // If Total Price is manually entered, update Unit Price
            if (field === "totalPrice" && q > 0) {
                updated.unitPrice = (t / q).toFixed(2)
            }

            // Always update Remaining
            const currentTotal = parseFloat(String(updated.totalPrice)) || 0
            updated.totalRemaining = (currentTotal - paid).toFixed(2)

            return updated
        })

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    /* -------------------------------------------------------------------------- */
    /* 📦 Data Fetching                                                           */
    /* -------------------------------------------------------------------------- */

    const loadSuppliers = async (search: string, _prevOptions: any, { page }: { page: number }) => {
        try {
            const data: any = await getSupplier(page, 10, search)
            return {
                options: (data.items ?? []).map((s: any) => ({ value: s.id, label: s.name })),
                hasMore: page < data.totalPages,
                additional: { page: page + 1 },
            }
        } catch {
            return { options: [], hasMore: false, additional: { page } }
        }
    }

    const fetchStockDetails = useCallback(
        async (showLoader = true) => {
            if (!stockId) return
            if (showLoader) setIsLoading(true)
            try {
                const data = await getStockDetails(stockId)
                setStock(data)
            } catch (error) {
                console.error('Error fetching stock details:', error)
            } finally {
                if (showLoader) setIsLoading(false)
            }
        },
        [stockId]
    )

    const fetchStocks = useCallback(async () => {
        setIsLoading(true)
        try {
            const data: any = await getStocks(pageNumber, pageSize, searchTerm)
            setStocks(data?.items ?? [])
            setTotalPages(data?.totalPages || 1)
        } catch (error) {
            console.error('Error fetching stocks:', error)
            setStocks([])
            setTotalPages(1)
        } finally {
            setIsLoading(false)
        }
    }, [pageNumber, pageSize, searchTerm])

    useEffect(() => {
        if (!stockId) {
            fetchStocks()
        }
    }, [stockId, fetchStocks])

    useEffect(() => {
        if (stockId) {
            fetchStockDetails()
        }
    }, [stockId, fetchStockDetails])

    /* -------------------------------------------------------------------------- */
    /* 🚀 Actions                                                                 */
    /* -------------------------------------------------------------------------- */

    const handleSubmit = async () => {
        setLoading(true)
        // Basic validation
        const q = parseFloat(String(formData.totalQuantity)) || 0
        const u = parseFloat(String(formData.unitPrice)) || 0
        const price = parseFloat(String(formData.totalPrice)) || q * u
        const paid = parseFloat(String(formData.totalPaid)) || 0
        const remaining = price - paid

        // Validation (add more as needed)
        if (!formData.stockTitle) {
            setErrors(prev => ({ ...prev, stockTitle: "Stock Title is required" }))
            setLoading(false)
            return
        }

        const newStock = {
            stockTitle: formData.stockTitle,
            totalQuantity: q,
            unitPrice: u,
            stockPrice: price,
            quantityAvailable: q,
            supplierId: formData.supplierId?.value || formData.supplierId,
            storage: formData.storage,
            color: formData.color,
            category: formData.category,
            condition: formData.condition,
            Expiery: formData.category === "Food" ? new Date(formData.expiryDate) : null,
            TotalAmountPaid: paid,
            RemainingAmount: remaining,
            generateUniqueBarcode: !!formData.generateUniqueBarcode,
        }

        await submitStock(newStock)
        setLoading(false)
        setModalOpen(false)
    }

    const submitStock = async (newStock: any) => {
        setIsLoading(true)
        try {
            await postStock(newStock)
            await fetchStocks()
            setTimeout(() => {
                setModalOpen(false)
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 3000)
            }, 200)
        } catch (error) {
            console.error('Error submitting stock:', error)
            Alert.alert('Error', 'Failed to add stock. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteStock = async (id: string) => {
        Alert.alert(
            "Delete Stock",
            "Are you sure you want to delete this stock item?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true)
                        try {
                            await deleteStock(id)
                            await fetchStocks()
                            setShowSuccess(true)
                            setTimeout(() => setShowSuccess(false), 3000)
                        } catch (error) {
                            console.error('Error deleting stock:', error)
                            Alert.alert('Error', 'Failed to delete stock. Please try again.')
                        } finally {
                            setIsLoading(false)
                        }
                    }
                }
            ]
        )
    }

    const handleViewDetails = (id: string) => {
        navigate('StockDetails', { stockId: id })
    }

    const handleOrderCreated = useCallback(
        async (newOrder: any) => {
            try {
                await createOrder(newOrder)
                fetchStockDetails(false)
            } catch (err) {
                console.error('Error creating order:', err)
            }
        },
        [fetchStockDetails]
    )

    const filteredStocks = useMemo(() => {
        if (!searchTerm.trim()) return stocks

        return stocks.filter((s) => {
            const title = s?.stockTitle?.toLowerCase() || ''
            const supplier = s?.suppliarName?.toLowerCase() || ''
            const search = searchTerm.toLowerCase()
            return title.includes(search) || supplier.includes(search)
        })
    }, [stocks, searchTerm])

    const stats = useMemo(
        () => ({
            totalItems: stocks.reduce((sum, s) => sum + (s?.totalQuantity || 0), 0),
            totalValue: stocks.reduce((sum, s) => sum + (s?.stockPrice || 0), 0),
            lowStock: stocks.filter(
                (s) => (s?.quantityAvailable || 0) <= (s?.reorderLevel || 0),
            ).length,
            totalProfit: stocks.reduce((sum, s) => sum + (s?.totalProfit || 0), 0),
        }),
        [stocks],
    )

    const handleTabClick = (id: string) => {
        setActiveTab(id)
        if (id === 'Order') {
            setIsOrderModalOpen(true)
        } else {
            setIsOrderModalOpen(false)
        }
    }

    return {
        // List page data
        filteredStocks,
        stocks,
        stats,

        // Details page data
        stock,
        stockId,

        // Actions
        handleDeleteStock,
        handleViewDetails,
        submitStock,
        handleOrderCreated,
        fetchStockDetails,

        // UI state
        isLoading,
        isModalOpen,
        setModalOpen,
        showSuccess,
        isPanelVisible,
        setIsPanelVisible,
        activeTab,
        setActiveTab,

        // Pagination
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        totalPages,

        // Search
        searchTerm,
        setSearchTerm,

        handleTabClick,

        // Form Props
        formData,
        handleInputChange,
        handleSubmit,
        errors,
        loadSuppliers,
        loading,
        resetForm
    }
}

export default useStock