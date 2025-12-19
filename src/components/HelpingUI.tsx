import { TABS } from "@/constants/Data.Constant";
import { styles } from "@/screens/StockDetailTabs/StockDetailScreen";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const DetailBadge = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="bg-white border border-gray-200 rounded-lg p-3 flex-1 mx-1 items-center">
    <Text className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
      {label}
    </Text>
    <Text className="text-gray-900 font-semibold">{value}</Text>
  </View>
);

export const SectionCard = ({
  title,
  icon,
  color,
  children,
  className,
}: any) => (
  <View
    className={`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 ${className}`}
  >
    <View className="flex-row items-center mb-4">
      <View className={`p-2 rounded-lg mr-3 bg-${color}-50`}>
        <Icon name={icon} size={20} color={getColorCode(color)} />
      </View>
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
    </View>
    {children}
  </View>
);

export const StatRow = ({
  label,
  value,
  isCurrency = false,
  isNegative = false,
}: any) => (
  <View className="mb-3">
    <Text className="text-xs text-gray-500 mb-1">{label}</Text>
    <Text
      className={`text-xl font-bold ${
        isNegative ? "text-red-500" : "text-gray-900"
      }`}
    >
      {isCurrency ? (isNegative ? "-" : "") + "฿" : ""} {Math.abs(value)}
    </Text>
  </View>
);

export const getColorCode = (colorName: string) => {
  switch (colorName) {
    case "blue":
      return "#3b82f6";
    case "purple":
      return "#a855f7";
    case "green":
      return "#22c55e";
    default:
      return "#6b7280";
  }
};

export const StatusBadge = ({ isOperational }: { isOperational: boolean }) => (
  <View
    className={`rounded-full px-3 py-1 flex-row items-center ${
      isOperational ? "bg-green-100" : "bg-red-100"
    }`}
  >
    <View
      className={`w-2 h-2 rounded-full mr-2 ${
        isOperational ? "bg-green-500" : "bg-red-500"
      }`}
    />
    <Text
      className={`text-xs font-medium ${
        isOperational ? "text-green-700" : "text-red-700"
      }`}
    >
      {isOperational ? "Operational" : "Issues"}
    </Text>
  </View>
);

export const StatCard = ({ label, value, subValue, icon }: any) => (
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

export const AvailabilityGauge = ({ percentage }: { percentage: number }) => {
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
        <Text className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">
          Available
        </Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

/* =======================
   Chrome Tab Item
======================= */
export const ChromeTabBar = ({ activeTab, onTabChange }: any) => {
  return (
    <View style={styles.tabBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
