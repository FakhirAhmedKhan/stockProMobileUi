import SearchBar from "@/components/SearchBar";
import { useCustomers } from "@/hooks/useCustomer";
import { MainHeader } from "@/components/MainHeader";
import { Pagination } from "@/components/Pagination";
import ExcelLikeTable from "@/components/ExcelLikeTable";
import { ActivityIndicator, Text, View } from "react-native";
import { CustomerModalForm } from "@/components/Models/CustomerModel";
import { CustomerFormInputs } from "@/components/Forms/CustomerFormInputs";

const CustomerScreen: React.FC = () => {
  const {
    showSuccess,
    handleEdit,
    handleSave,
    isSubmitting,
    formData,
    errors,
    setIsModalOpen,
    pageSize,
    setPageSize,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    customers,
    isLoading,
    totalCount,
    currentPage,
    setCurrentPage,
    fetchError,
  } = useCustomers();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 pb-0">
        <MainHeader
          H1Heading="Customer Overview"
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
            <Text className="text-gray-500 mt-3">Loading customers...</Text>
          </View>
        ) : fetchError ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-red-600 text-base text-center px-4">
              {fetchError}
            </Text>
          </View>
        ) : customers.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-base">No customers found</Text>
          </View>
        ) : (
          <ExcelLikeTable
            data={customers}
            showStatus={true}
            showButton={true}
            showButtonNavigation={true}
            showDelBtn={true}
            onEdit={handleEdit}
            handleViewDetails={() => {}}
            handleDeleteStock={() => {}}
          />
        )}
      </View>
      {isModalOpen && (
        <View className="p-5">
          <CustomerModalForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            showSuccess={showSuccess}
            handleSave={handleSave}
            isSubmitting={isSubmitting}
            formData={formData}
            errors={errors}
            handleInputChange={(field, value) => {
              formData[field] = value;
            }}
            H2Title="Add Customer"
            showSuccessText="Customer added successfully!"
          >
            <CustomerFormInputs
              formData={formData}
              errors={errors}
              handleInputChange={(field, value) => {
                formData[field] = value;
              }}
            />
          </CustomerModalForm>
        </View>
      )}
      <View className="p-6">
        <Pagination
          pageNumber={currentPage}
          setPageNumber={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalPages={Math.ceil(totalCount / pageSize)}
          text="Items per page"
        />
      </View>
    </View>
  );
};

export default CustomerScreen;
