import {
    deleteProduct,
    GetAllProduct,
    getProduct,
} from '@/services/ProductService'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'

const useProducts = (stockId?: string) => {
    const navigation = useNavigation<any>()

    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = stockId
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
        navigation.navigate('ProductDetails', { id })
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
    }
}

export default useProducts
