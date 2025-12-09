import { SupplierFormInputs } from '@/components/Forms/SupplierFormInputs';
import { MainHeader } from '@/components/MainHeader';
import ExcelLikeTable from '@/components/mainTable';
import { SupplierModalForm } from '@/components/Models/Suppliers.Model';
import { Pagination } from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { useSuppliers } from 'Hooks/useSuppliers';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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
  } = useSuppliers()


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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

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

        {isModalOpen && (
          <View style={{ padding: 20 }}>
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
          totalPages={Math.ceil(totalCount / pageSize)}
          text="Items per page"
        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50
  },
  scrollContent: {
    padding: 24, // p-6
  },
  heroSection: {
    borderRadius: 16, // rounded-2xl
    padding: 24, // p-6
    marginBottom: 24, // mb-6
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4, // shadow-lg
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // mb-4
  },
  heroTitle: {
    color: 'white',
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
    marginLeft: 16, // ml-4
  },
  heroDescription: {
    color: '#dbeafe', // blue-100
    fontSize: 16, // text-base
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24, // mb-6
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12, // rounded-xl
    padding: 16, // p-4
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // shadow-md
  },
  statValue: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginTop: 8, // mt-2
  },
  statLabel: {
    fontSize: 14, // text-sm
    color: '#6b7280', // gray-500
  },
  sectionTitle: {
    fontSize: 18, // text-lg
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 16, // mb-4
  },
  featureList: {
    backgroundColor: 'white',
    borderRadius: 12, // rounded-xl
    padding: 20, // p-5
    marginBottom: 16, // mb-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // shadow-md
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureItemMb: {
    marginBottom: 12, // mb-3
  },
  featureText: {
    fontSize: 16, // text-base
    color: '#374151', // gray-700
    marginLeft: 12, // ml-3
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#eff6ff', // blue-50
    borderRadius: 12, // rounded-xl
    padding: 20, // p-5
    marginBottom: 24, // mb-6
    borderColor: '#bfdbfe', // blue-200
    borderWidth: 1,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTextContainer: {
    marginLeft: 12, // ml-3
    flex: 1,
  },
  infoTitle: {
    fontSize: 16, // text-base
    fontWeight: '600',
    color: '#1e40af', // blue-800
    marginBottom: 8, // mb-2
  },
  infoDescription: {
    fontSize: 14, // text-sm
    color: '#1d4ed8', // blue-700
  },
});

export default SupplersScreen;
