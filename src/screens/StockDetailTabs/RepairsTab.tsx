import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import useRepairing from '@/hooks/useRepairing'
import { ActivityIndicator, Text, View } from 'react-native'

export const RepairsTab = ({ stock, onStockUpdated }: { stock: any, onStockUpdated: () => void }) => {
    const {
        filteredRepairing,
        isLoading,
        searchTerm,
        setSearchTerm,
        openModal,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        handleEdit,
        handleDelete,
        handleView
    } = useRepairing(stock, onStockUpdated)

    return (
        <View>
            <View className="p-6 pb-0">
                <MainHeader
                    H1Heading="Repairs"
                    Paragraph="Track repair status"
                    BtnText="New Repair"
                    Updates="System Active"
                    StutsUpdates="Active"
                    fullName="John Doe"
                    setIsModalOpen={() => openModal('send')}
                    showButton={true}
                    showRangePicker={false}
                    onPress={() => openModal('send')}
                />

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </View>
            <View className="flex-1 px-6 pt-4">
                {isLoading ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text className="text-gray-500 mt-3">Loading repairs...</Text>
                    </View>
                ) : filteredRepairing.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-500 text-base">No repairs found</Text>
                    </View>
                ) : (
                    <ExcelLikeTable
                        data={filteredRepairing}
                        showStatus={true}
                        showButton={true}
                        showButtonNavigation={true}
                        showDelBtn={true}
                        onEdit={handleEdit}
                        handleViewDetails={handleView}
                        handleDeleteStock={handleDelete} // Using handleDelete from hook
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
                    text="Repairs per page"
                />
            </View>
        </View>
    )
}

export default RepairsTab