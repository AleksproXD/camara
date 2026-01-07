import { useState, useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { PermissionScreen } from "@/components/organisms/PermissionScreen";
import { CameraControls } from "@/components/organisms/CameraControls";

export default function CameraScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  if (!permission) {
    return (
      <PermissionScreen
        icon="camera"
        title="Cargando..."
        description="Verificando permisos de cámara"
        onRequestPermission={requestPermission}
        onGoBack={() => router.back()}
        isDarkMode
      />
    );
  }

  if (!permission.granted) {
    return (
      <PermissionScreen
        icon="camera"
        title="Permisos Necesarios"
        description="Necesitamos acceso a la cámara para tomar fotos"
        onRequestPermission={requestPermission}
        onGoBack={() => router.back()}
        isDarkMode
      />
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo?.uri) {
        router.push({
          pathname: "/photo-decision",
          params: { photoUri: photo.uri },
        });
      }
    } catch (error) {
      console.error("Error al tomar foto:", error);
    } finally {
      setIsCapturing(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing}>
        <CameraControls
          onClose={() => router.back()}
          onFlip={toggleCameraFacing}
          onCapture={takePicture}
          isCapturing={isCapturing}
        />
      </CameraView>
    </SafeAreaView>
  );
}