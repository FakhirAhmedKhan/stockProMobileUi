import { navigate } from '@/navigation/NavigationService';
import { deleteStock, getStockDetails, getStocks, postStock } from '@/services/StockService';
import { getSupplier } from '@/services/SupplierService';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';


const useStock = (stockId?: string) => {
    const [stocks, setStocks] = useState<any[]>([]);
    const [stock, setStock] = useState<any>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);


    const fetchStockDetails = useCallback(async () => {
        if (!stockId) return;
        setIsLoading(true);
        try {
            const data = await getStockDetails(stockId);
            setStock(data);
        } catch (e) {
            console.error('Fetch stock failed', e);
        } finally {
            setIsLoading(false);
        }
    }, [stockId]);


    const fetchStocks = useCallback(async () => {
        setIsLoading(true);
        try {
            const data: any = await getStocks(pageNumber, pageSize, searchTerm);
            // ✅ Ensure each item has an 'id' for ExcelLikeTable
            const mappedItems = (data?.items ?? []).map((s: any) => ({
                ...s,
                id: s.id || s.stockId
            }));
            setStocks(mappedItems);
            setTotalPages(data?.totalPages ?? 1);
        } catch (error) {
            console.error('Error fetching stocks:', error);
            setStocks([]);
        } finally {
            setIsLoading(false);
        }
    }, [pageNumber, pageSize, searchTerm]);


    useEffect(() => {
        stockId ? fetchStockDetails() : fetchStocks();
    }, [stockId, fetchStockDetails, fetchStocks]);


    const handleViewDetails = (id: string) => {
        console.log('Navigating to StockDetails with ID:', id);
        navigate('StockDetails', { stockId: id });
    };


    const handleDeleteStock = async (id: string) => {
        Alert.alert('Delete', 'Are you sure?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deleteStock(id);
                    fetchStocks();
                },
            },
        ]);
    };


    const filteredStocks = useMemo(() => {
        if (!searchTerm) return stocks;
        return stocks.filter(s =>
            s.stockTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.suppliarName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [stocks, searchTerm]);

    const submitStock = async (newStock: any) => {
        setIsLoading(true);
        try {
            // Mapping for backend if needed
            const payload = {
                ...newStock,
                Expiery: newStock.category === "Food" ? new Date(newStock.expiryDate) : null,
                supplierId: newStock.supplierId?.value || newStock.supplierId,
                stockPrice: parseFloat(newStock.totalPrice) || (newStock.totalQuantity * newStock.unitPrice),
            };

            await postStock(payload);
            await fetchStocks();
            setModalOpen(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error submitting stock:', error);
            Alert.alert('Error', 'Failed to add stock. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const loadSuppliers = async (search: string, _prevOptions: any, { page }: { page: number }) => {
        try {
            const data: any = await getSupplier(page, 10, search);
            return {
                options: (data.items ?? []).map((s: any) => ({ value: s.id, label: s.name })),
                hasMore: page < data.totalPages,
                additional: { page: page + 1 },
            };
        } catch {
            return { options: [], hasMore: false, additional: { page } };
        }
    };


    return {
        // list
        stocks,
        filteredStocks,


        // details
        stock,
        stockId,


        // actions
        fetchStockDetails,
        handleViewDetails,
        handleDeleteStock,
        submitStock,
        loadSuppliers,


        // ui
        isLoading,
        isModalOpen,
        setModalOpen,
        showSuccess,
        searchTerm,
        setSearchTerm,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        totalPages,
    };
};


export default useStock;