import { useState, useEffect, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    editProduct,
    GetAllProduct,
    getProduct,
    GetProductById,
    deleteProduct,
} from '@/services/ProductService'

const useProduct = (stockId?: string) => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()
    const id = stockId || route.params?.id

    const [products, setProducts] = useState<any[]>([])
    const [product, setProduct] = useState<any>(null)
    const [filteredProducts, setFilteredProducts] = useState<any[]>([])

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<'all' | number>('all')

    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)

    /* ---------------- FETCH PRODUCTS ---------------- */

    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = id
                ? await getProduct(id, 'All', pageNumber, pageSize, searchTerm)
                : await GetAllProduct(pageNumber, pageSize, searchTerm)

            const items = data.items ?? []
            setProducts(items)
            setTotalPages(data.totalPages ?? 1)
            setTotalCount(data.totalCount ?? 0)

            setFilteredProducts(
                selectedStatus === 'all'
                    ? items
                    : items.filter(p => p.status === selectedStatus),
            )
        } catch (err) {
            console.error(err)
            setProducts([])
            setFilteredProducts([])
        } finally {
            setIsLoading(false)
        }
    }, [id, pageNumber, pageSize, searchTerm, selectedStatus])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    useEffect(() => {
        setPageNumber(1)
    }, [searchTerm, id])

    /* ---------------- SINGLE PRODUCT ---------------- */

    useEffect(() => {
        if (!id) return
        setIsLoading(true)
        GetProductById(id)
            .then(res => setProduct(res))
            .finally(() => setIsLoading(false))
    }, [id])

    /* ---------------- ACTIONS ---------------- */

    const handleEdit = (item: any) => {
        setSelectedProduct(item)
        setIsModalOpen(true)
    }

    const handleViewDetails = (productId: string) => {
        navigation.navigate('ProductDetails', { id: productId })
    }

    const handleDelete = async (productId: string) => {
        try {
            setIsLoading(true)
            await deleteProduct(productId)
            fetchProducts()
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages && !isLoading) {
            setPageNumber(page)
        }
    }

    /* ---------------- STATS ---------------- */

    const stats = {
        total: totalCount,
        available: products.filter(p => p.status === 0).length,
        sold: products.filter(p => p.status === 1).length,
    }

    /* ---------------- EXPORT ---------------- */

    return {
        filteredProducts,
        isLoading,
        searchTerm,
        setSearchTerm,

        currentPage: pageNumber,
        pageSize,
        setPageSize,
        totalPages,
        goToPage,
        setPageNumber,
        handleEdit,
        handleViewDetails,
        handleDelete,

        stats,
    }
}

export default useProduct
