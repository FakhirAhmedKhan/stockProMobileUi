import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const InventoryDashboard = () => {
  const [dateRange, setDateRange] = useState('Last 7 Days');

  // Sample data
  const statsData = [
    { id: 1, label: 'Stock Value', value: '₱20,262', icon: 'cube', color: 'bg-purple-500' },
    { id: 2, label: 'Total Expense', value: '₱0', icon: 'trending-up', color: 'bg-emerald-500' },
    { id: 3, label: 'Total Sales', value: '₱1,001', icon: 'stats-chart', color: 'bg-teal-500' },
    { id: 4, label: 'Net Profit', value: '₱901', icon: 'wallet', color: 'bg-blue-500' },
    { id: 5, label: 'Total Orders', value: '2', icon: 'cart', color: 'bg-violet-500' },
  ];

  const financialData = [
    { id: 1, label: 'Total Profit', value: '₱901', icon: 'trending-up', color: 'bg-emerald-50', iconColor: 'bg-emerald-500' },
    { id: 2, label: 'Repairing Cost', value: '₱0', icon: 'construct', color: 'bg-teal-50', iconColor: 'bg-teal-500' },
    { id: 3, label: 'Total Customers', value: '1', icon: 'people', color: 'bg-blue-50', iconColor: 'bg-blue-500' },
    { id: 4, label: 'Total Suppliers', value: '1', icon: 'business', color: 'bg-purple-50', iconColor: 'bg-purple-500' },
  ];

  const chartData = {
    labels: ['Dec 16', 'Dec 17', 'Dec 18'],
    datasets: [
      {
        data: [5000, 20000, 15000],
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <View className="flex-row items-center mb-4">
          <View className="bg-purple-500 w-14 h-14 rounded-2xl items-center justify-center mr-4">
            <Icon name="trending-up" size={28} color="#fff" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-500 mb-1">Welcome To Demo — Good Morning</Text>
            <Text className="text-2xl font-bold text-gray-900">Inventory Dashboard</Text>
            <Text className="text-sm text-gray-600 mt-1">Real-time insights and analytics at your fingertips.</Text>
          </View>
        </View>

        {/* Status Row */}
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
            <Text className="text-xs text-gray-600">All Systems Operational</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xs mr-1">🎉</Text>
            <Text className="text-xs text-gray-600">3 New Updates</Text>
          </View>
        </View>
      </View>

      {/* Date Filter */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name="calendar-outline" size={18} color="#6366f1" />
            <Text className="text-sm font-semibold text-gray-700">Select Date Range</Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity className="px-3 py-2 bg-gray-100 rounded-lg">
              <Text className="text-xs font-medium text-gray-700">Today</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-2 bg-indigo-500 rounded-lg">
              <Text className="text-xs font-semibold text-white">Last 7 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-2 bg-gray-100 rounded-lg">
              <Text className="text-xs font-medium text-gray-700">This Month</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-6 py-4"
        contentContainerStyle={{ gap: 12 }}
      >
        {statsData.map((stat) => (
          <View key={stat.id} className="bg-white p-4 rounded-2xl border border-gray-100 w-40">
            <View className={`${stat.color} w-12 h-12 rounded-xl items-center justify-center mb-3`}>
              <Icon name={stat.icon} size={24} color="#fff" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</Text>
            <Text className="text-xs text-gray-500">{stat.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Sales Analytics Chart */}
      <View className="mx-6 my-4 bg-white rounded-2xl border border-gray-100 p-5">
        <View className="flex-row items-center mb-4">
          <View className="bg-indigo-100 w-10 h-10 rounded-xl items-center justify-center mr-3">
            <MaterialCommunityIcons name="chart-line" size={20} color="#6366f1" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">Sales Analytics</Text>
            <Text className="text-xs text-gray-500">Track your revenue performance over time</Text>
          </View>
        </View>

        {/* Legend */}
        <View className="flex-row items-center gap-4 mb-4">
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded bg-indigo-500 mr-2" />
            <Text className="text-xs text-gray-600">Sales Revenue</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded bg-emerald-500 mr-2" />
            <Text className="text-xs text-gray-600">Payments</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 rounded bg-red-500 mr-2" />
            <Text className="text-xs text-gray-600">Outstanding</Text>
          </View>
        </View>

        <LineChart
          data={chartData}
          width={width - 72}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#10b981',
            },
            propsForBackgroundLines: {
              strokeDasharray: '',
              stroke: '#f3f4f6',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          fromZero={true}
        />
      </View>

      {/* Financial Overview */}
      <View className="mx-6 my-4 bg-white rounded-2xl border border-gray-100 p-5 mb-8">
        <View className="flex-row items-center mb-5">
          <View className="bg-purple-100 w-12 h-12 rounded-xl items-center justify-center mr-3">
            <MaterialCommunityIcons name="bank" size={24} color="#8b5cf6" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">Financial Overview</Text>
            <Text className="text-xs text-gray-500">Real-time financial metrics and insights</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-3">
          {financialData.map((item) => (
            <View key={item.id} className={`${item.color} flex-1 min-w-[45%] p-4 rounded-xl`}>
              <View className={`${item.iconColor} w-10 h-10 rounded-lg items-center justify-center mb-3`}>
                <Icon name={item.icon} size={20} color="#fff" />
              </View>
              <Text className="text-xs text-gray-600 mb-1">{item.label}</Text>
              <Text className="text-2xl font-bold text-gray-900">{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 py-6 border-t border-gray-100 bg-white">
        <Text className="text-xs text-center text-gray-400 mb-2">
          Copyright © 2025 StockPro UI All rights reserved.
        </Text>
        <View className="flex-row justify-center gap-4">
          <TouchableOpacity>
            <Text className="text-xs text-indigo-600 font-medium">Term & Conditions</Text>
          </TouchableOpacity>
          <Text className="text-xs text-gray-300">|</Text>
          <TouchableOpacity>
            <Text className="text-xs text-indigo-600 font-medium">Privacy & Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InventoryDashboard;