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
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react-native";
import { tokens } from "@/lib/tokens";
import PageHeader from "@/components/PageHeader";
import { showAlert } from "@/components/ui/CustomAlert";

const FG = tokens.onSurface;
const MFG = tokens.onSurfaceVariant;
const P = tokens.accent;

export default function SecuritePage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      await showAlert({
        title: "Champs requis",
        message: "Veuillez remplir tous les champs.",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (newPassword.length < 8) {
      await showAlert({
        title: "Mot de passe trop court",
        message: "Le mot de passe doit contenir au moins 8 caractères.",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      await showAlert({
        title: "Mots de passe différents",
        message: "La confirmation ne correspond pas au nouveau mot de passe.",
        buttons: [{ text: "OK" }],
      });
      return;
    }
    await showAlert({
      title: "Mot de passe modifié",
      message: "Votre mot de passe a été mis à jour avec succès.",
      buttons: [{ text: "OK" }],
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <PageHeader title="Sécurité" subtitle="Gérez votre mot de passe" />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.infoCard}>
            <ShieldCheck size={20} color={P} />
            <Text style={styles.infoText}>
              Utilisez un mot de passe fort, différent de vos autres comptes, et ne le partagez jamais.
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mot de passe actuel</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={MFG}
                  secureTextEntry={!showCurrent}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <Pressable onPress={() => setShowCurrent(!showCurrent)} style={styles.eyeBtn}>
                  {showCurrent ? <EyeOff size={18} color={MFG} /> : <Eye size={18} color={MFG} />}
                </Pressable>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="8 caractères minimum"
                  placeholderTextColor={MFG}
                  secureTextEntry={!showNew}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <Pressable onPress={() => setShowNew(!showNew)} style={styles.eyeBtn}>
                  {showNew ? <EyeOff size={18} color={MFG} /> : <Eye size={18} color={MFG} />}
                </Pressable>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Retaper le nouveau mot de passe"
                placeholderTextColor={MFG}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <Pressable style={styles.submitBtn} onPress={handleSubmit}>
              <Lock size={16} color="#FFF" />
              <Text style={styles.submitText}>Mettre à jour</Text>
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
  infoCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: tokens.accent + "12",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: MFG,
    lineHeight: 18,
  },
  formSection: { gap: 16 },
  inputGroup: { gap: 6 },
  inputLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: MFG,
  },
  inputRow: { position: "relative" },
  input: {
    backgroundColor: tokens.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tokens.outline,
    padding: 14,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: FG,
    paddingRight: 44,
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    padding: 4,
  },
  submitBtn: {
    flexDirection: "row",
    backgroundColor: P,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  submitText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
