import ExcelLikeTable from '@/components/ExcelLikeTable';
import { MainHeader } from '@/components/MainHeader';
import { Pagination } from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import useOders from '@/hooks/useOders';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

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
    fetchOrders,
    handleEdit,
    handleSave,
    // handleOrderCreated, // Not returned by hook
    totalPages,
    handleView,
    handleDelete,

  } = useOders();


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