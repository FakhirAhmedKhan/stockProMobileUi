import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import useReturn from '@/hooks/useReturn'
import { ActivityIndicator, Text, View } from 'react-native'

export const ReturnsTab = ({ stock, onStockUpdated }: { stock: any, onStockUpdated: () => void }) => {
    const {
        filteredReturns,
        isLoading,
        searchTerm,
        setSearchTerm,
        setIsModalOpen,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        handleEdit,
        handleDelete,
        handleView
    } = useReturn(stock, onStockUpdated)

    return (
        <View>
            <View className="p-6 pb-0">
                <MainHeader
                    H1Heading="Returns"
                    Paragraph="Track returned items"
                    BtnText="New Return"
                    Updates="System Active"
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
                        <Text className="text-gray-500 mt-3">Loading returns...</Text>
                    </View>
                ) : filteredReturns.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-500 text-base">No returns found</Text>
                    </View>
                ) : (
                    <ExcelLikeTable
                        data={filteredReturns}
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
                    text="Returns per page"
                />
            </View>
        </View>
    )
}

export default ReturnsTab