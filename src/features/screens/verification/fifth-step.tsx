import { View, StyleSheet, Image, Text, Alert } from "react-native";
import VerifyHeader from "./verify-header";
import AppButton from "../../../components/button";
import { useVerification } from "../../../hooks/mutations/verification";

interface Props {
  documentType?: string | null;
  frontImage?: string | null;
  backImage?: string | null;
 
  onNext?: () => void;
  onBack?: () => void;
  onCancel?: () => void;
}

export default function FifthStepVerification({
  documentType,
  frontImage,
  backImage,
  onNext,
  
}: Props) {
  const { mutate, isPending } = useVerification();

  const handleSubmit = () => {
    if (!frontImage || !backImage) {
      Alert.alert(
        "Passport required",
        "Please upload both the front and back of your passport.",
      );
      return;
    }

    const payload = {
      documentType,
      documentFrontUrl: frontImage,
      documentBackUrl: backImage,
     
    };

    console.log("Verification payload:", payload);

    mutate(payload, {
      onSuccess: (data) => {
        console.log("Verification successful:", data);

        Alert.alert(
          "Verification submitted",
          "Your passport has been submitted successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                onNext?.();
              },
            },
          ],
        );
      },

      onError: (error: any) => {
        console.log("Verification error:", error?.response?.data || error);

        Alert.alert(
          "Verification failed",
          error?.response?.data?.message ||
            "Unable to submit your verification. Please try again.",
        );
      },
    });
  };

  return (
    <View style={styles.container}>
      <VerifyHeader
        title="Passport View"
        description="Review your passport before submitting"
      />

      <View style={styles.imagesContainer}>
        {/* FRONT */}
        {frontImage && (
          <View style={styles.imageWrapper}>
            <Text style={styles.label}>Front of passport</Text>

            <Image
              source={{ uri: frontImage }}
              style={styles.passportImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* BACK */}
        {backImage && (
          <View style={styles.imageWrapper}>
            <Text style={styles.label}>Back of passport</Text>

            <Image
              source={{ uri: backImage }}
              style={styles.passportImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>

      {/* BUTTON */}
      <View style={styles.footer}>
        <AppButton
          title={isPending ? "Submitting..." : "Continue"}
          backgroundColor="#540863"
          textColor="#fff"
          disabled={!frontImage || !backImage || isPending}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    marginTop: 25,
    gap: 20,
  },

  imageWrapper: {
    backgroundColor: "#F0F0F4",
    borderRadius: 14,
    padding: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
  },

  passportImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },

  footer: {
    marginTop: 25,
    paddingBottom: 20,
  },
});
