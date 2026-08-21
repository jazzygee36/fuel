import { ScrollView, View, StyleSheet } from "react-native";
import SettingsHeader from "./header";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import BottomModal from "../../../components/bottom-modal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordForm,
  changePasswordSchema,
} from "../../../utils/validation";

export default function ChangePasswordPin() {
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = () => {

  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title={"Change Login Password "} />
        <Controller
          control={control}
          name="oldPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Old Password"
              placeholder="Old password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isPassword
              error={errors.oldPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="New Password"
              placeholder="New password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isPassword
              error={errors.newPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputField
              label="Confirme Password"
              placeholder="Confirm password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isPassword
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Continue"
          variant="filled"
          backgroundColor="#540863"
          onPress={handleSubmit(onSubmit)}
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
