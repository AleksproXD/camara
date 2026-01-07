import { View, Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProcessingOverlayProps = {
  action: "save" | "delete";
};

export function ProcessingOverlay({ action }: ProcessingOverlayProps) {
  const isSaving = action === "save";

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 items-center justify-center">
        <Ionicons
          name={isSaving ? "checkmark-circle" : "trash"}
          size={80}
          color={isSaving ? "#10b981" : "#ef4444"}
        />
        <Text className="text-white text-2xl font-bold mt-4">
          {isSaving ? "Guardando foto..." : "Eliminando foto..."}
        </Text>
        <Text className="text-slate-400 text-base mt-2">
          {isSaving ? "Se guardará en tu galería" : "La foto será eliminada"}
        </Text>
      </View>
    </SafeAreaView>
  );
}