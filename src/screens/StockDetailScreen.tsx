import useStock from '@/hooks/useStock';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- Components ---

const StatusBadge = ({ isOperational }: { isOperational: boolean }) => (
    <View className={`rounded-full px-3 py-1 flex-row items-center self-start ${isOperational ? 'bg-green-100' : 'bg-red-100'}`}>
        <View className={`w-2 h-2 rounded-full mr-2 ${isOperational ? 'bg-green-500' : 'bg-red-500'}`} />
        <Text className={`text-xs font-medium ${isOperational ? 'text-green-700' : 'text-red-700'}`}>
            {isOperational ? 'All Systems Operational' : 'Issues Detected'}
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

const AvailabilityGauge = ({ percentage }: { percentage: number }) => (
    <View className="items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <View className="w-32 h-32 rounded-full border-8 border-gray-100 items-center justify-center relative">
            {/* Simple representation of gauge - in real app use SVG or reanimated */}
            <View className="absolute w-32 h-32 rounded-full border-8 border-green-500 border-t-transparent border-l-transparent transform rotate-45 opacity-80" />
            <Text className="text-3xl font-bold text-gray-900">{percentage}%</Text>
            <Text className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">Available</Text>
        </View>
    </View>
);

const StockDetailScreen = () => {
    const { stock, isLoading } = useStock();
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Products');

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    // Dummy data if stock is null (for preview before data is linked perfectly)
    const displayStock = stock || {
        stockTitle: "Tech Gadget X",
        quantityAvailable: 100,
        totalQuantity: 100,
        unitPrice: 120.50,
        stockPrice: 12050.00,
        totalProfit: 2400.00,
        TotalAmountPaid: 8000,
        RemainingAmount: 4050,
        category: "Electronics",
        id: "1"
    };

    const percentage = Math.round((displayStock.quantityAvailable / displayStock.totalQuantity) * 100) || 0;

    return (
        <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
            {/* Header Area */}
            <View className="bg-white px-6 pt-6 pb-4 rounded-b-3xl shadow-sm mb-6">
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-100 rounded-full">
                        <Icon name="arrow-back" size={20} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-400">{new Date().toLocaleTimeString()}</Text>
                </View>

                <View className="flex-row items-center mb-4">
                    <View className="w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mr-4">
                        <Icon name="cube" size={24} color="#a855f7" />
                    </View>
                    <View>
                        <Text className="text-xl font-bold text-gray-900">{displayStock.stockTitle}</Text>
                        <Text className="text-sm text-gray-500">Manage your product and track performance</Text>
                    </View>
                </View>

                <View className="flex-row gap-3">
                    <StatusBadge isOperational={true} />
                    <View className="bg-orange-50 px-3 py-1 rounded-full flex-row items-center">
                        <Icon name="flash" size={12} color="#f97316" />
                        <Text className="text-xs font-medium text-orange-700 ml-1">3 New Updates</Text>
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
                        label="Total Stock Value"
                        value={`$${displayStock.stockPrice}`}
                        subValue="Estimated"
                        icon="cash"
                    />
                    <StatCard
                        label="Total Profit"
                        value={`$${displayStock.totalProfit || 0}`}
                        subValue="+12% from last month"
                        icon="trending-up"
                    />
                </View>

                {/* Tabs & Table Section */}
                <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="border-b border-gray-100">
                        {['Products', 'Orders', 'Customers', 'Returns', 'Repairs', 'Images'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`px-6 py-4 border-b-2 ${activeTab === tab ? 'border-blue-500' : 'border-transparent'}`}
                            >
                                <Text className={`font-medium ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="p-4">
                        {/* Placeholder for table content - reusing similar data structure */}
                        <Text className="text-gray-400 text-center py-8">
                            {activeTab} data for this stock item would appear here.
                        </Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

export default StockDetailScreen;
