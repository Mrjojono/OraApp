import { Tabs } from "expo-router";
import { tabs, components } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

const tabLayout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#E2EBD6",
          elevation: 0,
        },
        tabBarActiveTintColor: "#3A6A00",
        tabBarInactiveTintColor: "#C1C9B4",
        tabBarItemStyle: {
          paddingVertical: (tabBar.height - tabBar.iconFrame) / 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused, color, size }) =>
              tab.icon({ focused, color, size }),
          }}
        />
      ))}
    </Tabs>
  );
};

export default tabLayout;
