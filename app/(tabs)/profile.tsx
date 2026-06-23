import { View, ScrollView, StyleSheet, Text } from "react-native";
import { tokens } from "@/lib/tokens";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileSettings from "@/components/profile/ProfileSettings";
import ProfileLogout from "@/components/profile/ProfileLogout";

export default function Profile() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Profil</Text>
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
  pageTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: tokens.onSurface,
    marginTop: 12,
    paddingHorizontal: 8,
  },
});
