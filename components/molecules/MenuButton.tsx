import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MenuButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
};

export function MenuButton({ icon, title, description, onPress }: MenuButtonProps) {
  return (
    <Pressable 
      className="bg-white rounded-3xl p-6 mb-4 flex-row items-center shadow-sm active:opacity-70"
      onPress={onPress}
    >
      <View className="w-14 h-14 bg-blue-100 rounded-2xl items-center justify-center">
        <Ionicons name={icon} size={28} color="#2563eb" />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-lg font-semibold text-slate-800">
          {title}
        </Text>
        <Text className="text-sm text-slate-500 mt-1">
          {description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
    </Pressable>
  );
}