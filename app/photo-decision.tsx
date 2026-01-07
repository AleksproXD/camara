import { View, Text, Pressable, Dimensions, Animated, PanResponder, Image, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function PhotoDecisionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const photoUri = params.photoUri as string;
  const [isProcessing, setIsProcessing] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const position = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;

  // Verificar permisos de galería
  if (!mediaPermission) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
        <Text className="text-lg text-slate-600">Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center px-8">
        <Ionicons name="images-outline" size={80} color="#94a3b8" />
        <Text className="text-2xl font-bold text-slate-900 mt-6 text-center">
          Permiso de Galería
        </Text>
        <Text className="text-base text-slate-600 mt-3 text-center">
          Necesitamos acceso para guardar fotos en tu galería
        </Text>
        <Pressable
          onPress={requestMediaPermission}
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

  const savePhotoToGallery = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      console.log("💾 Guardando en galería:", photoUri);
      
      // Guardar directamente en la galería del sistema
      const asset = await MediaLibrary.createAssetAsync(photoUri);
      console.log("✅ Foto guardada en galería:", asset.id);

      Alert.alert(
        "¡Guardada!",
        "La foto se guardó en tu galería",
        [
          {
            text: "Tomar otra",
            onPress: () => router.replace("/camera"),
          },
          {
            text: "Ir al inicio",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      Alert.alert("Error", "No se pudo guardar la foto");
      setIsProcessing(false);
    }
  };

  const deletePhoto = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      console.log("🗑️ Foto descartada");
      
      Alert.alert(
        "Descartada",
        "La foto no se guardó",
        [
          {
            text: "Tomar otra",
            onPress: () => router.replace("/camera"),
          },
          {
            text: "Ir al inicio",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (error) {
      console.error("❌ Error:", error);
      router.back();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isProcessing,
      onPanResponderMove: (_, gesture) => {
        if (isProcessing) return;
        position.setValue({ x: gesture.dx, y: gesture.dy });
        rotation.setValue(gesture.dx / 20);
      },
      onPanResponderRelease: async (_, gesture) => {
        if (isProcessing) return;

        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          const direction = gesture.dx > 0 ? 1 : -1;
          
          Animated.parallel([
            Animated.timing(position, {
              toValue: { x: direction * SCREEN_WIDTH * 1.5, y: gesture.dy + 100 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: direction * 25,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(async () => {
            if (direction > 0) {
              await savePhotoToGallery();
            } else {
              await deletePhoto();
            }
          });
        } else {
          Animated.parallel([
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }),
            Animated.spring(rotation, {
              toValue: 0,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const rotateCard = rotation.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-30deg", "0deg", "30deg"],
  });

  const saveOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const deleteOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  if (!photoUri) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
        <Text className="text-lg text-slate-600">No hay foto para revisar</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-blue-600 px-8 py-4 rounded-2xl active:opacity-70"
        >
          <Text className="text-white font-semibold text-lg">Volver</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center active:opacity-50"
          disabled={isProcessing}
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text className="text-lg font-semibold text-slate-900">
          Revisar Foto
        </Text>
        <View className="w-10" />
      </View>

      {/* Photo Card */}
      <View className="flex-1 items-center justify-center">
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: rotateCard },
            ],
            width: SCREEN_WIDTH - 60,
            height: SCREEN_HEIGHT * 0.65,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          {/* Save stamp */}
          <Animated.View
            style={{
              position: "absolute",
              top: 50,
              left: 30,
              borderWidth: 5,
              borderColor: "#10b981",
              borderRadius: 12,
              padding: 12,
              transform: [{ rotate: "-25deg" }],
              opacity: saveOpacity,
              zIndex: 10,
            }}
          >
            <Text className="text-4xl font-bold text-emerald-500">
              GUARDAR
            </Text>
          </Animated.View>

          {/* Delete stamp */}
          <Animated.View
            style={{
              position: "absolute",
              top: 50,
              right: 30,
              borderWidth: 5,
              borderColor: "#ef4444",
              borderRadius: 12,
              padding: 12,
              transform: [{ rotate: "25deg" }],
              opacity: deleteOpacity,
              zIndex: 10,
            }}
          >
            <Text className="text-4xl font-bold text-red-500">
              DESCARTAR
            </Text>
          </Animated.View>

          {/* Photo */}
          <Image
            source={{ uri: photoUri }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 24,
            }}
            resizeMode="cover"
          />
        </Animated.View>
      </View>

      {/* Instructions */}
      <View className="px-6 pb-8">
        <View className="bg-blue-50 rounded-2xl p-4">
          <View className="flex-row items-center justify-center">
            <View className="flex-row items-center mr-6">
              <Ionicons name="arrow-back" size={20} color="#3b82f6" />
              <Text className="text-sm text-blue-700 ml-2 font-semibold">
                Descartar
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm text-blue-700 mr-2 font-semibold">
                Guardar
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#3b82f6" />
            </View>
          </View>
          <Text className="text-xs text-blue-600 text-center mt-2">
            Desliza la foto en la dirección que prefieras
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row items-center justify-center mt-4 gap-4">
          <Pressable
            onPress={deletePhoto}
            disabled={isProcessing}
            className="bg-red-100 px-6 py-3 rounded-xl active:opacity-70 flex-row items-center"
          >
            <Ionicons name="close-circle-outline" size={20} color="#ef4444" />
            <Text className="text-red-600 font-semibold ml-2">Descartar</Text>
          </Pressable>
          <Pressable
            onPress={savePhotoToGallery}
            disabled={isProcessing}
            className="bg-emerald-100 px-6 py-3 rounded-xl active:opacity-70 flex-row items-center"
          >
            <Ionicons name="checkmark-circle-outline" size={20} color="#10b981" />
            <Text className="text-emerald-600 font-semibold ml-2">Guardar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}