import { View, StyleSheet, Image, Text, Alert } from "react-native";
import VerifyHeader from "./verify-header";
import AppButton from "../../../components/button";

import { useFilesUploadUrl } from "../../../hooks/mutations/upload";
import axios from "axios";
import { useKycVerification } from "../../../hooks/mutations/verification";
import Loading from "../../../components/loading";
import { useState } from "react";
import AppToast from "../../../components/toast";
import { useNavigation } from "@react-navigation/native";

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
}: Props) {
  const navigation = useNavigation<any>();

  const { mutateAsync: getUploadUrl } = useFilesUploadUrl();
  const { mutateAsync: verifyKyc } = useKycVerification();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "warning" | "info",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success",
  ) => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const documentName =
    documentType === "drivers-license" ? "Driver's license" : "Passport";

  const baseFileName = documentName.toLowerCase().replace(/\s+/g, "-");

  const uploadImage = async (imageUri: string, side: "front" | "back") => {
    const response = await fetch(imageUri);
    const file = await response.blob();

    const uploadData = await getUploadUrl({
      purpose: "kyc_document",
      fileName: `${baseFileName}-${side}.jpg`,
      contentType: "image/jpeg",
    });

    await axios.put(uploadData.uploadUrl, file, {
      headers: uploadData.headers,
    });

    return uploadData.key;
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      Alert.alert(
        "Missing documents",
        "Please provide both the front and back images.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Upload FRONT
      const documentFrontKey = await uploadImage(frontImage, "front");

      console.log("Front uploaded:", documentFrontKey);

      // 2. Upload BACK
      const documentBackKey = await uploadImage(backImage, "back");

      console.log("Back uploaded:", documentBackKey);

      // 3. Prepare KYC payload
      const payload = {
        documentType:
          documentType === "drivers-license" ? "DRIVERS_LICENSE" : "PASSPORT",

        documentFrontKey,
        documentBackKey,
      };

      console.log("KYC payload:", payload);

      // 4. Submit KYC
      await verifyKyc(payload);

      // 5. Show success toast
      showToast("Your verification was submitted successfully.", "success");

      // 6. Give toast time to display, then navigate
      setTimeout(() => {
        navigation.navigate("app", {
          screen: "Dashboard",
        });
      }, 1500);
    } catch (error: any) {
      console.error("KYC verification failed:", error?.response?.data || error);

      showToast(
        error?.response?.data?.message ||
          "Unable to submit your verification. Please try again.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            visible: false,
          }))
        }
      />

      <VerifyHeader
        title={`${documentName} View`}
        description={`Review your ${documentName.toLowerCase()} before submitting`}
      />

      <View style={styles.imagesContainer}>
        {frontImage && (
          <View style={styles.imageWrapper}>
            <Text style={styles.label}>
              Front of {documentName.toLowerCase()}
            </Text>

            <Image
              source={{ uri: frontImage }}
              style={styles.documentImage}
              resizeMode="contain"
            />
          </View>
        )}

        {backImage && (
          <View style={styles.imageWrapper}>
            <Text style={styles.label}>
              Back of {documentName.toLowerCase()}
            </Text>

            <Image
              source={{ uri: backImage }}
              style={styles.documentImage}
              resizeMode="contain"
            />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <AppButton
          title={isSubmitting ? <Loading /> : "Continue"}
          backgroundColor="#540863"
          textColor="#fff"
          disabled={!frontImage || !backImage || isSubmitting}
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

  documentImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },

  footer: {
    marginTop: 25,
    paddingBottom: 20,
  },
});
