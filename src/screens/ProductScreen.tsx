import { View, Text, ActivityIndicator } from 'react-native'
import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import useProduct from '@/hooks/useProduct'

const ProductScreen = () => {
  const {
    filteredProducts,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    pageSize,
    setPageSize,
    totalPages,
    goToPage,
    handleEdit,
    handleViewDetails,
    handleDelete,
    stats,
  } = useProduct()

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-6 pb-0">
        <MainHeader
          H1Heading="Product Overview"
          Paragraph="Monitor your business metrics and performance"
          BtnText="Add New Item"
          Updates={`${stats.total} Total Products`}
          StutsUpdates={`${stats.available} Available`}
          fullName="John Doe"
          showButton={false}
          showRangePicker={false}
        />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
            <Text className="mt-3 text-gray-500">Loading...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">
              {searchTerm
                ? 'No products match your search'
                : 'No products found'}
            </Text>
          </View>
        ) : (
          <ExcelLikeTable
            data={filteredProducts}
            showStatus
            showButton
            showButtonNavigation
            showDelBtn
            onEdit={handleEdit}
            handleViewDetails={handleViewDetails}
            handleDeleteStock={handleDelete}
          />
        )}
      </View>

      {/* Pagination */}
      <Pagination
        pageNumber={currentPage}
        setPageNumber={goToPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        text="Items per page"
      />
    </View>
  )
}

export default ProductScreen
