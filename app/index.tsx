import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuButton } from "../components/MenuButton";
import { InfoCard } from "../components/InfoCard";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-slate-900 mb-2">
            Cámara App
          </Text>
          <Text className="text-lg text-slate-600">
            Toma fotos y decide si guardarlas
          </Text>
        </View>

        <View className="mb-6">
          <InfoCard 
            icon="information-circle" 
            message="Toma una foto, deslízala a la derecha para guardar en tu galería o a la izquierda para descartarla."
          />
        </View>

        <MenuButton
          icon="camera"
          title="Tomar Foto"
          description="Captura una nueva imagen"
          onPress={() => router.push("/camera")}
        />

        <MenuButton
          icon="images"
          title="Demo: Deslizar Fotos"
          description="Ejemplo interactivo tipo Tinder"
          onPress={() => router.push("/swipe-demo")}
        />
      </View>
    </SafeAreaView>
  );
}