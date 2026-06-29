import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  style,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ opacity }]}
      className={cn("bg-muted rounded-xl", className)}
      {...props}
    />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <View className={cn("bg-card rounded-xl p-4 gap-3", className)}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
    </View>
  );
}

function SkeletonSummaryRow({ count = 3 }: { count?: number }) {
  return (
    <View className="flex-row gap-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} className="flex-1 bg-card rounded-xl p-3 items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </View>
      ))}
    </View>
  );
}

function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <View className="gap-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} className="bg-card rounded-xl p-4 gap-3">
          <View className="flex-row items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </View>
          </View>
          <Skeleton className="h-2 w-full rounded-full" />
        </View>
      ))}
    </View>
  );
}

export { Skeleton, SkeletonCard, SkeletonSummaryRow, SkeletonList };
