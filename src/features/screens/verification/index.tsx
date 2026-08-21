import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import VerifyHeader from "./verify-header";
import { Ionicons, Feather } from "@expo/vector-icons";
import AppButton from "../../../components/button";
import SecondStepVerification from "./second-step";
import ThirdStepVerification from "./third-step";
import ForthStepVerification from "./fouth-step";
import FifthStepVerification from "./fifth-step";

const settingsData = [
  {
    id: "passport",
    title: "Passport",
    description: "Photo page",
    icon: <Ionicons name="wallet-outline" size={20} color="#4CD080" />,
  },
  // {
  //   id: "nin",
  //   title: "NIN",
  //   description: "Front and back",
  //   icon: <Ionicons name="card-outline" size={20} color="#8B5CF6" />,
  // },
  {
    id: "drivers-license",
    title: "Driver’s license",
    description: "Front and back",
    icon: <Ionicons name="id-card-outline" size={20} color="#58B9E8" />,
  },
];

export default function Verification() {
  const [step, setStep] = useState(1);

  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  console.log('selectedDocument', selectedDocument)
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  // Select document only
  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocument(documentId);
  };

  // Continue to next step
  const handleContinue = () => {
    // Step 1 requires a document to be selected
    if (step === 1 && !selectedDocument) {
      return;
    }

    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Reset verification
  const handleCancel = () => {
    setSelectedDocument(null);
    setStep(1);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================
            STEP 1 - SELECT DOCUMENT
        ================================== */}
        {step === 1 && (
          <View>
            <VerifyHeader
              title="Pick a document to verify your identity"
              description="Step 1 of 3"
            />

            {settingsData.map((item) => {
              const isSelected = selectedDocument === item.id;

              return (
                <Pressable
                  key={item.id}
                  style={[styles.row, isSelected && styles.selectedRow]}
                  onPress={() => handleDocumentSelect(item.id)}
                >
                  <View style={styles.leftSection}>
                    <View style={styles.iconWrapper}>{item.icon}</View>

                    <View>
                      <Text style={styles.title}>{item.title}</Text>

                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                  </View>

                  <View style={styles.rightSection}>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#540863"
                      />
                    )}

                    <Feather name="chevron-right" size={20} color="#111" />
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* =================================
            STEP 2
        ================================== */}
        {step === 2 && selectedDocument && (
          <SecondStepVerification
            documentType={selectedDocument}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && selectedDocument && (
          <ThirdStepVerification
            documentType={selectedDocument}
            frontImage={frontImage}
            setFrontImage={setFrontImage}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && selectedDocument && (
          <ForthStepVerification
            documentType={selectedDocument}
            backImage={backImage}
            setBackImage={setBackImage}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && selectedDocument && (
          <FifthStepVerification
            documentType={selectedDocument}
            frontImage={frontImage}
            backImage={backImage}
            onBack={() => setStep(4)}
          />
        )}
        {step === 1 && (
          <View style={styles.footer}>
            <AppButton
              title="Continue"
              backgroundColor={selectedDocument ? "#540863" : "#D9D9D9"}
              textColor={selectedDocument ? "#fff" : "#888"}
              onPress={handleContinue}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingVertical: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F4",
    marginTop: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
  },

  selectedRow: {
    borderColor: "#540863",
    backgroundColor: "#F8F4FC",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    fontFamily: "BricolageGrotesque",
  },

  description: {
    color: "#1E1E24",
    marginTop: 4,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  footer: {
    marginTop: 30,
    gap: 5,
  },
});
