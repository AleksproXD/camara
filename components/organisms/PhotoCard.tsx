import { useRef } from "react";
import { Animated, PanResponder, Image, Dimensions } from "react-native";
import { SwipeStamp } from "@/components/molecules/SwipeStamp";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type PhotoCardProps = {
  photoUri: string;
  onSwipeComplete: (direction: "save" | "delete") => void;
};

export function PhotoCard({ photoUri, onSwipeComplete }: PhotoCardProps) {
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
          const direction = gesture.dx > 0 ? "save" : "delete";
          const directionValue = gesture.dx > 0 ? 1 : -1;

          Animated.parallel([
            Animated.timing(position, {
              toValue: { x: directionValue * SCREEN_WIDTH, y: gesture.dy + 100 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(rotation, {
              toValue: directionValue * 25,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(() => {
            onSwipeComplete(direction);
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

  return (
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
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        overflow: "hidden",
      }}
    >
      <SwipeStamp
        label="GUARDAR"
        type="save"
        opacity={saveOpacity}
        rotation="-25deg"
        position="left"
      />

      <SwipeStamp
        label="ELIMINAR"
        type="delete"
        opacity={deleteOpacity}
        rotation="25deg"
        position="right"
      />

      <Image
        source={{ uri: photoUri }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
}