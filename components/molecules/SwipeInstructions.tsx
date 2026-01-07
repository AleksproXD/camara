import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SwipeInstructionsProps = {
  isDarkMode?: boolean;
  customMessage?: string;
};

export function SwipeInstructions({ 
  isDarkMode = true,
  customMessage 
}: SwipeInstructionsProps) {
  const bgColor = isDarkMode ? "bg-slate-800" : "bg-blue-50";
  const deleteColor = isDarkMode ? "text-red-400" : "text-red-600";
  const saveColor = isDarkMode ? "text-emerald-400" : "text-emerald-600";
  const messageColor = isDarkMode ? "text-slate-400" : "text-blue-600";
  const deleteIconColor = isDarkMode ? "#ef4444" : "#dc2626";
  const saveIconColor = isDarkMode ? "#10b981" : "#059669";

  return (
    <View className={`${bgColor} rounded-2xl p-4`}>
      <View className="flex-row items-center justify-center">
        <View className="flex-row items-center mr-6">
          <Ionicons name="arrow-back" size={20} color={deleteIconColor} />
          <Text className={`text-sm ${deleteColor} ml-2 font-semibold`}>
            Eliminar
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className={`text-sm ${saveColor} mr-2 font-semibold`}>
            Guardar
          </Text>
          <Ionicons name="arrow-forward" size={20} color={saveIconColor} />
        </View>
      </View>
      <Text className={`text-xs ${messageColor} text-center mt-2`}>
        {customMessage || "Desliza la foto en la dirección que prefieras"}
      </Text>
    </View>
  );
}