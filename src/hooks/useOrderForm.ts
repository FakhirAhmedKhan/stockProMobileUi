
import { getCustomers } from '@/services/CustomerService';
import { getProduct } from '@/services/ProductService';
import { getStockById } from '@/services/StockService';
import { useCallback, useEffect, useMemo, useState } from 'react';

// It's good practice to define interfaces for your data structures.
// These are inferred from the existing useOrders hook.
export interface OrderFormState {
    stockTitle: string;
    totalQuantity: number;
    stockPrice: number;
    customerId: string | number;
    stockId: string | number;
    baseUnitPrice: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    paymentStatus: string;
    productIds: any[];
    totalPaid: number;
}

export interface Product {
    id: string | number;
    barcode: string;
    name: string;
}

export interface Customer {
    id: string | number;
    name: string;
}

export interface Stock {
    stockId: string | number;
    stockTitle: string;
    quantityAvailable: number;
    stockPrice: number;
    unitPrice: number | string;
    suppliarName?: string;
}


const useOrderForm = (
    onFormSubmit: (orderData: any) => void,
    initialStock?: Stock,
) => {
    const initialFormState: OrderFormState = {
        stockTitle: initialStock?.stockTitle || '',
        totalQuantity: initialStock?.quantityAvailable || 0,
        stockPrice: initialStock?.stockPrice || 0,
        customerId: '',
        stockId: initialStock?.stockId || '',
        baseUnitPrice: Number(initialStock?.unitPrice) || 0,
        quantity: 0,
        unitPrice: Number(initialStock?.unitPrice) || 0,
        totalPrice: 0,
        paymentStatus: 'Paid',
        productIds: [],
        totalPaid: 0,
    };

    const [formData, setFormData] = useState<OrderFormState>(initialFormState);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [dataCache, setDataCache] = useState<Record<string | number, any>>({});
    const [isFormLoading, setIsFormLoading] = useState(false);

    useEffect(() => {
        if (initialStock?.stockId) {
            fetchStockById(initialStock.stockId);
        }
    }, [initialStock?.stockId]);

    const fetchStockById = useCallback(async (id: string | number) => {
        try {
            setIsFormLoading(true);
            const stockData: any = await getStockById(id as number);
            setFormData((prev: any) => ({
                ...prev,
                stockTitle: stockData.stockTitle,
                totalQuantity: stockData.quantityAvailable,
                stockPrice: stockData.stockPrice,
                stockId: stockData.stockId,
                unitPrice: Number(stockData.unitPrice) || 0,
                baseUnitPrice: Number(stockData.unitPrice) || 0,
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setIsFormLoading(false);
        }
    }, []);

    const handleInputChange = (name: keyof OrderFormState, value: string | number | any[]) => {
        const updated = { ...formData, [name]: value };

        const qty = Number(updated.quantity) || 0;
        const unit = Number(updated.unitPrice) || 0;
        const total = Number(updated.totalPrice) || 0;

        if (name === 'quantity' || name === 'unitPrice') {
            updated.totalPrice = parseFloat((qty * unit).toFixed(4));
        } else if (name === 'totalPrice') {
            if (qty > 0) {
                updated.unitPrice = parseFloat((total / qty).toFixed(4));
            }
        }

        if (name === 'totalPaid' && typeof updated.totalPaid === 'number' && typeof updated.totalPrice === 'number' && updated.totalPaid > updated.totalPrice) {
            updated.totalPaid = updated.totalPrice;
        }

        setFormData(updated);

        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    const handleFormSubmit = () => {
        // Basic validation can be added here before submitting
        onFormSubmit({
            stockTitle: formData.stockTitle,
            quantity: formData.quantity,
            totalPrice: formData.totalPrice,
            customerId: formData.customerId,
            stockId: formData.stockId,
            unitPrice: formData.unitPrice,
            productIds: formData.productIds,
            totalAmountPaid: formData.totalPaid,
        });
        resetForm();
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setFormErrors({});
    };

    const setEditingOrder = (order: any) => {
        setFormData({
            stockTitle: order.stockTitle || '',
            totalQuantity: 0, // This might need to be fetched or passed
            stockPrice: 0, // This might need to be fetched or passed
            customerId: order.customerId || '',
            stockId: order.stockId || '',
            baseUnitPrice: order.baseUnitPrice || 0,
            quantity: order.quantity || 0,
            unitPrice: order.unitPrice || 0,
            totalPrice: order.totalPrice || 0,
            paymentStatus: order.paymentStatus || 'Paid',
            productIds: order.productIds || [],
            totalPaid: order.totalAmountPaid || 0,
        });
    };

    const loadProductOptions = async (search: string, _: any, additional: any) => {
        const page = additional?.page || 1;
        // Check if stockId is present and valid before fetching
        if (!formData.stockId) return { options: [], hasMore: false };

        const data: any = await getProduct(formData.stockId as string, 'AvailableForSale', page, 10, search);
        const options = data?.items?.map((p: Product) => ({
            value: p.id,
            label: `${p.barcode} | ${p.name} | ${initialStock?.suppliarName}`,
        })) || [];

        const newCache = Object.fromEntries((data?.items || []).map((p: Product) => [p.id, { barcode: p.barcode }]));
        setDataCache((prev) => ({ ...prev, ...newCache }));
        return { options, hasMore: page < (data?.totalPages || 1), additional: { page: page + 1 } };
    };

    const loadCustomerOptions = async (search: string, _: any, additional: any) => {
        const page = additional?.page || 1;
        const data: any = await getCustomers(page, 10, search);
        const options = data.items.map((c: Customer) => ({
            value: c.id,
            label: c.name,
        }));
        const cache = Object.fromEntries(data.items.map((c: Customer) => [c.id, { name: c.name }]));
        setDataCache((prev) => ({ ...prev, ...cache }));
        return {
            options,
            hasMore: page < data.totalPages,
            additional: { page: page + 1 },
        };
    };

    const profit = useMemo(() => {
        const base = Number(formData.baseUnitPrice) || 0;
        const qty = Number(formData.quantity) || 0;
        const total = Number(formData.totalPrice) || 0;
        return total - qty * base;
    }, [formData.baseUnitPrice, formData.quantity, formData.totalPrice]);

    const remaining = useMemo(() => {
        const total = Number(formData.totalPrice) || 0;
        const paid = Number(formData.totalPaid) || 0;
        return total - paid;
    }, [formData.totalPrice, formData.totalPaid]);

    const margin = useMemo(() => {
        const base = Number(formData.baseUnitPrice) || 0;
        const qty = Number(formData.quantity) || 0;
        const totalBase = base * qty;
        return totalBase > 0 ? ((profit / totalBase) * 100).toFixed(1) : '0.0';
    }, [profit, formData.baseUnitPrice, formData.quantity]);

    return {
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        isFormLoading,
        handleInputChange,
        handleFormSubmit,
        resetForm,
        loadProductOptions,
        loadCustomerOptions,
        setEditingOrder,
        profit,
        remaining,
        margin,
        dataCache, // You might not need to expose dataCache
    };
};

export default useOrderForm;
