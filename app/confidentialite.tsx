import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Shield, Lock, FileText } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import PageHeader from "@/components/PageHeader";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

const sections = [
  {
    icon: Shield,
    title: "Données collectées",
    text: "Nous accédons uniquement aux SMS bancaires que vous nous autorisez à lire, dans le seul but d'analyser vos revenus et dépenses. Aucune donnée personnelle n'est partagée avec des tiers sans votre consentement explicite.",
  },
  {
    icon: Lock,
    title: "Sécurité des données",
    text: "Toutes les données sont chiffrées de bout en bout et stockées conformément aux normes bancaires de l'UMOA. Vous pouvez demander la suppression de vos données à tout moment.",
  },
  {
    icon: FileText,
    title: "Vos droits",
    text: "Conformément à la règlementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez votre agence Orabank.",
  },
];

export default function ConfidentialitePage() {
  return (
    <View style={styles.container}>
      <PageHeader title="Confidentialité" subtitle="Protection de vos données" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Orabank s'engage à protéger la confidentialité de vos données personnelles.
          Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
        </Text>

        {sections.map((s, i) => {
          const Icon = s.icon;
          return (
            <View key={i} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.iconBox}>
                  <Icon size={18} color={P} />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <Text style={styles.cardText}>{s.text}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.background },
  scroll: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 120, gap: 16, paddingTop: 16 },
  intro: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: MFG,
    lineHeight: 20,
  },
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: tokens.accent + "15",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  cardBody: { flex: 1, gap: 4 },
  cardTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14,
    color: FG,
  },
  cardText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: MFG,
    lineHeight: 18,
  },
});
