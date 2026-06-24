import { View, Text, ScrollView, StyleSheet } from "react-native";
import BackArrow from "../../../components/back-arrow";
import TextInputField from "../../../components/textInputField";
import AppButton from "../../../components/button";

export default function AddVehicle() {
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
          <TextInputField label="Vehicle name" placeholder="Vehicle name" />
          <TextInputField label="Vehicle type" placeholder="Vehicle type" />
          <TextInputField label="Fuel type" placeholder="Fuel type" />
          <TextInputField
            label="Vehicle plate number"
            placeholder="i.e ABC-123XY "
          />
          <TextInputField label="Vehicle make" placeholder="i.e Toyota" />
          <TextInputField label="Vehicle model" placeholder="i.e Camry" />
        </View>
        <AppButton
          title="Save vehicle"
          variant="filled"
          backgroundColor="#540863"
          // style={styles.btnHalf}
          onPress={() => {
            navigation.navigate("AddVehicle");
          }}
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
