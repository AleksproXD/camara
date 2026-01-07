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
            📸 Cámara App
          </Text>
          <Text className="text-lg text-slate-600">
            Captura y organiza tus fotos
          </Text>
        </View>

        <View className="mb-6">
          <InfoCard 
            icon="information-circle" 
            message="Toma fotos, clasifícalas deslizándolas y revisa tu galería."
          />
        </View>

        <MenuButton
          icon="camera"
          title="Tomar Foto"
          description="Captura una nueva imagen"
          onPress={() => router.push("/camera")}
        />

        <MenuButton
          icon="folder-open"
          title="Galería"
          description="Ver todas tus fotos"
          onPress={() => router.push("/gallery")}
        />
      </View>
    </SafeAreaView>
  );
}