import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { useProduct } from '@/hooks/useProduct'
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native'

const ProductScreen = () => {
  const {
    filteredProducts,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    handleEdit,
    handleViewDetails,
    handleDelete,
    stats
  } = useProduct()

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-0">
        <MainHeader
          H1Heading="Product Overview"
          Paragraph="Monitor your business metrics and performance in real-time"
          BtnText="Add New Item"
          Updates={`${stats.total} Total Products`}
          StutsUpdates={`${stats.available} Available`}
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
        ) : filteredProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-base">
              {searchTerm ? 'No products found matching your search' : 'No products found'}
            </Text>
          </View>
        ) : (
          <ExcelLikeTable
            data={filteredProducts}
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

      <Pagination
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        text="Items per page"
      />
    </View>
  )
}

export default ProductScreen
