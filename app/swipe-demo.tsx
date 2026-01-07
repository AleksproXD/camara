import { View, Text, SafeAreaView, Pressable, Dimensions, Animated, PanResponder } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

// Colores aleatorios para las tarjetas de ejemplo
const SAMPLE_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
  "#F8B739", "#52B788", "#E76F51", "#2A9D8F"
];

type Card = {
  id: number;
  color: string;
};

export default function SwipeDemo() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      color: SAMPLE_COLORS[i % SAMPLE_COLORS.length],
    }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        rotation.setValue(gesture.dx / 20);
      },
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          const direction = gesture.dx > 0 ? 1 : -1;
          Animated.parallel([
            Animated.timing(position, {
              toValue: { x: direction * SCREEN_WIDTH, y: gesture.dy + 100 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: direction * 25,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(() => {
            if (currentIndex < cards.length - 1) {
              setCurrentIndex(currentIndex + 1);
            }
            position.setValue({ x: 0, y: 0 });
            rotation.setValue(0);
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

  if (currentIndex >= cards.length) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="checkmark-circle" size={80} color="#10b981" />
          <Text className="text-3xl font-bold text-slate-900 mt-6 text-center">
            ¡Has revisado todas las fotos!
          </Text>
          <Text className="text-lg text-slate-600 mt-3 text-center">
            En la app real, aquí irían las fotos de tu cámara
          </Text>
          <Pressable
            onPress={() => {
              setCurrentIndex(0);
              position.setValue({ x: 0, y: 0 });
              rotation.setValue(0);
            }}
            className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl active:opacity-70"
          >
            <Text className="text-white font-semibold text-lg">
              Reiniciar Demo
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 bg-slate-200 px-8 py-4 rounded-2xl active:opacity-70"
          >
            <Text className="text-slate-700 font-semibold text-lg">
              Volver al Menú
            </Text>
          </Pressable>
        </View>
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
        >
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text className="text-lg font-semibold text-slate-900">
          {currentIndex + 1} / {cards.length}
        </Text>
        <View className="w-10" />
      </View>

      {/* Cards Stack */}
      <View className="flex-1 items-center justify-center">
        {/* Next card (preview) */}
        {currentIndex + 1 < cards.length && (
          <View
            style={{
              position: "absolute",
              width: SCREEN_WIDTH - 60,
              height: 500,
              backgroundColor: cards[currentIndex + 1].color,
              borderRadius: 24,
              transform: [{ scale: 0.95 }],
              opacity: 0.5,
            }}
          />
        )}

        {/* Current card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: rotateCard },
            ],
            width: SCREEN_WIDTH - 60,
            height: 500,
            backgroundColor: cards[currentIndex].color,
            borderRadius: 24,
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
            }}
          >
            <Text className="text-4xl font-bold text-red-500">
              ELIMINAR
            </Text>
          </Animated.View>

          {/* Card content */}
          <View className="flex-1 items-center justify-center">
            <Ionicons name="image" size={80} color="rgba(255,255,255,0.5)" />
            <Text className="text-white text-2xl font-bold mt-4">
              Foto #{cards[currentIndex].id + 1}
            </Text>
            <Text className="text-white text-base mt-2 opacity-80">
              Desliza para clasificar
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Instructions */}
      <View className="px-6 pb-8">
        <View className="bg-blue-50 rounded-2xl p-4">
          <View className="flex-row items-center justify-center">
            <View className="flex-row items-center mr-6">
              <Ionicons name="arrow-back" size={20} color="#3b82f6" />
              <Text className="text-sm text-blue-700 ml-2 font-semibold">
                Eliminar
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
      </View>
    </SafeAreaView>
  );
}