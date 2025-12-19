import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import useProduct from '@/hooks/useProduct'
import { ActivityIndicator, Text, View } from 'react-native'

export const ProductTab = ({ stockId }: { stockId: string }) => {
    const {
        isLoading,
        products,
        currentPage,
        pageSize,
        totalPages,
        searchTerm,
        setSearchTerm,
        setPageSize,
        setPageNumber,
        isModalOpen,
        setIsModalOpen,
        handleEdit,
        handleDelete,
        handleViewDetails,
        stats,
    } = useProduct(stockId)


    return (
        <View>
            <View className="p-6 pb-0">
                <MainHeader
                    H1Heading="Products"
                    Paragraph="Managing specific product variants"
                    BtnText="Add Product"
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
                        <Text className="text-gray-500 mt-3">Loading products...</Text>
                    </View>
                ) : products.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-gray-500 text-base">No products found</Text>
                    </View>
                ) : (
                    <ExcelLikeTable
                        data={products}
                        showStatus={true}
                        showButton={true}
                        showButtonNavigation={true}
                        showDelBtn={true}
                        onEdit={handleEdit}
                        handleViewDetails={handleViewDetails}
                        handleDeleteStock={handleDelete}
                    />
                )}
            </View>
            <View className="p-6">
                <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setPageNumber}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalPages={totalPages}
                    text="Products per page"
                />
            </View>
        </View>
    )
}

export default ProductTab