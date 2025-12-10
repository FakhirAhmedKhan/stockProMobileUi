import ExcelLikeTable from '@/components/ExcelLikeTable';
import { SupplierFormInputs } from '@/components/Forms/SupplierFormInputs';
import { MainHeader } from '@/components/MainHeader';
import { SupplierModalForm } from '@/components/Models/Suppliers.Model';
import { Pagination } from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { useSuppliers } from 'Hooks/useSuppliers';
import React, { useState } from 'react';
import { View } from 'react-native';

const SupplersScreen: React.FC = () => {
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
    totalCount,
    currentPage,
    setCurrentPage,
  } = useSuppliers();


  const handleEdit = (entity: any) => {
    console.log('Edit:', entity);
  };

  const handleView = (id: string) => {
    console.log('View:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete:', id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </View>

      <View className="flex-1 px-6 pt-4">
        <ExcelLikeTable
          data={suppliers}
          showStatus={true}
          showButton={true}
          showButtonNavigation={true}
          showDelBtn={true}
          onEdit={handleEdit}
          handleViewDetails={handleView}
          handleDeleteStock={handleDelete}
        />
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

export default SupplersScreen;
