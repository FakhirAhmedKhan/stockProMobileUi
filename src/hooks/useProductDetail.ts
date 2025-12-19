import { useEffect, useState } from 'react'
import { GetProductById } from '@/services/ProductService'

const useProductDetail = (productId: string) => {
    const [product, setProduct] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!productId) return
        setIsLoading(true)

        GetProductById(productId)
            .then(setProduct)
            .finally(() => setIsLoading(false))
    }, [productId])

    return { product, isLoading }
}

export default useProductDetail
