import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActionButton } from "@/components/atoms/ActionButton";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <Ionicons name={icon} size={80} color="#cbd5e1" />
      <Text className="text-xl font-semibold text-slate-900 mt-6 text-center">
        {title}
      </Text>
      <Text className="text-base text-slate-600 mt-2 text-center">
        {description}
      </Text>
      {actionLabel && onAction && (
        <View className="mt-8 w-full">
          <ActionButton
            label={actionLabel}
            onPress={onAction}
            variant="primary"
          />
        </View>
      )}
    </View>
  );
}