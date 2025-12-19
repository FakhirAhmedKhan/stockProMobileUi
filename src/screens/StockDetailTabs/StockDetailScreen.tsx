import { ActivityIndicator, Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AvailabilityGauge, ChromeTabBar, StatCard, StatusBadge } from '@/components/HelpingUI';
import Icon from 'react-native-vector-icons/Ionicons';
import { TABS } from '@/constants/Data.Constant';
import { useRef, useState } from 'react';
import useStock from '@/hooks/useStock';
import ProductTab from './ProductTab';

const StockDetailScreen = ({ navigation, route }: any) => {
  const stockId = route?.params?.stockId;
  console.log('navigation prop exists:', !!navigation);

  const { stock, isLoading, fetchStockDetails } = useStock(stockId);
  const [activeTab, setActiveTab] = useState('Products');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTabChange = (newTab: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(newTab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!stock) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No stock data found</Text>
      </View>
    );
  }

  const percentage = Math.round((stock.quantityAvailable / stock.totalQuantity) * 100) || 0;

  // Pass navigation explicitly to the tab component
  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component || ProductTab;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 pt-6 pb-4 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 bg-gray-100 rounded-full"
            >
              <Icon name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <Text className="text-sm text-gray-400">{new Date().toLocaleTimeString()}</Text>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-4">
              <Icon name="cube" size={24} color="#a855f7" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">{stock.stockTitle}</Text>
              <Text className="text-sm text-gray-500">Track performance & manage</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <StatusBadge isOperational={true} />
          </View>
        </View>

        {/* Summary */}
        <View className="px-6">
          <AvailabilityGauge percentage={percentage} />
          <View className="flex-row flex-wrap justify-between mb-6">
            <StatCard
              label="Quantity"
              value={stock.totalQuantity}
              subValue={`${stock.quantityAvailable} Available`}
              icon="layers"
            />
            <StatCard
              label="Unit Price"
              value={`$${stock.unitPrice}`}
              subValue="Per Item"
              icon="pricetag"
            />
            <StatCard
              label="Stock Value"
              value={`$${stock.stockPrice}`}
              subValue="Estimated"
              icon="cash"
            />
            <StatCard
              label="Total Profit"
              value={`$${stock.totalProfit || 0}`}
              subValue="Overall"
              icon="trending-up"
            />
          </View>
        </View>

        {/* Tabs */}
        <ChromeTabBar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab Content */}
        <Animated.View style={{ opacity: fadeAnim }} className="bg-white rounded-t-3xl min-h-screen">
          <ActiveComponent
            stock={stock}
            stockId={stock.id || stock.stockId}
            onStockUpdated={fetchStockDetails}
            navigation={navigation}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default StockDetailScreen;
