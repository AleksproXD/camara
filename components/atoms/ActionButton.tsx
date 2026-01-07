import { Pressable, Text } from "react-native";

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

export function ActionButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
}: ActionButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600";
      case "secondary":
        return "bg-slate-200";
      case "danger":
        return "bg-red-600";
      default:
        return "bg-blue-600";
    }
  };

  const getTextColor = () => {
    return variant === "secondary" ? "text-slate-700" : "text-white";
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`px-8 py-4 rounded-2xl active:opacity-70 ${getVariantStyles()} ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <Text className={`${getTextColor()} font-semibold text-lg text-center`}>
        {label}
      </Text>
    </Pressable>
  );
}