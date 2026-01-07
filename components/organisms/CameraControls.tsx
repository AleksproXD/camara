import { View, Text, Pressable } from "react-native";
import { IconButton } from "@/components/atoms/IconButton";

type CameraControlsProps = {
  onClose: () => void;
  onFlip: () => void;
  onCapture: () => void;
  isCapturing: boolean;
};

export function CameraControls({
  onClose,
  onFlip,
  onCapture,
  isCapturing,
}: CameraControlsProps) {
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <IconButton
          icon="close"
          onPress={onClose}
          color="#fff"
          backgroundColor="rgba(0,0,0,0.5)"
          size={28}
        />
        <View className="flex-1" />
        <IconButton
          icon="camera-reverse"
          onPress={onFlip}
          color="#fff"
          backgroundColor="rgba(0,0,0,0.5)"
          size={28}
        />
      </View>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Bottom Controls */}
      <View className="pb-8 px-6">
        <View className="flex-row items-center justify-center">
          <Pressable
            onPress={onCapture}
            disabled={isCapturing}
            className="w-20 h-20 rounded-full border-4 border-white items-center justify-center active:scale-95"
            style={{
              backgroundColor: isCapturing ? "#94a3b8" : "#fff",
            }}
          >
            <View className="w-16 h-16 rounded-full bg-white" />
          </Pressable>
        </View>
        <Text className="text-white text-center mt-4 text-sm opacity-80">
          {isCapturing ? "Capturando..." : "Toca para capturar"}
        </Text>
      </View>
    </>
  );
}