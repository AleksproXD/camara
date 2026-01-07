import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system/legacy";
import { PhotoCard } from "@/components/organisms/PhotoCard";
import { HeaderBar } from "@/components/organisms/HeaderBar";
import { SwipeInstructions } from "@/components/molecules/SwipeInstructions";
import { ProcessingOverlay } from "@/components/organisms/ProcessingOverlay";

export default function PhotoDecisionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const photoUri = params.photoUri as string;

  const [decision, setDecision] = useState<"save" | "delete" | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handleSwipeComplete(direction: "save" | "delete") {
    setDecision(direction);
    setProcessing(true);

    try {
      if (direction === "save") {
        // Pedir permisos y guardar en galería
        const { status } = await MediaLibrary.requestPermissionsAsync();
        
        if (status === "granted") {
          await MediaLibrary.saveToLibraryAsync(photoUri);
        } else {
          console.log("Permiso denegado para guardar en galería");
        }
      } else {
        // Solo eliminar archivo temporal
        await FileSystem.deleteAsync(photoUri, { idempotent: true });
      }
      
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      console.error("Error al procesar foto:", error);
      setProcessing(false);
    }
  }

  if (processing && decision) {
    return <ProcessingOverlay action={decision} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }} edges={['top', 'bottom']}>
      <HeaderBar
        title="Decide el destino"
        onBack={() => router.back()}
        isDarkMode
      />

      <View className="flex-1 items-center justify-center">
        <PhotoCard photoUri={photoUri} onSwipeComplete={handleSwipeComplete} />
      </View>

      <View className="px-6 pb-8">
        <SwipeInstructions
          isDarkMode
          customMessage="Desliza hacia la izquierda para eliminarla o hacia la derecha para guardarla en la galería de tu celular"
        />
      </View>
    </SafeAreaView>
  );
}