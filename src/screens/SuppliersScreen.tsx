import { SupplierFormInputs } from "@/components/Forms/SupplierFormInputs";
import { SupplierModalForm } from "@/components/Models/Suppliers.Model";
import { ActivityIndicator, Text, View } from "react-native";
import ExcelLikeTable from "@/components/ExcelLikeTable";
import { MainHeader } from "@/components/MainHeader";
import { Pagination } from "@/components/Pagination";
import { useSuppliers } from "@/hooks/useSuppliers";
import SearchBar from "@/components/SearchBar";

const SuppliersScreen: React.FC = () => {
  const {
    showSuccess,
    handleInputChange,
    handleSave,
    isSubmitting,
    formData,
    errors,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    suppliers,
    isLoading,
    fetchError,
    currentPage,
    setCurrentPage,
    totalPages,
    isModalOpen,
    setIsModalOpen,
  } = useSuppliers();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-0">
        <MainHeader
          H1Heading="Dashboard Overview"
          Paragraph="Monitor your business metrics and performance in real-time"
          BtnText="Add New Item"
          Updates="5 Updates Today"
          StutsUpdates="System Active"
          fullName="John Doe"
          setIsModalOpen={setIsModalOpen}
          showButton={true}
          showRangePicker={false}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </View>

      <View className="flex-1 px-6 pt-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-500 mt-3">Loading suppliers...</Text>
          </View>
        ) : fetchError ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-red-600 text-base text-center px-4">
              {fetchError}
            </Text>
          </View>
        ) : suppliers.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-base">No suppliers found</Text>
          </View>
        ) : (
          <ExcelLikeTable
            data={suppliers}
            showStatus={true}
            showButton={false}
            showButtonNavigation={true}
            showDelBtn={true}
            columnsToHide={["id", "email", "userId", "createdAt", "action"]}
          />
        )}
      </View>

      {isModalOpen && (
        <View className="p-5">
          <SupplierModalForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            showSuccess={showSuccess}
            handleSave={handleSave}
            isSubmitting={isSubmitting}
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            H2Title="Add Supplier"
            showSuccessText="Supplier added successfully!"
          >
            <SupplierFormInputs
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          </SupplierModalForm>
        </View>
      )}

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

export default SuppliersScreen;
