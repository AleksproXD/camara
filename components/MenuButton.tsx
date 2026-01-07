import { useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MenuButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
};

export function MenuButton({ icon, title, description, onPress }: MenuButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={{ transform: [{ scale: scaleAnim }] }}
        className="bg-white rounded-3xl p-6 mb-4 flex-row items-center shadow-sm"
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
      </Animated.View>
    </Pressable>
  );
}