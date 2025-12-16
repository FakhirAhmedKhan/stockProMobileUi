import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TrendingUp, X } from 'lucide-react-native';

interface ModelHeaderProps {
  icon?: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const ModelHeader = ({ icon, title, onClose }: ModelHeaderProps) => {
  return (
    <View className="bg-blue-600 px-6 py-5 flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <View className="bg-purple-600 p-4 rounded-3xl shadow-lg shadow-purple-500/30">
          {icon ? (
            icon
          ) : (
            <TrendingUp color="#FFFFFF" size={32} strokeWidth={2.5} />
          )}
        </View>
        <Text className="text-xl font-semibold text-white">{title}</Text>
      </View>

      <TouchableOpacity
        className="bg-white/20 p-2 rounded-lg active:bg-white/30"
        onPress={onClose}
        activeOpacity={0.7}
      >
        <X color="#FFFFFF" size={20} />
      </TouchableOpacity>
    </View>
  );
};

