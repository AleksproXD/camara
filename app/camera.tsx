import { useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!cameraPermission) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
        <Text className="text-lg text-slate-600">Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center px-8">
        <Ionicons name="camera-outline" size={80} color="#94a3b8" />
        <Text className="text-2xl font-bold text-slate-900 mt-6 text-center">
          Permiso de Cámara
        </Text>
        <Text className="text-base text-slate-600 mt-3 text-center">
          Necesitamos acceso a tu cámara para tomar fotos
        </Text>
        <Pressable
          onPress={requestCameraPermission}
          className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl active:opacity-70"
        >
          <Text className="text-white font-semibold text-lg">
            Permitir Cámara
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-slate-200 px-8 py-4 rounded-2xl active:opacity-70"
        >
          <Text className="text-slate-700 font-semibold text-lg">
            Volver
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo?.uri) {
        console.log("📸 Foto tomada:", photo.uri);
        // Usar la ruta de photo-decision que ya existe
        router.push({
          pathname: "/photo-decision",
          params: { photoUri: photo.uri },
        } as any);
      }
    } catch (error) {
      console.error("❌ Error al tomar foto:", error);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} className="flex-1" facing={facing}>
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="px-6 py-4 flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 items-center justify-center bg-black/50 rounded-full active:opacity-70"
            >
              <Ionicons name="close" size={28} color="white" />
            </Pressable>
            <Pressable
              onPress={toggleCameraFacing}
              className="w-12 h-12 items-center justify-center bg-black/50 rounded-full active:opacity-70"
            >
              <Ionicons name="camera-reverse" size={28} color="white" />
            </Pressable>
          </View>

          <View className="flex-1" />

          {/* Bottom Controls */}
          <View className="pb-12 items-center">
            <Pressable
              onPress={takePicture}
              className="w-20 h-20 rounded-full bg-white border-4 border-white items-center justify-center active:scale-95"
            >
              <View className="w-16 h-16 rounded-full bg-white" />
            </Pressable>
            <Text className="text-white text-sm mt-4 opacity-80">
              Toca para capturar
            </Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}