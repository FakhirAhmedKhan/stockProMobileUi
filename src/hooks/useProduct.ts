import { navigate } from '@/navigation/NavigationService'
import {
    createProduct,
    deleteProduct,
    GetAllProduct,
    getProduct,
} from '@/services/ProductService'
import { useCallback, useEffect, useState } from 'react'

const useProducts = (stockId?: string) => {

    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const [formData, setFormData] = useState<any>({
        name: '',
        storage: '',
        price: '',
        barcode: '',
        condition: '',
        color: '',
        category: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            const data: any = stockId
                ? await getProduct(stockId, 'All', pageNumber, pageSize, searchTerm)
                : await GetAllProduct(pageNumber, pageSize, searchTerm)

            setProducts(data.items ?? [])
            setTotalPages(data.totalPages ?? 1)
            setTotalCount(data.totalCount ?? 0)
        } finally {
            setIsLoading(false)
        }
    }, [stockId, pageNumber, pageSize, searchTerm])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    useEffect(() => {
        setPageNumber(1)
    }, [searchTerm, stockId])

    const handleDelete = async (id: string) => {
        await deleteProduct(id)
        fetchProducts()
    }

    const handleViewDetails = (id: string) => {
        navigate('ProductDetails', { id })
    }

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev }
                delete next[name]
                return next
            })
        }
    }

    const handleFormSubmit = async () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name) newErrors.name = 'Product name is required'
        if (!formData.price) newErrors.price = 'Price is required'
        if (!formData.barcode) newErrors.barcode = 'Barcode is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsSubmitting(true)
        try {
            const payload = {
                ...formData,
                stockId: stockId,
                price: parseFloat(formData.price),
                status: 0
            }
            await createProduct(payload)
            await fetchProducts()
            setFormData({
                name: '',
                storage: '',
                price: '',
                barcode: '',
                condition: '',
                color: '',
                category: '',
            })
            return true // Success
        } catch (error) {
            console.error('Save Product Error:', error)
            setErrors({ submit: 'Failed to save product' })
            return false
        } finally {
            setIsSubmitting(false)
        }
    }

    const stats = {
        total: totalCount,
        available: products.filter((p: any) => p.status === 0).length,
        sold: products.filter((p: any) => p.status === 1).length,
    }

    return {
        products,
        isLoading,

        searchTerm,
        setSearchTerm,

        currentPage: pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        totalPages,

        handleDelete,
        handleViewDetails,
        stats,

        // Form
        formData,
        errors,
        isSubmitting,
        handleChange,
        handleFormSubmit,
        fetchProducts,
    }
}

export default useProducts
