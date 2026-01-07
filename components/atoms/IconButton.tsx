import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
};

export function IconButton({
  icon,
  onPress,
  size = 24,
  color = "#1e293b",
  backgroundColor = "transparent",
  disabled = false,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="w-12 h-12 rounded-full items-center justify-center active:opacity-70"
      style={{ backgroundColor }}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}