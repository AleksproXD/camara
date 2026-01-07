import { useState, useEffect } from "react";
import { View, SafeAreaView, Pressable, FlatList, Image, Dimensions, Text } from "react-native";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { PermissionScreen } from "@/components/organisms/PermissionScreen";
import { HeaderBar } from "@/components/organisms/HeaderBar";
import { EmptyState } from "@/components/organisms/EmptyState";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_SIZE = (SCREEN_WIDTH - 48) / 3;

export default function GalleryScreen() {
  const router = useRouter();
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, [permission]);

  async function loadPhotos() {
    if (!permission?.granted) {
      setLoading(false);
      return;
    }

    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        sortBy: "creationTime",
        first: 100,
      });
      setPhotos(assets);
    } catch (error) {
      console.error("Error cargando fotos:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-slate-600">Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <PermissionScreen
        icon="images"
        title="Acceso a Galería"
        description="Necesitamos permiso para mostrar tus fotos"
        onRequestPermission={requestPermission}
        onGoBack={() => router.back()}
        isDarkMode={false}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <HeaderBar
        title="Galería"
        onBack={() => router.back()}
        onAction={loadPhotos}
        actionIcon="refresh"
      />

      {loading ? (
        <EmptyState
          icon="time"
          title="Cargando fotos..."
          description="Esto puede tomar un momento"
        />
      ) : photos.length === 0 ? (
        <EmptyState
          icon="image-outline"
          title="No hay fotos"
          description="Toma algunas fotos con la cámara para verlas aquí"
          actionLabel="Abrir Cámara"
          onAction={() => router.push("/camera")}
        />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => console.log("Foto seleccionada:", item.uri)}
              style={{ width: ITEM_SIZE, height: ITEM_SIZE, margin: 4 }}
              className="active:opacity-70"
            >
              <Image
                source={{ uri: item.uri }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}