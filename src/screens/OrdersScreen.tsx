import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import ExcelLikeTable from '@/components/ExcelLikeTable';
import { MainHeader } from '@/components/MainHeader';
import { Pagination } from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import useOrders from '@/hooks/useOrders';
import OrderModel from '@/components/Models/OrderModel';
import useOrderForm from '@/hooks/useOrderForm';
import { createOrder, editOrder } from '@/services/OrderService';

const OrdersScreen: React.FC = () => {
    const {
        orders,
        isLoading,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalCount,
        totalPages,
        handleDelete,
        handleView,
        handleEdit: onEditOrder,
        fetchOrders,
        selectedOrder,
        setSelectedOrder,
    } = useOrders();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFormSubmit = async (orderData: any) => {
        try {
            if (selectedOrder) {
                await editOrder({ ...orderData, id: selectedOrder.id });
            } else {
                await createOrder(orderData);
            }
            fetchOrders();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save order", error);
            // Here you could set a form error
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
    } = useOrderForm(handleFormSubmit);

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
        <View className="flex-1 bg-gray-50">
            <View className="p-6 pb-0">
                <MainHeader
                    H1Heading="Orders Overview"
                    Paragraph="Monitor your business metrics and performance in real-time"
                    BtnText="Add New Item"
                    onButtonPress={handleOpenModal}
                    showButton={true} // Show the button now
                />
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </View>

            <View className="flex-1 px-6 pt-4">
                {isLoading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text className="text-gray-500 mt-3">Loading...</Text>
                    </View>
                ) : orders.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-gray-500 text-base">
                            {searchTerm ? 'No orders found matching your search' : 'No orders found'}
                        </Text>
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

            <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPages={totalPages}
                text="Items per page"
            />
            
            <OrderModel
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
                isSubmitting={isFormLoading}
            />
        </View>
    );
};

export default OrdersScreen;