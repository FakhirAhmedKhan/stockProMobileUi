import { Customer, Supplier } from '@/types/interface'
import { useEffect, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
    const [v, setV] = useState(value)
    useEffect(() => {
        const id = setTimeout(() => setV(value), delay)
        return () => clearTimeout(id)
    }, [value, delay])
    return v
}

export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/
export const defaultFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    activeStatus: true,
}
export interface CustomerApiResponse {
    customers?: Customer[]
    items?: Customer[]
    totalCount: number
}

export interface SupplierApiResponse {
    suppliers?: Supplier[]
    items?: Supplier[]
    totalCount: number
}
