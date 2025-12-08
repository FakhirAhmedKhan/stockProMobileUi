import { useCallback, useEffect, useState } from 'react'
import { defaultFormData, SupplierApiResponse, useDebounce } from './useDebounce'
import { Supplier } from '@/@types/interface'
import { createSupplier, getSupplier } from '../Service/SupplierService'

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
        try {
            const d: SupplierApiResponse = await getSupplier(currentPage, pageSize, debouncedSearch)
            const list = d.suppliers || d.items || []
            setSuppliers(list)
            setTotalCount(d.totalCount ?? list.length)
        } catch (err) {
            console.error("Failed to fetch suppliers:", err)
        } finally {
            setIsLoading(false)
        }
    }, [currentPage, pageSize, debouncedSearch])

    const handleSave = useCallback(async () => {
        try {
            setIsSubmitting(true)
            const newSupplier: Supplier = { ...formData }
            await createSupplier(newSupplier)
            await fetchSuppliers()
            onSave?.(newSupplier)
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                onClose?.()
            }, 3000)
        } catch {
            setErrors({ submit: "Failed to save supplier. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    }, [formData, fetchSuppliers, onSave, onClose])

    useEffect(() => {
        fetchSuppliers()
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
        totalCount,
        currentPage,
        setCurrentPage,
    }
}
