import { View, Text } from "react-native";
import { IconButton } from "@/components/atoms/IconButton";
import { Ionicons } from "@expo/vector-icons";

type HeaderBarProps = {
  title: string;
  onBack: () => void;
  onAction?: () => void;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  isDarkMode?: boolean;
};

export function HeaderBar({
  title,
  onBack,
  onAction,
  actionIcon = "refresh",
  isDarkMode = false,
}: HeaderBarProps) {
  const bgColor = isDarkMode ? "bg-slate-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-slate-900";
  const iconColor = isDarkMode ? "#fff" : "#1e293b";
  const borderColor = isDarkMode ? "border-slate-800" : "border-slate-200";

  return (
    <View className={`flex-row items-center justify-between px-6 py-4 ${bgColor} border-b ${borderColor}`}>
      <IconButton
        icon="arrow-back"
        onPress={onBack}
        color={iconColor}
        size={24}
      />
      <Text className={`text-xl font-bold ${textColor}`}>{title}</Text>
      {onAction ? (
        <IconButton
          icon={actionIcon}
          onPress={onAction}
          color={iconColor}
          size={24}
        />
      ) : (
        <View className="w-12" />
      )}
    </View>
  );
}