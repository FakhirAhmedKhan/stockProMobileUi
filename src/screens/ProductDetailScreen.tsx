import { useProduct } from '@/hooks/useProduct';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// --- Components ---

const DetailBadge = ({ label, value }: { label: string, value: string | number }) => (
    <View className="bg-white border border-gray-200 rounded-lg p-3 flex-1 mx-1 items-center">
        <Text className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{label}</Text>
        <Text className="text-gray-900 font-semibold">{value}</Text>
    </View>
);

const SectionCard = ({ title, icon, color, children, className }: any) => (
    <View className={`bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 ${className}`}>
        <View className="flex-row items-center mb-4">
            <View className={`p-2 rounded-lg mr-3 bg-${color}-50`}>
                <Icon name={icon} size={20} color={getColorCode(color)} />
            </View>
            <Text className="text-lg font-bold text-gray-800">{title}</Text>
        </View>
        {children}
    </View>
);

const StatRow = ({ label, value, isCurrency = false, isNegative = false }: any) => (
    <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">{label}</Text>
        <Text className={`text-xl font-bold ${isNegative ? 'text-red-500' : 'text-gray-900'}`}>
            {isCurrency ? (isNegative ? '-' : '') + '฿' : ''} {Math.abs(value)}
        </Text>
    </View>
);

const getColorCode = (colorName: string) => {
    switch (colorName) {
        case 'blue': return '#3b82f6';
        case 'purple': return '#a855f7';
        case 'green': return '#22c55e';
        default: return '#6b7280';
    }
};

const ProductDetailScreen = () => {
    const { product, isLoading } = useProduct(); // Assuming hook handles single product fetch via ID in route
    const navigation = useNavigation();
    const route = useRoute<any>();
    const [activeTab, setActiveTab] = useState('Orders');

    // Initial loading state
    if (isLoading && !product) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }

    // Dummy data fallback
    const displayProduct = product || {
        name: "Test Product",
        productId: "0607820889107",
        status: "Available",
        storage: "1",
        color: "1", // Assuming color code or name
        condition: "—",
        unitPrice: 1,
        totalCost: 1,
        profit: -1,
        repairCost: 0,
        totalQuantity: 0
    };

    return (
        <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
            {/* Header / Back Button */}
            <View className="p-6 pb-2">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex-row items-center bg-white self-start px-4 py-2 rounded-xl shadow-sm border border-gray-100 mb-6"
                >
                    <Icon name="arrow-back" size={16} color="#374151" />
                    <Text className="ml-2 text-gray-600 font-medium">Back to Products</Text>
                </TouchableOpacity>

                {/* Main Product Info Card */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-row items-center mb-6">
                    <View className="w-24 h-24 bg-gray-100 rounded-2xl items-center justify-center mr-5">
                        <Icon name="cube-outline" size={40} color="#9ca3af" />
                    </View>
                    <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                            <Text className="text-2xl font-bold text-gray-900 mr-3">{displayProduct.name}</Text>
                            <View className="bg-green-100 px-2 py-1 rounded-full">
                                <Text className="text-xs text-green-700 font-medium">{displayProduct.status}</Text>
                            </View>
                        </View>
                        <Text className="text-sm text-blue-500 font-medium mb-4">Product ID: {displayProduct.productId}</Text>

                        <View className="flex-row -mx-1">
                            <DetailBadge label="Storage" value={displayProduct.storage} />
                            <DetailBadge label="Color" value={displayProduct.color} />
                            <DetailBadge label="Condition" value={displayProduct.condition} />
                        </View>
                    </View>
                </View>

                {/* Left Column Stats (Stacked on mobile) */}
                <SectionCard title="Pricing" icon="logo-usd" color="blue">
                    <StatRow label="Unit Price" value={displayProduct.unitPrice} isCurrency />
                    <StatRow label="Total Cost" value={displayProduct.totalCost} isCurrency />
                    <StatRow label="Profit / Loss" value={displayProduct.profit} isCurrency isNegative={displayProduct.profit < 0} />
                </SectionCard>

                <SectionCard title="Repairs" icon="construct" color="purple">
                    <StatRow label="Total Repairing Cost" value={displayProduct.repairCost} isCurrency />
                </SectionCard>

                <SectionCard title="Stock Info" icon="trending-up" color="green">
                    <StatRow label="Stock Title" value={displayProduct.name} />
                    <StatRow label="Total Quantity" value={displayProduct.totalQuantity} />
                </SectionCard>

                {/* Tabs Section */}
                <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10 h-96">
                    <View className="flex-row border-b border-gray-100">
                        {['Orders', 'Returns', 'Repairs'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 py-4 items-center border-b-2 ${activeTab === tab ? 'border-blue-500' : 'border-transparent'}`}
                            >
                                <View className="flex-row items-center">
                                    <Text className={`font-medium mr-2 ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {tab}
                                    </Text>
                                    <View className="bg-gray-100 px-2 py-0.5 rounded-full">
                                        <Text className="text-xs text-gray-500">0</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="flex-1 items-center justify-center p-8">
                        <Text className="text-gray-400">No {activeTab.toLowerCase()} available</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

export default ProductDetailScreen;
