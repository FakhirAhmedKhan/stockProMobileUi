import useStock from '@/hooks/useStock';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomersTab from './StockDetailTabs/CustomersTab';
import ImagesTab from './StockDetailTabs/ImagesTab';
import OrdersTab from './StockDetailTabs/OrdersTab';
import ProductTab from './StockDetailTabs/ProductTab';
import RepairsTab from './StockDetailTabs/RepairsTab';
import ReturnsTab from './StockDetailTabs/ReturnsTab';

const { width } = Dimensions.get('window');

// --- Tab Configuration ---
const TABS = [
  { id: 'Products', label: 'Products', icon: 'cube-outline', component: ProductTab },
  { id: 'Orders', label: 'Orders', icon: 'cart-outline', component: OrdersTab },
  { id: 'Customers', label: 'Customers', icon: 'people-outline', component: CustomersTab },
  { id: 'Returns', label: 'Returns', icon: 'return-up-back-outline', component: ReturnsTab },
  { id: 'Repairs', label: 'Repairs', icon: 'hammer-outline', component: RepairsTab },
  { id: 'Images', label: 'Images', icon: 'images-outline', component: ImagesTab },
  { id: 'Analytics', label: 'Analytics', icon: 'bar-chart-outline', component: ProductTab },
  { id: 'Reports', label: 'Reports', icon: 'document-text-outline', component: OrdersTab },
  { id: 'Inventory', label: 'Inventory', icon: 'albums-outline', component: CustomersTab },
  { id: 'Suppliers', label: 'Suppliers', icon: 'business-outline', component: ReturnsTab },
  { id: 'Warehouse', label: 'Warehouse', icon: 'home-outline', component: RepairsTab },
  { id: 'Settings', label: 'Settings', icon: 'settings-outline', component: ImagesTab },
];

// --- Components ---

const StatusBadge = ({ isOperational }: { isOperational: boolean }) => (
  <View className={`rounded-full px-3 py-1 flex-row items-center ${isOperational ? 'bg-green-100' : 'bg-red-100'}`}>
    <View className={`w-2 h-2 rounded-full mr-2 ${isOperational ? 'bg-green-500' : 'bg-red-500'}`} />
    <Text className={`text-xs font-medium ${isOperational ? 'text-green-700' : 'text-red-700'}`}>
      {isOperational ? 'Operational' : 'Issues'}
    </Text>
  </View>
);

const StatCard = ({ label, value, subValue, icon }: any) => (
  <View className="bg-white p-4 rounded-xl mb-3 w-[48%] shadow-sm border border-gray-100">
    <View className="flex-row items-center mb-2">
      <View className="p-2 bg-blue-50 rounded-lg mr-2">
        <Icon name={icon} size={18} color="#3b82f6" />
      </View>
      <Text className="text-xs text-gray-500 font-medium">{label}</Text>
    </View>
    <Text className="text-lg font-bold text-gray-900 mb-1">{value}</Text>
    <Text className="text-xs text-gray-400">{subValue}</Text>
  </View>
);

const AvailabilityGauge = ({ percentage }: { percentage: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: percentage,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [percentage]);

  return (
    <View className="items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
      <View className="w-32 h-32 rounded-full border-8 border-gray-100 items-center justify-center relative">
        <View className="absolute w-32 h-32 rounded-full border-8 border-green-500 border-t-transparent border-l-transparent transform rotate-45 opacity-80" />
        <Text className="text-3xl font-bold text-gray-900">{percentage}%</Text>
        <Text className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">Available</Text>
      </View>
    </View>
  );
};

// Chrome-style Tab Item
const ChromeTabItem = ({
  tab,
  isActive,
  onPress,
  index
}: {
  tab: typeof TABS[0];
  isActive: boolean;
  onPress: () => void;
  index: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.95)).current;
  const translateY = useRef(new Animated.Value(isActive ? -2 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0.95,
        useNativeDriver: true,
        friction: 8,
      }),
      Animated.spring(translateY, {
        toValue: isActive ? -2 : 0,
        useNativeDriver: true,
        friction: 8,
      }),
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        marginLeft: index === 0 ? 0 : -8,
        zIndex: isActive ? 10 : 1,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }, { translateY }],
        }}
        className={`px-4 py-3 rounded-t-xl flex-row items-center ${isActive ? 'bg-white shadow-lg' : 'bg-gray-100'
          }`}
      >
        <Icon
          name={tab.icon}
          size={16}
          color={isActive ? '#3b82f6' : '#6b7280'}
        />
        <Text
          className={`ml-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'
            }`}
        >
          {tab.label}
        </Text>
        {isActive && (
          <View className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Chrome-style Tab Bar
const ChromeTabBar = ({
  activeTab,
  onTabChange
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [tabPositions, setTabPositions] = useState<{ [key: string]: number }>({});

  const handleTabPress = (tabId: string, index: number) => {
    onTabChange(tabId);

    // Auto-scroll to center the active tab
    if (scrollViewRef.current && tabPositions[tabId] !== undefined) {
      scrollViewRef.current.scrollTo({
        x: Math.max(0, tabPositions[tabId] - width / 2 + 50),
        animated: true,
      });
    }
  };

  return (
    <View className="bg-gray-50 border-b border-gray-200">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
        bounces={false}
      >
        {TABS.map((tab, index) => (
          <View
            key={tab.id}
            onLayout={(event) => {
              const { x } = event.nativeEvent.layout;
              setTabPositions(prev => ({ ...prev, [tab.id]: x }));
            }}
          >
            <ChromeTabItem
              tab={tab}
              isActive={activeTab === tab.id}
              onPress={() => handleTabPress(tab.id, index)}
              index={index}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Main Screen
const StockDetailScreen = ({ navigation, route }: any) => {
  const { stock, isLoading, fetchStockDetails } = useStock(route.params?.stockId);
  const [activeTab, setActiveTab] = useState('Products');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTabChange = (newTab: string) => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(newTab);
      // Fade in
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

  const displayStock = stock || {
    stockTitle: "Tech Gadget X",
    quantityAvailable: 85,
    totalQuantity: 100,
    unitPrice: 120.50,
    stockPrice: 12050.00,
    totalProfit: 2400.00,
    TotalAmountPaid: 8000,
    RemainingAmount: 4050,
    category: "Electronics",
    id: "1",
    stockId: "1" // Ensure stockId is also present for tabs
  };

  const percentage = Math.round((displayStock.quantityAvailable / displayStock.totalQuantity) * 100) || 0;
  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component || ProductTab;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Area */}
        <View className="bg-white px-6 pt-6 pb-4 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 bg-gray-100 rounded-full active:bg-gray-200"
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
              <Text className="text-xl font-bold text-gray-900">{displayStock.stockTitle}</Text>
              <Text className="text-sm text-gray-500">Track performance & manage</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <StatusBadge isOperational={true} />
            <View className="bg-orange-50 px-3 py-1 rounded-full flex-row items-center">
              <Icon name="flash" size={12} color="#f97316" />
              <Text className="text-xs font-medium text-orange-700 ml-1">3 Updates</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="px-6">
          {/* Summary Section */}
          <AvailabilityGauge percentage={percentage} />

          {/* Info Grid */}
          <View className="flex-row flex-wrap justify-between mb-6">
            <StatCard
              label="Quantity"
              value={displayStock.totalQuantity}
              subValue={`${displayStock.quantityAvailable} Available`}
              icon="layers"
            />
            <StatCard
              label="Unit Price"
              value={`$${displayStock.unitPrice}`}
              subValue="Per Item"
              icon="pricetag"
            />
            <StatCard
              label="Stock Value"
              value={`$${displayStock.stockPrice}`}
              subValue="Estimated"
              icon="cash"
            />
            <StatCard
              label="Total Profit"
              value={`$${displayStock.totalProfit || 0}`}
              subValue="+12% vs last month"
              icon="trending-up"
            />
          </View>
        </View>

        {/* Chrome-style Tabs */}
        <ChromeTabBar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab Content with Animation */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="bg-white rounded-t-3xl shadow-sm border-t border-gray-100 min-h-screen"
        >
          <ActiveComponent
            stock={displayStock}
            stockId={displayStock.id || displayStock.stockId}
            onStockUpdated={fetchStockDetails}
          />
        </Animated.View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
};

export default StockDetailScreen;