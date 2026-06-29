import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
import { tokens } from "@/lib/tokens";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileSettings from "@/components/profile/ProfileSettings";
import ProfileLogout from "@/components/profile/ProfileLogout";

export default function Profile() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileHeader />
      <ProfileInfo />
      <ProfileStats />
      <ProfileSettings />
      <ProfileLogout />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.background,
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 120,
    gap: 16,
  },
});
