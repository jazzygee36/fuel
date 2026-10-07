import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import BackArrow from "../../../components/back-arrow";
import AppButton from "../../../components/button";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/types";
import { useCurrentUser } from "../../../hooks/queries/useCurrentUser";
import {
  useFilesUploadUrl,
  useSelfieVerification,
} from "../../../hooks/mutations/verification";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SelfieDetails = [
  {
    description: "Face forward and make sure your eyes are clearly visible",
  },
  {
    description: "Remove anything that covers your face. Eyeglasses are okay",
  },
];

export default function SelfieVerification() {
  const navigation = useNavigation<NavigationProp>();

  const { data: user } = useCurrentUser();

  const { mutateAsync: verifySelfie } = useSelfieVerification();
  const { mutateAsync: getUploadUrl } = useFilesUploadUrl();

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Upload the captured selfie to the presigned storage URL.
   *
   * Returns the fileId which is then sent to /kyc/selfie.
   */
  const uploadDocument = async (uri: string) => {
    try {
      const fileName = `selfie-${user?.id ?? Date.now()}.jpg`;
      const contentType = "image/jpeg";

      // Get presigned upload URL from backend
      const uploadData = await getUploadUrl({
        purpose: "selfie_verification",
        fileName,
        contentType,
      });

      

      if (!uploadData?.uploadUrl) {
        throw new Error("Upload URL was not returned.");
      }

      if (!uploadData?.fileId) {
        throw new Error("File ID was not returned.");
      }

      // Read the captured image
      const response = await fetch(uri);

      if (!response.ok) {
        throw new Error("Unable to read the captured selfie.");
      }

      const blob = await response.blob();

      // Upload actual image bytes to storage
      const uploadResponse = await fetch(uploadData.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `Selfie upload failed with status ${uploadResponse.status}`,
        );
      }

    

      // This is the value that goes to /kyc/selfie
      return uploadData.fileId;
    } catch (error) {
      console.error("FILE UPLOAD FAILED:", error);
      throw error;
    }
  };

  /**
   * Opens the camera after checking permission.
   */
  const handleTakeSelfie = async () => {
    if (!user?.id) {
      Alert.alert(
        "Unable to verify",
        "We could not identify your account. Please try again.",
      );
      return;
    }

    try {
      setIsLoading(true);

      if (!permission?.granted) {
        const permissionResult = await requestPermission();

        if (!permissionResult.granted) {
          Alert.alert(
            "Camera permission required",
            "Please allow camera access to take your selfie.",
          );

          return;
        }
      }

      setShowCamera(true);
    } catch (error) {
      console.error("CAMERA ERROR:", error);

      Alert.alert(
        "Camera error",
        "Something went wrong while opening the camera.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Captures the selfie, uploads it, then sends the fileId
   * to the KYC verification endpoint.
   */
  const handleCaptureSelfie = async () => {
    if (!cameraRef.current) {
      return;
    }

    if (!user?.id) {
      Alert.alert(
        "Unable to verify",
        "We could not identify your account. Please try again.",
      );
      return;
    }

    try {
      // Keep camera open while capture starts
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });

      if (!photo?.uri) {
        throw new Error("Selfie was not captured.");
      }

     

      // Close camera and show verification/loading screen
      setShowCamera(false);
      setIsLoading(true);

      // 1. Upload selfie
      const selfieKey = await uploadDocument(photo.uri);

     

      // 2. Send fileId/key to KYC endpoint
      const response = await verifySelfie({
        selfieKey,
      });


      // 3. Show success page
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      console.error("SELFIE VERIFICATION ERROR:", error);

      setShowCamera(false);
      setIsLoading(false);

      Alert.alert(
        "Verification failed",
        error?.response?.data?.message ||
          error?.message ||
          "We could not verify your selfie. Please try again.",
        [
          {
            text: "Try Again",
            onPress: () => {
              setIsSuccess(false);
            },
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  /**
   * Success screen
   */
  if (isSuccess) {
    return (
      <View style={styles.successScreen}>
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>

          <Text style={styles.successTitle}>Verification successful</Text>

          <Text style={styles.successDescription}>
            Your selfie has been successfully submitted and verified.
          </Text>

          <View style={styles.successButton}>
            <AppButton
              title="Continue"
              backgroundColor="#540863"
              textColor="#fff"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    );
  }

  /**
   * Loading / verification screen
   */
  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <View style={styles.loadingContent}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#540863" />
          </View>

          <Text style={styles.loadingTitle}>Verifying your selfie</Text>

          <Text style={styles.loadingDescription}>
            Please wait while we upload and verify your selfie. This may take a
            few moments.
          </Text>
        </View>
      </View>
    );
  }

  /**
   * Camera screen
   */
  if (showCamera) {
    return (
      <View style={styles.cameraScreen}>
        <CameraView ref={cameraRef} style={styles.camera} facing="front">
          <View style={styles.cameraOverlay}>
            <View style={styles.faceFrame} />

            <Text style={styles.cameraInstruction}>
              Position your face inside the frame
            </Text>

            <View style={styles.cameraButtons}>
              <TouchableOpacity
                style={styles.cancelCameraButton}
                onPress={() => setShowCamera(false)}
                disabled={isLoading}
              >
                <Text style={styles.cancelCameraText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleCaptureSelfie}
                disabled={isLoading}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  /**
   * Instructions screen
   */
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <BackArrow />

          <Text style={styles.backArrowText}>Take a quick selfie</Text>
        </View>

        <Text style={styles.step}>Step 2 of 3</Text>

        <View style={styles.selfieDescription}>
          {SelfieDetails.map((item, index) => (
            <View key={index} style={styles.descriptionItem}>
              <View style={styles.bullet}>
                <Text style={styles.bulletText}>•</Text>
              </View>

              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title="Take a selfie"
          backgroundColor="#540863"
          textColor="#fff"
          onPress={handleTakeSelfie}
          disabled={isLoading}
        />

        <AppButton
          title="Cancel"
          backgroundColor="transparent"
          textColor="#000"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 140,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backArrowText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },

  step: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
  },

  selfieDescription: {
    marginTop: 40,
  },

  descriptionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  bullet: {
    width: 24,
    alignItems: "center",
  },

  bulletText: {
    fontSize: 20,
    color: "#540863",
  },

  descriptionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: "#fff",
    gap: 8,
  },

  cameraScreen: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  cameraOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  faceFrame: {
    width: 270,
    height: 350,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 140,
  },

  cameraInstruction: {
    color: "#fff",
    fontSize: 15,
    marginTop: 24,
    textAlign: "center",
  },

  cameraButtons: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#540863",
  },

  cancelCameraButton: {
    position: "absolute",
    left: 24,
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  cancelCameraText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  loaderContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F0FA",
  },

  loadingTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#000",
    marginTop: 24,
    textAlign: "center",
  },

  loadingDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
    marginTop: 12,
    textAlign: "center",
    maxWidth: 320,
  },

  successScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  successContent: {
    width: "100%",
    alignItems: "center",
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#540863",
    alignItems: "center",
    justifyContent: "center",
  },

  successIconText: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "600",
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    marginTop: 24,
    textAlign: "center",
  },

  successDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#666",
    marginTop: 12,
    textAlign: "center",
    maxWidth: 320,
  },

  successButton: {
    width: "100%",
    marginTop: 40,
  },
});
