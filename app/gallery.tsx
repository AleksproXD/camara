import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, FlatList, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PHOTO_SIZE = (SCREEN_WIDTH - 48) / 3; // 3 columnas con espaciado

export default function GalleryScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (permission?.granted) {
      loadPhotos();
    }
  }, [permission]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      
      console.log("🔍 Buscando álbum 'Camara App'...");
      
      // Primero intentar obtener el álbum específico de la app
      const album = await MediaLibrary.getAlbumAsync("Camara App");
      console.log("📁 Álbum encontrado:", album);
      
      let assets: MediaLibrary.Asset[] = [];
      if (album) {
        // Obtener fotos del álbum de la app
        console.log("📸 Obteniendo fotos del álbum...");
        const albumAssets = await MediaLibrary.getAssetsAsync({
          album: album,
          mediaType: "photo",
          sortBy: MediaLibrary.SortBy.creationTime,
          first: 100,
        });
        console.log("✅ Fotos obtenidas:", albumAssets.assets.length);
        console.log("📋 Lista de fotos:", albumAssets.assets.map(a => ({ id: a.id, uri: a.uri })));
        assets = albumAssets.assets;
      } else {
        // Si no existe el álbum, mostrar mensaje
        console.log("⚠️ No se encontró el álbum 'Camara App'");
      }

      setPhotos(assets);
      console.log("🎉 Estado actualizado con", assets.length, "fotos");
    } catch (error) {
      console.error("❌ Error al cargar fotos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
        <Text className="text-lg text-slate-600">Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center px-8">
        <Ionicons name="images-outline" size={80} color="#94a3b8" />
        <Text className="text-2xl font-bold text-slate-900 mt-6 text-center">
          Permiso de Galería
        </Text>
        <Text className="text-base text-slate-600 mt-3 text-center">
          Necesitamos acceso a tu galería para mostrar tus fotos guardadas
        </Text>
        <Pressable
          onPress={requestPermission}
          className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl active:opacity-70"
        >
          <Text className="text-white font-semibold text-lg">
            Permitir Acceso
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

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center active:opacity-50"
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text className="text-lg font-semibold text-slate-900">
          Mis Fotos ({photos.length})
        </Text>
        <Pressable
          onPress={loadPhotos}
          className="w-10 h-10 items-center justify-center active:opacity-50"
        >
          <Ionicons name="refresh" size={24} color="#1e293b" />
        </Pressable>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-slate-600">Cargando fotos...</Text>
        </View>
      ) : photos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="image-outline" size={80} color="#94a3b8" />
          <Text className="text-2xl font-bold text-slate-900 mt-6 text-center">
            No hay fotos guardadas
          </Text>
          <Text className="text-base text-slate-600 mt-3 text-center">
            Toma una foto y guárdala para verla aquí
          </Text>
          <Pressable
            onPress={() => router.push("/camera")}
            className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl active:opacity-70"
          >
            <Text className="text-white font-semibold text-lg">
              Tomar Foto
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={photos}
          numColumns={3}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                // Aquí podrías navegar a una vista detallada de la foto
              }}
              className="p-1"
              style={{ width: SCREEN_WIDTH / 3 }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: PHOTO_SIZE,
                  height: PHOTO_SIZE,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}