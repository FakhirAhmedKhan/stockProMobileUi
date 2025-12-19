import { ActivityIndicator, Text, View } from 'react-native'
import ExcelLikeTable from '@/components/ExcelLikeTable'
import { MainHeader } from '@/components/MainHeader'
import { Pagination } from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import useProducts from '@/hooks/useProduct'

const ProductScreen = () => {
  const {
    products,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    pageSize,
    setPageSize,
    totalPages,
    setPageNumber,
    handleViewDetails,
    handleDelete,
    stats,
  } = useProducts()

  return (
    <View className="flex-1 bg-gray-50">
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

      <View className="flex-1 px-6 pt-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" />
            <Text className="mt-3 text-gray-500">Loading...</Text>
          </View>
        ) : products.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">
              {searchTerm
                ? 'No products match your search'
                : 'No products found'}
            </Text>
          </View>
        ) : (
          <ExcelLikeTable
            data={products}
            showStatus
            showButton
            showButtonNavigation
            showDelBtn
            handleViewDetails={handleViewDetails}
            handleDeleteStock={handleDelete}
            columnsToHide={[
              'id',
              'barcode', 
              'stockId',
              'userId',
              'status',
              'createdAt',
              'updatedAt',
            ]}  
          />
        )}
      </View>

      <Pagination
        pageNumber={currentPage}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        text="Items per page"
      />
    </View>
  )
}

export default ProductScreen
