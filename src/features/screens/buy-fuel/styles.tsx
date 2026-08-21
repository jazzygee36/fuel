import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

  fuelNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  fuelText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },

  stationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

  logoPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#F5F2FC",
    alignItems: "center",
    justifyContent: "center",
  },

  stationNameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stationName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#151521",
    marginBottom: 5,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },

  openBadge: {
    backgroundColor: "#C0FEB8",
  },

  closedBadge: {
    backgroundColor: "#E2E2E5",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  openText: {
    color: "#29A329",
  },

  closedText: {
    color: "#76777A",
  },

  text: {
    color: "#515255",
    fontSize: 12,
    marginVertical: 15,
    fontWeight: "500",
    lineHeight: 19,
  },

  divContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 20,
  },

  label: {
    fontSize: 13,
    color: "#595959",
  },

  value: {
    flex: 1,
    textAlign: "right",
    fontSize: 12,
    color: "#222",
    fontWeight: "500",
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#F0F0F4",
    marginTop: 25,
  },

  productsContainer: {
    marginTop: 10,
  },

  productsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#151521",
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F4",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  iconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: "#F5F2FC",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222",
    fontFamily: "BricolageGrotesque",
    marginTop: 3,
  },

  description: {
    color: "#595959",
    fontSize: 12,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#151521",
    marginTop: 10,
  },

  emptyText: {
    color: "#777",
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },

  stepTwoContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 50,
  },

  noOfLitres: {
    color: "#000000",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },

  totalPriceContainer: {
    backgroundColor: "#F5F2FC",
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 57,
  },

  totalPriceLabel: {
    fontSize: 11,
    color: "#595959",
    marginBottom: 3,
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#151521",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 14,
  },

  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F2FC",
  },

  quantityButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },

  quantityText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  stepTwoScrollContainer: {
    flexGrow: 1,
  },

  vehicleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9FC",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 10,
  },

  vehicleName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#151521",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#BDBDC5",
    alignItems: "center",
    justifyContent: "center",
  },

  radioOuterSelected: {
    borderColor: "#540863",
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#540863",
  },

  addVehicle: {
    marginTop: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  addVehicleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#540863",
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  detailsText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
  },

  detailsLabel: {
    color: "#45474A",
    fontSize: 13,
  },

  totalDetailsPrice: {
    color: "#540863",
    fontSize: 16,
    fontWeight: "700",
  },
});