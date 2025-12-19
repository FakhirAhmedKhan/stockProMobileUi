import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import ExcelLikeTable from "@/components/ExcelLikeTable";
import { MainHeader } from "@/components/MainHeader";
import OrderModel from "@/components/Models/OrderModel";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import useOrders from "@/hooks/useOrders";
import useOrderForm from '@/hooks/useOrderForm';
import { createOrder, editOrder } from '@/services/OrderService';

export const OrdersTab = ({ stock }: { stock: any }) => {
    const {
        orders,
        isLoading,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        handleDelete,
        handleView,
        handleEdit: onEditOrder,
        fetchOrders,
        selectedOrder,
        setSelectedOrder,
    } = useOrders(stock?.stockId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFormSubmit = async (orderData: any) => {
        try {
            const payload = { ...orderData, stockId: stock.stockId };
            if (selectedOrder) {
                await editOrder({ ...payload, id: selectedOrder.id });
            } else {
                await createOrder(payload);
            }
            fetchOrders();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save order", error);
        }
    };

    const {
        formData,
        formErrors,
        isFormLoading,
        handleInputChange,
        handleFormSubmit: submitForm,
        loadProductOptions,
        loadCustomerOptions,
        setEditingOrder,
        resetForm,
        profit,
        remaining,
        margin,
    } = useOrderForm(handleFormSubmit, stock);

    const handleOpenModal = () => {
        setSelectedOrder(null);
        resetForm();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
        resetForm();
    };

    const handleEdit = (order: any) => {
        onEditOrder(order);
        setEditingOrder(order);
        setIsModalOpen(true);
    };

    return (
        <View>
            <View className="p-6 pb-0">
                <MainHeader
                    H1Heading="Orders"
                    Paragraph="Track orders for this product"
                    BtnText="Add Order"
                    onButtonPress={handleOpenModal}
                    showButton={true}
                />
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </View>
            <View className="flex-1 px-6 pt-4">
                {isLoading ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text className="text-gray-500 mt-3">Loading orders...</Text>
                    </View>
                ) : orders.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-500 text-base">No orders found</Text>
                    </View>
                ) : (
                    <ExcelLikeTable
                        data={orders}
                        showStatus={true}
                        showButton={true}
                        showButtonNavigation={true}
                        showDelBtn={true}
                        onEdit={handleEdit}
                        handleViewDetails={handleView}
                        handleDeleteStock={handleDelete}
                    />
                )}
            </View>

            <View className="p-6">
                <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalPages={totalPages}
                    text="Orders per page"
                />
            </View>

            <OrderModel
                stock={stock}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                handleFormSubmit={submitForm}
                formData={formData}
                formErrors={formErrors}
                isFormLoading={isFormLoading}
                handleInputChange={handleInputChange}
                loadProductOptions={loadProductOptions}
                loadCustomerOptions={loadCustomerOptions}
                profit={profit}
                remaining={remaining}
                margin={margin}
            />
        </View>
    );
};

export default OrdersTab;
