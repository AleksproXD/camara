import { View, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
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
        await MediaLibrary.saveToLibraryAsync(photoUri);
      } else {
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
    <SafeAreaView className="flex-1 bg-slate-900">
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
          customMessage="Desliza hacia la izquierda para eliminarla o hacia la derecha para guardarla en tu galería"
        />
      </View>
    </SafeAreaView>
  );
}