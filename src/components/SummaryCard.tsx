import { colorMap } from "@/constants/Data.Constant";
import { Text, View } from "react-native";

export const SummaryCard = ({ icon: Icon, label, value, color }: any) => {
  const c = colorMap[color] || "bg-gray-100 text-gray-600";
  return (
    <View
      className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border text-center hover:shadow-md transition-all"
    >
      <View
        className={`mx-auto mb-2 w-9 h-9 rounded-lg flex items-center justify-center ${c}`}
      >
        <Icon className="w-5 h-5" />
      </View>
      <Text className="text-xs text-gray-500 font-semibold mb-1">{label}</Text>
      <Text className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
        {value}
      </Text>
    </View>
  );
};
