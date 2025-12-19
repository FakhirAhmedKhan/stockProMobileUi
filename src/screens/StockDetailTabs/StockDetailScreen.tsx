import { ChromeTabBar } from "@/components/HelpingUI";
import { TABS } from "@/constants/Data.Constant";
import useStock from "@/hooks/useStock";
import { useNavigation } from "@react-navigation/native"; // ✅ Correct import
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // ✅ Correct import
import ProductTab from "./ProductTab";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "@/navigation/DashboardNavigator";

// ✅ Add proper typing
type Props = NativeStackScreenProps<DashboardStackParamList, "StockDetail">;

const StockDetailScreen = ({ route }: Props) => {
  // ✅ Accept route prop
  const navigation = useNavigation(); // ✅ Get navigation hook
  const stockId = route?.params?.stockId; // ✅ Now route is defined

  const { stock, isLoading, fetchStockDetails } = useStock(stockId);
  const [activeTab, setActiveTab] = useState("Products");
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

  const percentage =
    Math.round((stock.quantityAvailable / stock.totalQuantity) * 100) || 0;
  const ActiveComponent =
    TABS.find((tab) => tab.id === activeTab)?.component || ProductTab;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => navigation.goBack()} // ✅ Now navigation is defined
              style={styles.backButton}
            >
              <Icon name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.time}>{new Date().toLocaleTimeString()}</Text>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <Icon name="cube" size={24} color="#a855f7" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>{stock.stockTitle}</Text>
              <Text style={styles.subtitle}>Track performance & manage</Text>
            </View>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Operational</Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summary}>
          <View style={styles.gaugeContainer}>
            <Text style={styles.gaugePercentage}>{percentage}%</Text>
            <Text style={styles.gaugeLabel}>Available</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Quantity</Text>
              <Text style={styles.statValue}>{stock.totalQuantity}</Text>
              <Text style={styles.statSubValue}>
                {stock.quantityAvailable} Available
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Unit Price</Text>
              <Text style={styles.statValue}>${stock.unitPrice}</Text>
              <Text style={styles.statSubValue}>Per Item</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Stock Value</Text>
              <Text style={styles.statValue}>${stock.stockPrice}</Text>
              <Text style={styles.statSubValue}>Estimated</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Profit</Text>
              <Text style={styles.statValue}>${stock.totalProfit || 0}</Text>
              <Text style={styles.statSubValue}>Overall</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <ChromeTabBar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab Content */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <ActiveComponent
            stockId={stock.id || stock.stockId}
            stock={stock}
            navigation={navigation} // ✅ Now navigation is defined
            onStockUpdated={fetchStockDetails}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// ... keep all your existing styles

export default StockDetailScreen;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 24,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
  },
  time: {
    fontSize: 14,
    color: "#9ca3af",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#faf5ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#065f46",
  },
  summary: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  gaugeContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  gaugePercentage: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  gaugeLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  statSubValue: {
    fontSize: 12,
    color: "#9ca3af",
  },
  tabBar: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#3b82f6",
  },
  tabIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  tabContent: {
    padding: 24,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 400,
  },
  tabHeader: {
    marginBottom: 24,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  tabSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
  },
  cardRight: {
    alignItems: "flex-end",
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  stockBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e40af",
  },
  ordersBadge: {
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ordersText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7c3aed",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
  },
});
