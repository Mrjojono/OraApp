import { useCallback } from "react";
import {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type ComplexAnimationBuilder,
} from "react-native-reanimated";
import { ANIMATION } from "./anim.config";

export function useAnimation() {
  const pressScale = usePressScale();

  return {
    entrance: {
      get fade(): ComplexAnimationBuilder {
        return FadeIn.duration(ANIMATION.duration.normal).easing(
          ANIMATION.easing.default,
        ) as unknown as ComplexAnimationBuilder;
      },
      get slideUp(): ComplexAnimationBuilder {
        return FadeInDown.duration(ANIMATION.duration.normal).easing(
          ANIMATION.easing.emphasize,
        ) as unknown as ComplexAnimationBuilder;
      },
      get slideDown(): ComplexAnimationBuilder {
        return FadeInUp.duration(ANIMATION.duration.normal).easing(
          ANIMATION.easing.emphasize,
        ) as unknown as ComplexAnimationBuilder;
      },
      get bounce(): ComplexAnimationBuilder {
        return BounceIn.duration(ANIMATION.duration.slow).damping(
          ANIMATION.spring.gentle.damping,
        ) as unknown as ComplexAnimationBuilder;
      },
      get slideFromRight(): ComplexAnimationBuilder {
        return SlideInDown.duration(ANIMATION.duration.normal).easing(
          ANIMATION.easing.emphasize,
        ) as unknown as ComplexAnimationBuilder;
      },
    },
    pressScale,
    transition: useTransition(),
  };
}

function usePressScale() {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(ANIMATION.scale.pressIn, ANIMATION.spring.snappy);
  }, [scale]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(ANIMATION.scale.pressOut, ANIMATION.spring.snappy);
  }, [scale]);

  return { style, onPressIn, onPressOut };
}

function useTransition() {
  const progress = useSharedValue(0);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, {
      duration: ANIMATION.duration.normal,
      easing: ANIMATION.easing.default,
    }),
  }));

  return { progress, fadeStyle };
}
