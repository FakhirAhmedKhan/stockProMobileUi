import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import useOrders from '@/hooks/useOrders'
import { ActivityIndicator, Text, View } from 'react-native'

export const OrdersTab = ({ stock }: { stock: any }) => {
    const {
        orders,
        isLoading,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        setIsModalOpen,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        handleEdit,
        handleDelete,
        handleView
    } = useOrders(undefined, stock)

    return (
        <View>
            <View className="p-6 pb-0">
                <MainHeader
                    H1Heading="Orders"
                    Paragraph="Track orders for this product"
                    BtnText="Add Order"
                    Updates="0 Updates"
                    StutsUpdates="Active"
                    fullName="John Doe"
                    setIsModalOpen={setIsModalOpen}
                    showButton={true}
                    showRangePicker={false}
                    onPress={() => setIsModalOpen(true)}
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
        </View>
    )
}

export default OrdersTab