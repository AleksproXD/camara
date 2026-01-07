import { View, Text, SafeAreaView } from "react-native";
import { MenuButton } from "@/components/MenuButton";
import { InfoCard } from "@/components/InfoCard";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-slate-900 mb-2">
            Cámara Demo
          </Text>
          <Text className="text-lg text-slate-600">
            Explora las funciones disponibles
          </Text>
        </View>

        <View className="mb-6">
          <InfoCard 
            icon="information-circle" 
            message="La integración con la cámara estará disponible próximamente. Por ahora, explora el demo de deslizar fotos."
          />
        </View>

        <MenuButton
          icon="camera"
          title="Tomar Foto"
          description="Captura una nueva imagen"
          onPress={() => {}}
        />

        <MenuButton
          icon="images"
          title="Demo: Deslizar Fotos"
          description="Ejemplo interactivo tipo Tinder"
          onPress={() => router.push("/swipe-demo")}
        />

        <MenuButton
          icon="folder-open"
          title="Galería"
          description="Ver fotos guardadas"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}