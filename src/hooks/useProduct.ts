import {
    deleteProduct,
    editProduct,
    GetAllProduct,
    getProduct,
    GetProductById,
} from '@/services/ProductService'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
// import { validateAllFields } from '@/utils/validateField'

export const useProduct = (stockId?: string) => {
    const navigation = useNavigation<any>()
    const route = useRoute<any>()

    const id = stockId || route.params?.id

    const [products, setProducts] = useState<any[]>([])
    const [product, setProduct] = useState<any>(null)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)

    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [isLoading, setIsLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [errors, setErrors] = useState<any>({})

    const [formData, setFormData] = useState({
        name: '',
        storage: '',
        price: '',
        color: '',
        barcode: '',
        condition: '',
        category: '',
    })

    /* ---------- Fetch Products ---------- */
    const fetchProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            const data: any = id
                ? await getProduct(id, 'All', pageNumber, pageSize, searchTerm)
                : await GetAllProduct(pageNumber, pageSize, searchTerm)

            setProducts(data.items ?? [])
            setTotalPages(data.totalPages ?? 1)
            setTotalCount(data.totalCount ?? 0)
        } catch {
            setProducts([])
        } finally {
            setIsLoading(false)
        }
    }, [id, pageNumber, pageSize, searchTerm])

    useEffect(() => { fetchProducts() }, [fetchProducts])
    useEffect(() => { setPageNumber(1) }, [id, searchTerm])

    /* ---------- Single Product ---------- */
    useEffect(() => {
        if (!id) return
        setIsLoading(true)
        GetProductById(id)
            .then(setProduct)
            .finally(() => setIsLoading(false))
    }, [id])

    /* ---------- Form ---------- */
    useEffect(() => {
        if (!selectedProduct) return
        setFormData({
            name: selectedProduct.name ?? '',
            storage: selectedProduct.storage ?? '',
            price: String(selectedProduct.price ?? ''),
            color: selectedProduct.color ?? '',
            barcode: selectedProduct.barcode ?? '',
            condition: selectedProduct.condition ?? '',
            category: selectedProduct.category ?? '',
        })
    }, [selectedProduct])

    const handleChange = (name: string, value: string) => {
        setFormData(p => ({ ...p, [name]: value }))
        if (errors[name]) setErrors((e: any) => ({ ...e, [name]: '' }))
    }

    const handleFormSubmit = async () => {
        const required = ['name', 'storage', 'price', 'barcode', 'condition', 'color', 'category']
        // const validationErrors = validateAllFields(formData, required)
        if (Object.keys({}).length) {
            setErrors({})
            return
        }

        await editProduct({
            ...formData,
            id: selectedProduct?.id,
            stockId: id,
        })

        setIsModalOpen(false)
        setSelectedProduct(null)
        fetchProducts()
    }

    /* ---------- Actions ---------- */
    const handleEdit = (product: any) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const handleView = (product: any) => {
        navigation.navigate('ProductDetails', { id: product.id })
    }

    const handleDelete = async (id: string) => {
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteProduct(id)
                            fetchProducts()
                        } catch (error) {
                            console.error("Failed to delete product", error)
                        }
                    }
                }
            ]
        )
    }

    /* ---------- Helpers ---------- */
    const filteredProducts = products.filter(p =>
        selectedStatus === 'all' ? true : p.status === selectedStatus,
    )

    const stats = {
        total: totalCount,
        available: products.filter(p => p.status === 0).length,
        sold: products.filter(p => p.status === 1).length,
        value: products.reduce((s, p) => s + Number(p.price || 0), 0),
    }

    const handleViewDetails = (id: string) =>
        navigation.navigate('ProductDetails', { id })

    return {
        products,
        filteredProducts,
        stats,
        isLoading,
        currentPage: pageNumber, // Alias for Screen
        pageNumber, // Keep original just in case
        totalPages,
        setPageNumber,
        setCurrentPage: setPageNumber, // Alias for Screen
        setPageSize,
        pageSize,
        searchTerm,
        setSearchTerm,
        selectedStatus,
        setSelectedStatus,
        isModalOpen,
        setIsModalOpen,
        selectedProduct,
        setSelectedProduct,
        formData,
        errors,
        handleChange,
        handleFormSubmit,
        handleViewDetails,
        handleView, // Alias for Screen
        handleEdit,
        handleDelete,
        product, // Added return
    }
}
