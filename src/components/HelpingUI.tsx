import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const DetailBadge = ({ label, value }: { label: string, value: string | number }) => (
    <View className="bg-white border border-gray-200 rounded-lg p-3 flex-1 mx-1 items-center">
        <Text className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{label}</Text>
        <Text className="text-gray-900 font-semibold">{value}</Text>
    </View>
);

export const SectionCard = ({ title, icon, color, children, className }: any) => (
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

export const StatRow = ({ label, value, isCurrency = false, isNegative = false }: any) => (
    <View className="mb-3">
        <Text className="text-xs text-gray-500 mb-1">{label}</Text>
        <Text className={`text-xl font-bold ${isNegative ? 'text-red-500' : 'text-gray-900'}`}>
            {isCurrency ? (isNegative ? '-' : '') + '฿' : ''} {Math.abs(value)}
        </Text>
    </View>
);

export const getColorCode = (colorName: string) => {
    switch (colorName) {
        case 'blue': return '#3b82f6';
        case 'purple': return '#a855f7';
        case 'green': return '#22c55e';
        default: return '#6b7280';
    }
};