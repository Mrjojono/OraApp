import { Easing } from "react-native-reanimated";

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 400,
    slow: 600,
  },
  delay: {
    stagger: 200,
  },
  spring: {
    snappy: {
      damping: 20,
      stiffness: 300,
      mass: 0.5,
    },
    gentle: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    wobbly: {
      damping: 8,
      stiffness: 100,
      mass: 1,
    },
  },
  easing: {
    default: Easing.bezierFn(0.25, 0.1, 0.25, 1),
    emphasize: Easing.bezierFn(0.2, 0.0, 0.0, 1.0),
    decelerate: Easing.bezierFn(0.0, 0.0, 0.2, 1.0),
  },
  scale: {
    pressIn: 0.96,
    pressOut: 1,
  },
} as const;
