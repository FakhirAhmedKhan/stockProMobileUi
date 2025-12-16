import { TrendingUp, X } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ModelHeaderProps {
  icon?: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const ModelHeader = ({ icon, title, onClose }: ModelHeaderProps) => {
  return (
    <View className="bg-white px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
      <View className="flex-row items-center gap-3">
        <View className="bg-blue-50 p-2.5 rounded-xl">
          {icon ? (
            icon
          ) : (
            <TrendingUp color="#3B82F6" size={24} />
          )}
        </View>
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
      </View>

      <TouchableOpacity
        className="bg-gray-100 p-2 rounded-full active:bg-gray-200"
        onPress={onClose}
        activeOpacity={0.7}
      >
        <X color="#6B7280" size={20} />
      </TouchableOpacity>
    </View>
  );
};

