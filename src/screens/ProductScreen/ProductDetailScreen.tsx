import { useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { DetailBadge, SectionCard, StatRow } from '@/components/HelpingUI'
import useProductDetail from '@/hooks/useProductDetail'

export const ProductDetailScreen = ({ route, navigation }: any) => {
    const productId = route.params?.id
    const { product, isLoading } = useProductDetail(productId)
    const [activeTab, setActiveTab] = useState('Orders')

    if (isLoading || !product) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        )
    }

    const displayProduct = product

    const statusText =
        displayProduct.status === 1 ? 'Sold' : 'Available'

    return (
        <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
            <View className="p-6 pb-2">

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex-row items-center bg-white self-start px-4 py-2 rounded-xl shadow-sm border border-gray-100 mb-6"
                >
                    <Icon name="arrow-back" size={16} color="#374151" />
                    <Text className="ml-2 text-gray-600 font-medium">
                        Back to Products
                    </Text>
                </TouchableOpacity>

                {/* Product Card */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-row items-center mb-6">
                    <View className="w-24 h-24 bg-gray-100 rounded-2xl items-center justify-center mr-5">
                        <Icon name="cube-outline" size={40} color="#9ca3af" />
                    </View>

                    <View className="flex-1">
                        <View className="flex-row items-center mb-2">
                            <Text className="text-2xl font-bold text-gray-900 mr-3">
                                {displayProduct.name}
                            </Text>
                            <View className="bg-green-100 px-2 py-1 rounded-full">
                                <Text className="text-xs text-green-700 font-medium">
                                    {statusText}
                                </Text>
                            </View>
                        </View>

                        <Text className="text-sm text-blue-500 font-medium mb-4">
                            Product ID: {displayProduct.id}
                        </Text>

                        <View className="flex-row -mx-1">
                            <DetailBadge label="Storage" value={displayProduct.storage || '-'} />
                            <DetailBadge label="Color" value={displayProduct.color || '-'} />
                            <DetailBadge label="Condition" value={displayProduct.condition || '-'} />
                        </View>
                    </View>
                </View>

                {/* Pricing */}
                <SectionCard title="Pricing" icon="logo-usd" color="blue">
                    <StatRow label="Unit Price" value={displayProduct.price} isCurrency />
                    <StatRow label="Total Cost" value={displayProduct.totalCost ?? 0} isCurrency />
                    <StatRow
                        label="Profit / Loss"
                        value={displayProduct.profit ?? 0}
                        isCurrency
                        isNegative={(displayProduct.profit ?? 0) < 0}
                    />
                </SectionCard>

                {/* Repairs */}
                <SectionCard title="Repairs" icon="construct" color="purple">
                    <StatRow
                        label="Total Repairing Cost"
                        value={displayProduct.repairCost ?? 0}
                        isCurrency
                    />
                </SectionCard>

                {/* Stock Info */}
                <SectionCard title="Stock Info" icon="trending-up" color="green">
                    <StatRow label="Stock Title" value={displayProduct.name} />
                    <StatRow label="Total Quantity" value={displayProduct.totalQuantity ?? 0} />
                </SectionCard>

                {/* Tabs */}
                <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10 h-96">
                    <View className="flex-row border-b border-gray-100">
                        {['Orders', 'Returns', 'Repairs'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 py-4 items-center border-b-2 ${activeTab === tab ? 'border-blue-500' : 'border-transparent'
                                    }`}
                            >
                                <Text
                                    className={`font-medium ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'
                                        }`}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="flex-1 items-center justify-center p-8">
                        <Text className="text-gray-400">
                            No {activeTab.toLowerCase()} available
                        </Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default ProductDetailScreen
