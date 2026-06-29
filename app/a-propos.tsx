import { View, ScrollView, Text, StyleSheet } from "react-native";
import { tokens } from "@/lib/tokens";
import PageHeader from "@/components/PageHeader";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

export default function AProposPage() {
  return (
    <View style={styles.container}>
      <PageHeader title="À propos" subtitle="Orabank - Suivi financier" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoSection}>
          <Text style={styles.appName}>Orabank</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notre mission</Text>
          <Text style={styles.sectionText}>
            Orabank vous aide à mieux gérer vos finances personnelles en
            analysant automatiquement vos transactions bancaires via SMS. Suivez
            vos dépenses, épargnez intelligemment et améliorez votre santé
            financière.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contact</Text>
          <Text style={styles.sectionText}>
            Service client : 22 20 30 40{"\n"}
            Email : support@orabank.net
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mentions légales</Text>
          <Text style={styles.sectionText}>
            Orabank © 2026 - Tous droits réservés.{"\n"}
            Application développée par Orabank.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.background },
  scroll: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 120, gap: 20, paddingTop: 24 },
  logoSection: {
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
  },
  appName: {
    fontFamily: "BebasNeue_400Regular",
    fontSize: 44,
    color: P,
    letterSpacing: 2,
  },
  versionBadge: {
    backgroundColor: tokens.surface,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  versionText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: MFG,
  },
  section: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  sectionLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: MFG,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: FG,
    lineHeight: 18,
  },
});
