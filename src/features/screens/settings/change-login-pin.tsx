import { ScrollView, View, StyleSheet } from "react-native";
import SettingsHeader from "./header";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import BottomModal from "../../../components/bottom-modal";
import { useState } from "react";

export default function ChangePasswordPin() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title={"Change Password Pin"} />

        <TextInputField label="Old login Pin" placeholder="Enter login pin" />
        <TextInputField label="Enter new pin" placeholder="Enter new pin" />
        <TextInputField label="Confirm new pin" placeholder="Confirm new pin" />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Continue"
          variant="filled"
          backgroundColor="#540863"
          onPress={() => {
            setShowModal(true);
          }}
        />
        <AppButton title="Cancel" variant="outlined" onPress={() => {}} />
      </View>
      <BottomModal
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title={"Login Pin Updated Successfully"}
        description={"We’ve been able to successfully save your new pin"}
        btn={
          <AppButton
            backgroundColor={"#540863"}
            textColor="#fff"
            title="Continue"
            // disabled={!isOtpComplete}
            onPress={() => {}}
          />
        }
      />
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    gap: 20,
  },
});
