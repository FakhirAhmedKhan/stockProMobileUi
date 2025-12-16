import { getProduct } from '@/services/ProductService'
import { createReturn, getReturns } from '@/services/ReturnService'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'

const useReturn = (stock: any, onStockUpdated: () => void) => {
    const [returns, setReturns] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedReturn, setSelectedReturn] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredReturns, setFilteredReturns] = useState<any[]>([])

    // Form state
    const [formData, setFormData] = useState({
        productIds: [],
        returnType: '',
        narration: '',
        quantity: 0,
    })
    const [errors, setErrors] = useState<any>({})
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [dataCache, setDataCache] = useState<any>({})

    const conditionOptions = [
        { value: 'ToStock', label: 'To Stock' },
        { value: 'ToVendor', label: 'To Vendor' },
        { value: 'ToShrink', label: 'To Shrink' },
    ]

    useEffect(() => {
        fetchReturns()
    }, [])

    const fetchReturns = async () => {
        try {
            setIsLoading(true)
            const data = await getReturns(stock?.stockId)
            const list = Array.isArray(data) ? data : (data?.items || [])
            setReturns(list)
        } catch (error) {
            console.error('Error fetching returns:', error)
            setReturns([])
        } finally {
            setIsLoading(false)
        }
    }

    // Filter and Paginate
    useEffect(() => {
        let result = returns
        if (searchTerm) {
            const lower = searchTerm.toLowerCase()
            result = result.filter((r: any) =>
                (r.productName?.toLowerCase().includes(lower)) ||
                (r.returnType?.toLowerCase().includes(lower)) ||
                (r.narration?.toLowerCase().includes(lower))
            )
        }

        setTotalPages(Math.ceil(result.length / pageSize) || 1)

        const start = (currentPage - 1) * pageSize
        setFilteredReturns(result.slice(start, start + pageSize))
    }, [returns, searchTerm, currentPage, pageSize])

    // Handlers
    const handleEdit = (item: any) => {
        // Edit logic if API supports it, otherwise just view
        setSelectedReturn(item)
        setIsModalOpen(true)
    }

    const handleView = (item: any) => {
        console.log("View", item)
    }

    const handleDelete = (id: string) => {
        Alert.alert("Delete Return", "Are you sure? This action cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete", style: "destructive", onPress: () => {
                    console.log("Delete return", id)
                    // Call delete service when available
                }
            }
        ])
    }

    // Validation
    const validate = useCallback(() => {
        const newErrors: any = {}
        if (formData.productIds.length === 0)
            newErrors.productIds = 'Select at least one product'
        if (!formData.returnType) newErrors.returnType = 'Condition is required'

        if (!stock?.generateUniqueBarcode && formData.quantity <= 0)
            newErrors.quantity = 'Quantity must be greater than 0'
        if (!stock?.generateUniqueBarcode && formData.quantity > stock?.quantityAvailable)
            newErrors.quantity = 'Quantity cannot exceed available stocks'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData, stock])

    // Handle form submit
    const handleFormSubmit = async () => {
        if (!validate()) return

        try {
            const returnData = {
                stockId: stock?.stockId,
                products: formData.productIds.map((id: any) => ({
                    productId: id,
                    quantity: stock?.generateUniqueBarcode ? 1 : formData.quantity,
                })),
                returnType: formData.returnType,
                narration: formData.narration,
            }
            await createReturn(returnData)
            await fetchReturns()
            await onStockUpdated()
            handleCloseModal()
        } catch (error) {
            console.error('Error adding return:', error)
        }
    }

    // Load product options for AsyncPaginate
    const loadOptions = async (search: string, prevOptions: any, additional: any) => {
        const page = additional?.page || 1
        const currentType = additional?.type || formData.returnType

        const filterType = currentType === 'ToStock' ? '4' : 'All'

        const data = await getProduct(stock?.stockId, filterType, page, 10, search)

        const options = data.items.map((p: any) => ({
            value: p.id,
            label: `${p.barcode} | ${p.name} | ${p.supplierName || stock?.suppliarName || 'Unknown Supplier'
                }`,
        }))

        const newCache: any = {}
        data.items.forEach((p: any) => {
            newCache[p.id] = {
                barcode: p.barcode,
                name: p.name,
                supplierName: p.supplierName || stock?.suppliarName || 'N/A',
            }
        })

        setDataCache((prev: any) => ({ ...prev, ...newCache }))

        return {
            options,
            hasMore: page < data.totalPages,
            additional: { page: page + 1, type: currentType },
        }
    }

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const numValue = name === 'quantity' ? (parseInt(value) || 0) : value
        setFormData((prev) => ({ ...prev, [name]: numValue }))
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: '' }))
        }
    }

    // Handle return type change
    const handleReturnTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setFormData((prev) => ({
            ...prev,
            returnType: value,
            productIds: [],
            quantity: 0,
        }))
        setErrors((prev: any) => ({ ...prev, productIds: undefined }))
        setDataCache({})
    }

    // Handle product selection
    const handleProductChange = (selected: any) => {
        let ids: string[] = []

        if (stock?.generateUniqueBarcode) {
            ids = selected ? selected.map((s: any) => s.value) : []
        } else {
            ids = selected ? [selected.value] : []
        }

        setFormData((prev) => ({
            ...prev,
            productIds: ids,
            quantity: stock?.generateUniqueBarcode ? ids.length : prev.quantity,
        }))
    }

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setFormData({
            productIds: [],
            returnType: '',
            narration: '',
            quantity: 0,
        })
        setErrors({})
        setDataCache({})
    }

    return {
        // State
        returns,
        isModalOpen,
        selectedReturn,
        searchTerm,
        isLoading,
        expanded,
        formData,
        errors,
        isFormLoading,
        dataCache,
        conditionOptions,

        // Setters
        setIsModalOpen,
        setSelectedReturn,
        setSearchTerm,
        setExpanded,
        setFormData,

        // Functions
        fetchReturns,
        toggleExpand,
        handleFormSubmit,
        loadOptions,
        handleInputChange,
        handleReturnTypeChange,
        handleProductChange,
        handleCloseModal,
        // Pagination & new props
        filteredReturns,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        handleEdit,
        handleView,
        handleDelete,
    }
}

export default useReturn