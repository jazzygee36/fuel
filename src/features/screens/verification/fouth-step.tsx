import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import VerifyHeader from "./verify-header";
import AppButton from "../../../components/button";

interface Props {
  documentType?: string | null;
  onNext?: () => void;
  onBack?: () => void;
  backImage: string | null;
  setBackImage: (image: string | null) => void;
}

export default function ForthStepVerification({
  documentType,
  onNext,
  onBack,
  backImage,
  setBackImage,
}: Props) {
  const pickPassport = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to your photos to upload your passport.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;

        // Save the image in the parent component
        setBackImage(imageUri);
      }
    } catch (error) {
      console.log("Image picker error:", error);

      Alert.alert(
        "Error",
        "Unable to select the passport image.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <VerifyHeader
        title="Back of passport"
        description="Scans and photocopies are not accepted"
      />

      {/* Upload / Selected Image */}
      <Pressable
        style={[
          styles.uploadContainer,
          backImage && styles.selectedContainer,
        ]}
        onPress={pickPassport}
      >
        {backImage ? (
          <>
            <Image
              source={{ uri: backImage }}
              style={styles.selectedImage}
              resizeMode="cover"
            />

            <View style={styles.changeOverlay}>
              <Ionicons
                name="camera-outline"
                size={20}
                color="#fff"
              />

              <Text style={styles.changeText}>
                Change photo
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.uploadIcon}>
              <Ionicons
                name="cloud-upload-outline"
                size={32}
                color="#540863"
              />
            </View>

            <Text style={styles.uploadTitle}>
              Upload passport
            </Text>

            <Text style={styles.uploadDescription}>
              Tap here to select a photo of the back of your passport
            </Text>
          </>
        )}
      </Pressable>

      {/* Continue */}
      <View style={styles.footer}>
        <AppButton
          title="Continue"
          backgroundColor="#540863"
          disabled={!backImage}
          textColor="#fff"
          onPress={() => {
            if (!backImage) {
              Alert.alert(
                "Passport required",
                "Please upload the back of your passport before continuing.",
              );
              return;
            }

            onNext?.();
          }}
        />

        <Pressable
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  uploadContainer: {
    marginTop: 25,
    height: 220,
    borderWidth: 1.5,
    borderColor: "#D8D8DD",
    borderStyle: "dashed",
    borderRadius: 16,
    backgroundColor: "#F8F7FA",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  selectedContainer: {
    borderStyle: "solid",
    borderColor: "#540863",
    backgroundColor: "#fff",
  },

  uploadIcon: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#EDE5F4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    fontFamily: "BricolageGrotesque",
  },

  uploadDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 30,
  },

  selectedImage: {
    width: "100%",
    height: "100%",
  },

  changeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: "rgba(84, 8, 99, 0.85)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  changeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    marginTop: 25,
  },

  backButton: {
    alignItems: "center",
    paddingVertical: 15,
  },

  backText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
});