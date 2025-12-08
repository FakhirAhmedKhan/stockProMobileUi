import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import ExcelLikeTable from 'UI/Tables/mainTable';
import { useSuppliers } from 'Hooks/useSuppler';

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

  return (
    <View style={styles.container}>
      <Header
        title="Supplers"
        subtitle="Supplers List"
        showIcon={true}
        iconName="analytics"
        iconColor="#2196f3"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#3b82f6', '#2563eb']} // blue-500 to blue-600
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroSection}
        >
          <View style={styles.heroHeader}>
            <Icon name="bar-chart" size={40} color="#fff" />
            <Text style={styles.heroTitle}>
              Analytics Dashboard
            </Text>
          </View>
          <Text style={styles.heroDescription}>
            View comprehensive analytics and detailed reports for your trading
            activities.
          </Text>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { marginRight: 8 }]}>
            <Icon name="trending-up" size={24} color="#4caf50" />
            <Text style={styles.statValue}>
              +24.5%
            </Text>
            <Text style={styles.statLabel}>Growth</Text>
          </View>

          <View style={[styles.statCard, { marginLeft: 8 }]}>
            <Icon name="wallet" size={24} color="#2196f3" />
            <Text style={styles.statValue}>
              $12,450
            </Text>
            <Text style={styles.statLabel}>Portfolio</Text>
          </View>
        </View>

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

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoContent}>
            <Icon name="information-circle" size={24} color="#2196f3" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>
                Pro Tip
              </Text>
              <Text style={styles.infoDescription}>
                Use the analytics dashboard to identify trends and make
                data-driven trading decisions. Review your reports weekly for
                best results.
              </Text>
            </View>
          </View>
        </View>
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
