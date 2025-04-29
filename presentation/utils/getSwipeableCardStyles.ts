import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GetSwipeCardStyles } from "../interfaces";

export const getSwipeableCardStyles = ({
  translateX,
  translateY,
  nopeIndicatorOpacity,
  likeIndicatorOpacity,
  superLikeIndicatorOpacity,
  nopeLikeIndicatorScale,
  superLikeIndicatorScale,
  overlayOpacity,
  overlayColor,
  index,
  screenWidth,
}: GetSwipeCardStyles) => {
  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(
      translateX.value,
      [-screenWidth / 2, 0, screenWidth / 2],
      [-15, 0, 15],
      "clamp"
    );

    const scale = interpolate(index, [0, 1, 2], [1, 0.95, 0.9], "clamp");
    const translateYStack = interpolate(index, [0, 1, 2], [0, 10, 20], "clamp");

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + translateYStack },
        { rotateZ: `${rotateZ}deg` },
      ],
      opacity: interpolate(
        translateX.value,
        [-screenWidth / 2, 0, screenWidth / 2],
        [0.7, 1, 0.7],
        "clamp"
      ),
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: overlayColor.value,
      opacity: overlayOpacity.value,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  const nopeIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: nopeIndicatorOpacity.value,
      transform: [
        { scale: nopeLikeIndicatorScale.value },
        { rotate: "-15deg" },
      ],

      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -90,
      marginTop: -40,
    };
  });

  const likeIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: likeIndicatorOpacity.value,
      transform: [{ scale: nopeLikeIndicatorScale.value }, { rotate: "15deg" }],

      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -90,
      marginTop: -40,
    };
  });

  const superLikeIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: superLikeIndicatorOpacity.value,
      transform: [{ scale: superLikeIndicatorScale.value }],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: -90,
      marginTop: -40,
    };
  });

  return {
    animatedStyle,
    overlayStyle,
    nopeIndicatorStyle,
    likeIndicatorStyle,
    superLikeIndicatorStyle,
  };
};
