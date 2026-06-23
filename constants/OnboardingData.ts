import { ImageSourcePropType } from "react-native";

export interface OnboardingItem {
  backgroundColor: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

const OnboardingData: OnboardingItem[] = [
  {
    backgroundColor: "#0D0D0D",
    title: "Comprendre vos revenus",
    subtitle:
      "Connectez votre compte et on analyse vos revenus automatiquement.",
    image: require("../assets/images/tract.png"),
  },
  {
    backgroundColor: "#0D0D0D",
    title: "Suivre vos dépenses",
    subtitle: "On catégorise chaque transaction sans effort de votre part.",
    image: require("../assets/images/Wallet-bro.png"),
  },
  {
    backgroundColor: "#0D0D0D",
    title: "Construire votre épargne",
    subtitle: "Visualisez vos progrès et gardez le cap sur vos objectifs.",
    image: require("../assets/images/income.png"),
  },
  {
    backgroundColor: "#0D0D0D",
    title: "Votre score de santé financière",
    subtitle:
      "Un score personnalisé calculé chaque mois selon votre situation réelle.",
    image: require("../assets/images/score.png"),
  },
];

export default OnboardingData;
