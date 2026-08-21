import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import BackArrow from "../../../components/back-arrow";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleForm, vehicleSchema } from "../../../utils/validation";
import { VehicleDto } from "../../../utils/types";
import { useAddVehicles } from "../../../hooks/mutations/vehicles";
import { useCurrentUserId } from "../../../hooks/queries/useCurrentUser";
import SelectInput from "../../../components/select-input";
import Loading from "../../../components/loading";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AppToast from "../../../components/toast";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AddVehicle() {
  const { data: userId } = useCurrentUserId();
  const { mutate, isPending } = useAddVehicles(userId?.id);
  const navigation = useNavigation<NavigationProp>();

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleForm>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      registrationNumber: "",
      make: "",
      model: "",
      year: "",
      color: "",
      vin: "",
      fuelType: "",
      capacity: "",
    },
  });

  const onSubmit = (data: VehicleForm) => {
    const payload: VehicleDto = {
      registrationNumber: data.registrationNumber,
      make: data.make,
      model: data.model,
      year: Number(data.year),
      color: data.color,
      vin: data.vin,
      fuelType: data.fuelType,
      capacity: Number(data.capacity),
    };

    mutate(payload, {
      onSuccess: () => {
        showToast("Vehicle added successfully!", "success");

        // Give the toast a moment to display before navigating
        setTimeout(() => {
          navigation.navigate("VehicleSettings");
        }, 1500);
      },

      onError: (error: any) => {
        console.log("Add vehicle error:", error);

        showToast(
          error?.response?.data?.message ||
            "Failed to add vehicle. Please try again.",
          "error",
        );
      },
    });
  };

  const currentYear = new Date().getFullYear();

  const YearList = Array.from({ length: currentYear - 1980 + 1 }, (_, index) =>
    String(currentYear - index),
  );

  const FuelList = ["PETROL", "DIESEL"];

  return (
    <View style={styles.screen}>
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.vehicleNav}>
            <BackArrow />
            <View>
              <Text style={styles.vehicleText}>Add your vehicle</Text>
              <Text style={{ color: "#776F69" }}>
                Input your details to get started
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <Controller
            control={control}
            name="make"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Vehicle name"
                placeholder="Vehicle name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.make?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="model"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Vehicle Model"
                placeholder="Vehicle model"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.model?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="registrationNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Registration Number"
                placeholder="Registration number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.registrationNumber?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="fuelType"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Fuel Type"
                value={value}
                options={FuelList}
                onChange={onChange}
                error={errors?.fuelType?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Color"
                placeholder="Color"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.color?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="year"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Year"
                placeholder="Select year"
                value={value}
                options={YearList}
                onChange={onChange}
                error={errors?.year?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="vin"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Vin"
                placeholder="Vin"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.vin?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="capacity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Capacity"
                placeholder="Capacity"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.capacity?.message}
              />
            )}
          />
        </View>
        <AppButton
          title={isPending ? <Loading /> : "Save vehicle"}
          variant="filled"
          backgroundColor="#540863"
          onPress={handleSubmit(onSubmit)}
        />
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
    paddingTop: 27,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  vehicleNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },
});
