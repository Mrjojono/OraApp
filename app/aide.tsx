import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MessageCircle, Phone, ChevronDown, ChevronUp } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import PageHeader from "@/components/PageHeader";
import { showAlert } from "@/components/ui/CustomAlert";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

const faqs = [
  {
    q: "Comment activer une alerte SMS ?",
    a: "Rendez-vous dans Paramètres > Notifications pour activer les alertes de solde et de transactions.",
  },
  {
    q: "Mon solde semble incorrect",
    a: "Les SMS sont lus automatiquement. Vérifiez que l'application a bien accès à vos messages. Vous pouvez forcer une synchro en tirant vers le bas sur l'accueil.",
  },
  {
    q: "Comment contacter mon agence ?",
    a: "Appelez le 22 20 30 40 ou rendez-vous dans votre agence Orabank la plus proche.",
  },
  {
    q: "Comment supprimer mon compte ?",
    a: "Contactez directement votre agence Orabank ou le service client au 22 20 30 40.",
  },
];

export default function AidePage() {
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleEnvoyer = async () => {
    if (!sujet.trim() || !message.trim()) {
      await showAlert({
        title: "Champs requis",
        message: "Veuillez remplir le sujet et le message.",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    await showAlert({
      title: "Message envoyé",
      message: "Votre demande a été transmise. Vous recevrez une réponse sous 48h.",
      buttons: [{ text: "OK" }],
    });
    setSujet("");
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <PageHeader title="Aide & support" subtitle="Contactez-nous ou consultez la FAQ" />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contactCard}>
            <View style={styles.contactRow}>
              <View style={styles.contactIcon}>
                <Phone size={18} color={P} />
              </View>
              <View style={styles.contactTextArea}>
                <Text style={styles.contactLabel}>Service client</Text>
                <Text style={styles.contactValue}>22 20 30 40</Text>
              </View>
            </View>
            <View style={styles.contactDivider} />
            <View style={styles.contactRow}>
              <View style={styles.contactIcon}>
                <MessageCircle size={18} color={P} />
              </View>
              <View style={styles.contactTextArea}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>support@orabank.net</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Questions fréquentes</Text>
            {faqs.map((faq, i) => {
              const open = expandedFaq === i;
              return (
                <Pressable
                  key={i}
                  style={styles.faqCard}
                  onPress={() => setExpandedFaq(open ? null : i)}
                >
                  <View style={styles.faqRow}>
                    <Text style={styles.faqQ} numberOfLines={open ? undefined : 2}>
                      {faq.q}
                    </Text>
                    {open ? (
                      <ChevronUp size={16} color={MFG} />
                    ) : (
                      <ChevronDown size={16} color={MFG} />
                    )}
                  </View>
                  {open && <Text style={styles.faqA}>{faq.a}</Text>}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Contacter l'assistance</Text>
            <TextInput
              style={styles.input}
              placeholder="Sujet"
              placeholderTextColor={MFG}
              value={sujet}
              onChangeText={setSujet}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Votre message..."
              placeholderTextColor={MFG}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Pressable style={styles.submitBtn} onPress={handleEnvoyer}>
              <Text style={styles.submitText}>Envoyer</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.background },
  scroll: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingBottom: 120, gap: 20, paddingTop: 16 },
  contactCard: {
    backgroundColor: tokens.surface,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: tokens.accent + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  contactTextArea: { flex: 1 },
  contactLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: MFG,
  },
  contactValue: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14,
    color: FG,
  },
  contactDivider: {
    height: 1,
    backgroundColor: tokens.outline + "50",
  },
  sectionBlock: { gap: 10 },
  sectionTitle: {
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: MFG,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  faqCard: {
    backgroundColor: tokens.surface,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  faqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  faqQ: {
    flex: 1,
    fontFamily: "DMSans_500Medium",
    fontSize: 13,
    color: FG,
    lineHeight: 18,
  },
  faqA: {
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: MFG,
    lineHeight: 17,
    borderTopWidth: 1,
    borderTopColor: tokens.outline + "40",
    paddingTop: 8,
  },
  input: {
    backgroundColor: tokens.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 14,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: FG,
  },
  textArea: { minHeight: 100 },
  submitBtn: {
    backgroundColor: P,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
