import { View, Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActionButton } from "@/components/atoms/ActionButton";

type PermissionScreenProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onRequestPermission: () => void;
  onGoBack: () => void;
  isDarkMode?: boolean;
};

export function PermissionScreen({
  icon,
  title,
  description,
  onRequestPermission,
  onGoBack,
  isDarkMode = true,
}: PermissionScreenProps) {
  const bgColor = isDarkMode ? "bg-slate-900" : "bg-slate-50";
  const textColor = isDarkMode ? "text-white" : "text-slate-900";
  const descriptionColor = isDarkMode ? "text-slate-300" : "text-slate-600";
  const iconColor = isDarkMode ? "#fff" : "#64748b";

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`}>
      <View className="flex-1 items-center justify-center px-8">
        <Ionicons name={icon} size={80} color={iconColor} />
        <Text className={`text-2xl font-bold ${textColor} mt-6 text-center`}>
          {title}
        </Text>
        <Text className={`text-base ${descriptionColor} mt-3 text-center`}>
          {description}
        </Text>
        
        <View className="mt-8 w-full">
          <ActionButton
            label="Conceder Permisos"
            onPress={onRequestPermission}
            variant="primary"
          />
        </View>
        
        <View className="mt-4 w-full">
          <ActionButton
            label="Volver"
            onPress={onGoBack}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}