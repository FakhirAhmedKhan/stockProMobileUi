import type { FormData, RepairingDto, SelectOption } from '@/@types/Types'
import { useErrorPopup } from '@/NotificationSystem/Notification System'
import { getProduct } from '@/services/ProductService'
import {
    completeRepairing,
    create,
    getInRepairinglist,
    getRepairing,
    getRepairingById,
} from '@/services/RepairServices'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'

const useRepairing = (stock: any, onStockUpdated: () => void) => {
    const { addError } = useErrorPopup()

    const [repairingData, setRepairingData] = useState<RepairingDto[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalState, setModalState] = useState<{
        open: boolean
        mode: 'send' | 'back'
    }>({
        open: false,
        mode: 'send',
    })
    const [selectedRepairing, setSelectedRepairing] = useState<any | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [tableKey, setTableKey] = useState(0)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [filteredRepairing, setFilteredRepairing] = useState<any[]>([])

    // Form state
    const createInitialState = (): FormData => ({
        naration: '',
        cost: 0,
        barcodes: [],
        repairId: null,
        productId: null,
        status: { value: 'Repaired', label: 'Repaired' },
        technician: '',
    })

    const [formData, setFormData] = useState<FormData>(createInitialState())
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isFormLoading, setIsFormLoading] = useState(false)
    const [repairingList, setRepairingList] = useState<SelectOption[]>([])
    const [repairItems, setRepairItems] = useState<SelectOption[]>([])
    const [dataCache, setDataCache] = useState<Record<string, { label: string }>>({})

    const hasFetched = useRef(false)

    // Fetch repairing data
    const fetchRepairing = useCallback(async () => {
        if (!stock?.stockId) return
        setIsLoading(true)
        try {
            const data: any = await getRepairing(String(stock.stockId))
            const list = Array.isArray(data)
                ? data
                : (data?.items ?? data?.repairs ?? [])
            setRepairingData(list)
        } catch (err) {
            console.error('Error fetching repairing data:', err)
            addError('Failed to fetch repairing data.', 'api')
        } finally {
            setIsLoading(false)
        }
    }, [stock?.stockId, addError])

    useEffect(() => {
        fetchRepairing()
    }, [fetchRepairing])

    // Filter and Paginate
    useEffect(() => {
        let result = resizingDataToArray(repairingData)
        if (searchTerm) {
            const lower = searchTerm.toLowerCase()
            result = result.filter((r: any) =>
                (r.narration?.toLowerCase().includes(lower)) ||
                (r.technician?.toLowerCase().includes(lower)) ||
                (r.status?.toLowerCase().includes(lower))
            )
        }

        setTotalPages(Math.ceil(result.length / pageSize) || 1)

        const start = (currentPage - 1) * pageSize
        setFilteredRepairing(result.slice(start, start + pageSize))
    }, [repairingData, searchTerm, currentPage, pageSize])

    const resizingDataToArray = (data: any) => {
        if (Array.isArray(data)) return data
        if (data?.items && Array.isArray(data.items)) return data.items
        if (data?.repairs && Array.isArray(data.repairs)) return data.repairs
        return []
    }

    // Handlers
    const handleEdit = (item: any) => {
        setSelectedRepairing(item)
        setModalState({ open: true, mode: 'back' }) // Assuming edit means processing back from repair? Or maybe just view?
    }

    const handleView = (item: any) => {
        console.log("View Repair", item)
    }

    const handleDelete = (id: string) => {
        Alert.alert("Delete Repair Record", "Are you sure? This action cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete", style: "destructive", onPress: () => {
                    console.log("Delete repair", id)
                }
            }
        ])
    }

    // Fetch repairing list for back mode
    const fetchRepairingList = useCallback(async () => {
        if (!stock?.stockId) return
        try {
            setIsFormLoading(true)
            const data = await getInRepairinglist(stock.stockId)
            const mapped = data.map((r: any) => ({
                value: r.id,
                label: r.narration || `Repair #${r.id.slice(0, 8)}`,
            }))
            setRepairingList(mapped)
        } catch (err) {
            console.error('Error fetching repairing list:', err)
        } finally {
            setIsFormLoading(false)
        }
    }, [stock?.stockId])

    // Modal open/close watcher
    useEffect(() => {
        if (!modalState.open) {
            resetForm()
            hasFetched.current = false
            return
        }

        if (modalState.mode === 'back' && !hasFetched.current) {
            hasFetched.current = true
            fetchRepairingList()
        }
    }, [modalState.open, modalState.mode, fetchRepairingList])

    // Product loader for AsyncPaginate
    const loadProductOptions = async (
        search: string,
        prevOptions: SelectOption[],
        { page }: { page: number }
    ) => {
        const data = await getProduct(stock?.stockId, 'NotInRepair', page, 10, search)

        const options: SelectOption[] = data.items.map((p: any) => ({
            value: p.id,
            label: `${p.barcode} | ${p.name} | ${stock?.suppliarName}`,
        }))

        const newCache = options.reduce((acc, option) => {
            acc[option.value] = { label: option.label }
            return acc
        }, {} as Record<string, { label: string }>)
        setDataCache((prev) => ({ ...prev, ...newCache }))

        return {
            options,
            hasMore: page < data.totalPages,
            additional: { page: page + 1 },
        }
    }

    // Reset form
    const resetForm = () => {
        setFormData(createInitialState())
        setErrors({})
        setRepairItems([])
    }

    // Handle repairing record change
    const handleRepairChange = async (selected: SelectOption | null) => {
        setFormData((prev) => ({ ...prev, repairId: selected, productId: null }))
        setRepairItems([])

        if (!selected) return
        try {
            setIsFormLoading(true)
            const res = await getRepairingById(selected.value)
            const items = res.items
                .filter(
                    (item: any) =>
                        item.itemStatus !== 'Repaired' && item.itemStatus !== 'Scrap'
                )
                .map((item: any) => ({
                    value: item.productId,
                    label: item.barcode,
                }))
            setRepairItems(items)
        } catch (err) {
            console.error('Error fetching repair details:', err)
        } finally {
            setIsFormLoading(false)
        }
    }

    // Validation
    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {}

        if (!formData.naration.trim()) newErrors.naration = 'Narration is required.'

        if (modalState.mode === 'send') {
            if (formData.barcodes.length === 0)
                newErrors.barcodes = 'At least one product is required.'
            if (!formData.technician.trim())
                newErrors.technician = 'Technician name is required.'
        } else if (modalState.mode === 'back') {
            if (!formData.repairId)
                newErrors.repairId = 'A repairing record must be selected.'
            if (!formData.productId)
                newErrors.productId = 'A repaired product must be selected.'
            if (
                formData.status.value === 'Repaired' &&
                (!formData.cost || formData.cost <= 0)
            )
                newErrors.cost = 'Cost must be greater than 0.'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData, modalState.mode])

    // Handle field change
    const handleChange = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    // Handle input change for text inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        const numValue = name === 'cost' ? (parseFloat(value) || 0) : value
        handleChange(name as keyof FormData, numValue)
    }

    // Handle submit
    const handleFormSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            let dataToSave
            if (modalState.mode === 'send') {
                dataToSave = {
                    stockId: stock?.stockId,
                    naration: formData.naration,
                    technician: formData.technician,
                    productIds: formData.barcodes.map((b) => b.value),
                    barcodes: formData.barcodes.map((b) => b.label),
                }
            } else {
                dataToSave = {
                    repairId: formData.repairId?.value,
                    narration: formData.naration,
                    cost: Number(formData.cost),
                    updates: {
                        [formData.productId!.value]: {
                            status: formData.status.value,
                            cost: Number(formData.cost),
                        },
                    },
                }
            }

            const apiCall = modalState.mode === 'send' ? create : completeRepairing
            await apiCall(dataToSave)
            await fetchRepairing()
            onStockUpdated()
            setTableKey((prev) => prev + 1)
            handleCloseModal()
        } catch (error: any) {
            console.error('Error saving repair request:', error)
            if (error.response?.data?.Message) {
                addError(error.response.data.Message, 'api')
            } else {
                addError('Something went wrong while saving repair.', 'api')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const openModal = (mode: 'send' | 'back') => {
        setModalState({ open: true, mode })
    }

    const handleCloseModal = () => {
        setModalState({ ...modalState, open: false })
        setSelectedRepairing(null)
        resetForm()
    }

    return {
        // State
        modalState,
        selectedRepairing,
        searchTerm,
        repairingData,
        filteredRepairing,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        handleEdit,
        handleView,
        handleDelete,
        isLoading,
        isSubmitting,
        tableKey,
        formData,
        errors,
        isFormLoading,
        repairingList,
        repairItems,
        dataCache,

        // Setters
        setModalState,
        setSelectedRepairing,
        setSearchTerm,
        setFormData,

        // Functions
        fetchRepairing,
        openModal,
        handleCloseModal,
        loadProductOptions,
        handleRepairChange,
        handleChange,
        handleInputChange,
        handleFormSubmit,
    }
}

export default useRepairing