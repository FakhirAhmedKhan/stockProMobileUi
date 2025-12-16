import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ModelFooterProps {
  onClose: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  title: string;
}

export const ModelFooter = ({
  onClose,
  handleSubmit,
  isSubmitting,
  title,
}: ModelFooterProps) => {
  return (
    <View className="flex-row gap-3 px-6 pb-6 pt-4 border-t border-gray-200">
      <TouchableOpacity
        className={`flex-1 px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 items-center justify-center active:bg-gray-100 ${isSubmitting ? "opacity-50" : ""
          }`}
        onPress={onClose}
        disabled={isSubmitting}
        activeOpacity={0.7}
      >
        <Text className="text-gray-600 font-semibold text-base">Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`flex-1 px-5 py-3.5 rounded-xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-500/25 active:bg-blue-700 ${isSubmitting ? "opacity-50" : ""
          }`}
        onPress={handleSubmit}
        disabled={isSubmitting}
        activeOpacity={0.7}
      >
        {isSubmitting ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator color="#FFFFFF" size="small" className="mr-3" />
            <Text className="text-white font-semibold text-base">
              Saving...
            </Text>
          </View>
        ) : (
          <Text className="text-white font-semibold text-base">{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
