import { Text, Animated } from "react-native";

type SwipeStampProps = {
  label: string;
  type: "save" | "delete";
  opacity: Animated.AnimatedInterpolation<number>;
  rotation: string;
  position: "left" | "right";
};

export function SwipeStamp({ label, type, opacity, rotation, position }: SwipeStampProps) {
  const borderColor = type === "save" ? "#10b981" : "#ef4444";
  const textColor = type === "save" ? "text-emerald-500" : "text-red-500";
  const positionStyle = position === "left" ? { left: 30 } : { right: 30 };

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 50,
        ...positionStyle,
        borderWidth: 5,
        borderColor,
        borderRadius: 12,
        padding: 12,
        transform: [{ rotate: rotation }],
        opacity,
        zIndex: 10,
      }}
    >
      <Text className={`text-4xl font-bold ${textColor}`}>
        {label}
      </Text>
    </Animated.View>
  );
}