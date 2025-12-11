import { getUserId } from '@/services/AuthService'
import { createSupplier, getSupplier } from '@/services/SupplierService'
import { Supplier } from '@/types/interface'
import { useCallback, useEffect, useRef, useState } from 'react'
import { defaultFormData, SupplierApiResponse, useDebounce } from './useDebounce'

export function useSuppliers(isOpen?: boolean, onClose?: () => void, onSave?: (s: Supplier) => void) {

    const [pageSize, setPageSize] = useState(9)
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [formData, setFormData] = useState(defaultFormData)
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showSuccess, setShowSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fetchError, setFetchError] = useState<string | null>(null)

    // Safety: Track timeout to clear it if component unmounts
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedSearch = useDebounce(searchTerm, 300)

    // FIX: React Native input handler
    const handleInputChange = useCallback((name: string, value: any) => {
        const cleanValue =
            name === 'phoneNumber'
                ? value.replace(/[^\d+]/g, '')
                : value;

        setFormData(prev => ({ ...prev, [name]: cleanValue }))

        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev }
                delete next[name]
                return next
            })
        }
    }, [errors])

    const fetchSuppliers = useCallback(async () => {
        setIsLoading(true)
        setFetchError(null)
        try {
            const d = await getSupplier(currentPage, pageSize, debouncedSearch) as SupplierApiResponse
            const list = d.suppliers || d.items || []
            setSuppliers(list)
            setTotalCount(d.totalCount ?? list.length)
        } catch (err: any) {
            console.error("Failed to fetch suppliers:", err)
            setFetchError(err?.message || 'Failed to load suppliers')
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, pageSize, debouncedSearch])

    const handleSave = useCallback(async () => {
        try {
            setIsSubmitting(true)
            const userId = await getUserId();
            const newSupplier: Supplier = { ...formData, userId }
            await createSupplier(newSupplier)
            await fetchSuppliers()
            onSave?.(newSupplier)
            setShowSuccess(true)

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setShowSuccess(false)
                onClose?.()
            }, 3000)
        } catch (error: any) {
            console.error("Save Error:", error.response?.data || error);
            setErrors({ submit: "Failed to save supplier. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    }, [formData, fetchSuppliers, onSave, onClose])

    useEffect(() => {
        let isActive = true
        const load = async () => {
            if (!isActive) return
            await fetchSuppliers()
        }
        load()
        return () => {
            isActive = false
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [fetchSuppliers])

    useEffect(() => {
        if (isOpen) {
            setFormData(defaultFormData)
            setErrors({})
            setShowSuccess(false)
            setIsSubmitting(false)
        }
    }, [isOpen])

    return {
        showSuccess,
        handleInputChange,
        handleSave,
        isSubmitting,
        formData,
        errors,
        pageSize,
        setPageSize,
        searchTerm,
        setSearchTerm,
        suppliers,
        isLoading,
        fetchError,
        totalCount,
        currentPage,
        setCurrentPage,
    }
}
