import ExcelLikeTable from "@/components/ExcelLikeTable";
import { StockCreateInputs } from "@/components/Forms/StockFromInputs";
import { MainHeader } from "@/components/MainHeader";
import StockCreateModal from "@/components/Models/StockModel";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import useStock from "@/hooks/useStock";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";

const StockScreen: React.FC = () => {
  const {
    filteredStocks,
    isLoading,
    searchTerm,
    setSearchTerm,
    pageNumber: currentPage,
    setPageNumber: setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    handleDeleteStock,
    handleViewDetails,
    isModalOpen,
    setModalOpen, // Ensure this is returned from hook
    submitStock,  // Ensure this is returned from hook
    loadSuppliers,
    showSuccess,
  } = useStock();

  const { control, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      stockTitle: "",
      totalQuantity: "",
      unitPrice: "",
      totalPrice: "",
      totalPaid: "",
      totalRemaining: "",
      supplierId: null,
      storage: "",
      color: "",
      condition: "",
      category: "",
      expiryDate: "",
      generateUniqueBarcode: false,
    }
  });

  const onSubmit = (data: any) => {
    submitStock(data);
    reset(); // Reset form after submit
  };

  // Watch for category to handle conditional logic or do it in component
  // For now let StockFromInputs handle UI logic based on values properly if passed control

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-0">
        <MainHeader
          H1Heading="Stock Overview"
          Paragraph="Monitor your business metrics and performance in real-time"
          BtnText="Add New Item"
          Updates="5 Updates Today"
          StutsUpdates="System Active"
          fullName="John Doe"
          showButton={true}
          showRangePicker={false}
          onPress={() => setModalOpen(true)}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </View>

      <View className="flex-1 px-6 pt-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-500 mt-3">Loading...</Text>
          </View>
        ) : filteredStocks.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-base">
              {searchTerm
                ? "No products found matching your search"
                : "No products found"}
            </Text>
          </View>
        ) : (
          <ExcelLikeTable
            data={filteredStocks}
            showStatus={true}
            showButton={true}
            showButtonNavigation={true}
            showDelBtn={true}
            onEdit={(item: any) => console.log('Edit Stock', item)}
            handleViewDetails={handleViewDetails}
            handleDeleteStock={handleDeleteStock}
          />
        )}
      </View>

      <StockCreateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        handleSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading} // reusing isLoading for submitting state for now, assuming submitStock sets it
        title="Add New Stock"
      >
        <StockCreateInputs
          control={control}
          errors={errors}
          loadSuppliers={loadSuppliers}
          setValue={setValue}
          watch={watch}
        />
      </StockCreateModal>

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

export default StockScreen;
