import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuButton } from "@/components/molecules/MenuButton";
import { InfoCard } from "@/components/molecules/InfoCard";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top', 'bottom']}>
      <View className="flex-1 px-6 pt-8">
        <View className="mb-8">
          <Text className="text-4xl font-bold text-slate-900 mb-2">
             camara :3
          </Text>
          <Text className="text-lg text-slate-600">
            Captura y guarda fotos fácilmente
          </Text>
        </View>

        <View className="mb-6">
          <InfoCard 
            icon="information-circle" 
            message="Toma fotos y decide si guardarlas en tu galería deslizándolas hacia la derecha, o eliminarlas deslizando hacia la izquierda."
          />
        </View>

        <MenuButton
          icon="camera"
          title="Tomar Foto"
          description="Captura una nueva imagen"
          onPress={() => router.push("/camera")}
        />

        <View className="mt-4 bg-blue-50 rounded-2xl p-4">
          <Text className="text-sm text-blue-700 font-semibold mb-2">
             funciona asi
          </Text>
          <Text className="text-xs text-blue-600 leading-5">
            1. Toma una foto con la cámara{'\n'}
            2. Desliza hacia la derecha (→) para guardarla en tu galería{'\n'}
            3. Desliza hacia la izquierda (←) para eliminarla{'\n'}
            4. Revisa tus fotos en la app Galería de tu celular
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}