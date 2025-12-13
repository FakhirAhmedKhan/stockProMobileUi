import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import useOders from '@/hooks/useOders';
import SearchBar from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { MainHeader } from '@/components/MainHeader';
import ExcelLikeTable from '@/components/ExcelLikeTable';

const OrdersScreen: React.FC = () => {
  // Handler for when an order is created/updated
  const handleOrderCreated = (order: any) => {
    console.log('Order created/updated:', order);
    // Add your logic here to handle the created order
    // For example, refresh the orders list
    fetchOrders();
  };

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
    fetchOrders,
    handleEdit,
    handleSave,
  } = useOders(handleOrderCreated);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Placeholder functions for view and delete
  const handleView = (order: any) => {
    console.log('View order:', order);
    // Navigate to order details or show modal
  };

  const handleDelete = (orderId: string | number) => {
    console.log('Delete order:', orderId);
    // Implement delete logic
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-0">
        <MainHeader
          H1Heading="Orders Overview"
          Paragraph="Monitor your business metrics and performance in real-time"
          BtnText="Add New Item"
          Updates="5 Updates Today"
          StutsUpdates="System Active"
          fullName="John Doe"
          showButton={false}
          showRangePicker={false}
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
    </View>
  );
};

export default OrdersScreen;