import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InfoCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
};

export function InfoCard({ icon, message }: InfoCardProps) {
  return (
    <View className="bg-blue-50 rounded-2xl p-4 flex-row items-center">
      <Ionicons name={icon} size={24} color="#3b82f6" />
      <Text className="ml-3 text-sm text-blue-700 flex-1">
        {message}
      </Text>
    </View>
  );
}