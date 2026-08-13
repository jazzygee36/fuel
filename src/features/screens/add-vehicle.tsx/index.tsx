import { View, Text, ScrollView, StyleSheet } from "react-native";
import BackArrow from "../../../components/back-arrow";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleForm, vehicleSchema } from "../../../utils/validation";
import { VehicleDto } from "../../../utils/types";

export default function AddVehicle() {
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

  const onSubmit = (data: VehicleDto) => {
    const payload: VehicleDto = {
      registrationNumber: data.registrationNumber,
      make: data.make,
      model: data.model,
      year: data.year,
      color: data.color,
      vin: data.vin,
      fuelType: data.fuelType,
      capacity: data.capacity,
    };
    // mutate(payload, {
    //   onSuccess: (response) => {
    //     console.log("response", response);
    //     if (response.access_token) {
    //       navigation.navigate("dashboard");
    //     }
    //   },
    // });
  };
  return (
    <View style={styles.screen}>
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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Fuel Type"
                placeholder="Fuel type"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputField
                label="Year"
                placeholder="Year"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors?.year?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="year"
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
            name="year"
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
          title="Save vehicle"
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
