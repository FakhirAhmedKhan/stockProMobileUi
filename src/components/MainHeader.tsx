import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  BtnText?: string;
  setIsModalOpen?: (isOpen: boolean) => void;
  setChartData?: (data: any) => void;
  setData?: (data: any) => void;
  isVisible?: boolean;
  H1Heading: string;
  Paragraph: string;
  Updates?: string;
  StutsUpdates?: string;
  showButton?: boolean;
  showRangePicker?: boolean;
  Icon?: React.ReactNode;
  fullName?: string;
}

export const MainHeader: React.FC<HeaderProps> = ({
  BtnText = 'Add New',
  setIsModalOpen,
  H1Heading,
  Paragraph,
  showButton = true,
}) => {
  return (
    <View className="mb-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

      {/* Top Section: Title & Button */}
      <View className="flex-row justify-between items-start">
        <View className="flex-1 mr-4">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {H1Heading}
          </Text>
          <Text className="text-sm text-gray-500 leading-relaxed">
            {Paragraph}
          </Text>
        </View>

        {showButton && (
          <TouchableOpacity
            onPress={() => setIsModalOpen?.(true)}
            className="flex-row items-center bg-blue-600 px-4 py-2.5 rounded-xl active:bg-blue-700"
          >
            <Icon name="add" size={20} color="#fff" />
            <Text className="text-white font-semibold ml-1.5 text-sm">
              {BtnText}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Optional: Stats Row (Simplified) */}
      <View className="flex-row mt-4 pt-4 border-t border-gray-50">
        <View className="flex-row items-center mr-6">
          <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
          <Text className="text-xs font-medium text-gray-600">System Active</Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="time-outline" size={14} color="#64748b" style={{ marginRight: 6 }} />
          <Text className="text-xs font-medium text-gray-600">Updated just now</Text>
        </View>
      </View>

    </View>
  );
};