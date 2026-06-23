import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import BackArrow from "../../../components/back-arrow";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import BottomModal from "../../../components/bottom-modal";
import { useState } from "react";
import AppButton from "../../../components/button";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const settingsData = [
  {
    title: "Account Settings",
    icon: <Ionicons name="person" size={20} color="#E85AAD" />,
    rightText: "Complete KYC",
    rightTextColor: "#FF2D55",
    route: "AccountSettings",
  },
  {
    title: "Wallet",
    icon: <Ionicons name="wallet" size={20} color="#4CD080" />,
    rightText: "NGN",
    rightTextColor: "#8B8B8B",
    route: "Wallet",
  },
  {
    title: "My Vehicles",
    icon: <Ionicons name="car-sport" size={20} color="#8B5CF6" />,
    route: "VehicleSettings",
  },
  {
    title: "Favourites",
    icon: <Ionicons name="bookmark" size={20} color="#58B9E8" />,
    route: "FavouriteSettings",
  },
  {
    title: "Referral",
    icon: <Ionicons name="gift" size={20} color="#4CD080" />,
    route: "ReferralSettings",
  },
  {
    title: "Security",
    icon: <Ionicons name="shield-checkmark" size={20} color="#5B8DEF" />,
    route: "SecuritySettings",
  },
  {
    title: "Help & Support",
    icon: (
      <MaterialCommunityIcons name="message-badge" size={20} color="#F472B6" />
    ),
    route: "HelpSupport",
  },
];

export default function Settings() {
  const navigation = useNavigation<NavigationProp>();
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.settings}>
            <BackArrow />
            <Text style={styles.settingsText}>Settings</Text>
          </View>

          <Image
            source={require("../../../assets/png/notification-bing.png")}
            style={styles.notificationIcon}
          />
        </View>

        {/* User card */}
        <Pressable
          style={styles.userDetails}
          onPress={() => navigation.navigate("AccountSettings")}
        >
          <View style={styles.userProfile}>
            <Image
              source={require("../../../assets/png/avatar.png")}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View>
              <Text style={styles.userName}>Smart Joseph</Text>
              <Text style={styles.desc}>Individual</Text>
            </View>
          </View>

          <Feather name="chevron-right" size={20} color="#111" />
        </Pressable>

        {/* Settings list */}
        <View style={styles.settingsContainer}>
          <Text style={styles.settingHeader}>Settings</Text>

          {settingsData.map((item, index) => (
            <Pressable
              key={index}
              style={styles.row}
              onPress={() => navigation.navigate(item.route as never)}
            >
              <View style={styles.leftSection}>
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text style={styles.title}>{item.title}</Text>
              </View>

              <View style={styles.rightSection}>
                {item.rightText ? (
                  <Text
                    style={[
                      styles.rightText,
                      { color: item.rightTextColor || "#8B8B8B" },
                    ]}
                  >
                    {item.rightText}
                  </Text>
                ) : null}
                <Feather name="chevron-right" size={20} color="#111" />
              </View>
            </Pressable>
          ))}

          {/* Logout */}
          <Pressable
            style={[styles.row, styles.logoutRow]}
            onPress={() => setLogoutModal(true)}
          >
            <View style={styles.leftSection}>
              <Ionicons name="log-out-outline" size={22} color="#FF2D55" />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>

            <Feather name="chevron-right" size={20} color="#111" />
          </Pressable>
        </View>
      </ScrollView>
      <BottomModal
        visible={logoutModal}
        onClose={() => setLogoutModal(false)}
        title={"Log out?"}
        description=" Are you sure you want to log out?"
      >
        <View style={{ gap: 20 }}>
          <AppButton
            title={"Cancel"}
            variant="outlined"
            onPress={() => setLogoutModal(false)}
          />
          <AppButton
            title={"Logout"}
            backgroundColor="#540863"
            onPress={() => {
              (setLogoutModal(false), navigation.navigate("login"));
            }}
          />
        </View>
      </BottomModal>
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

  settings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  settingsText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "BricolageGrotesque",
    color: "#151521",
  },

  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  userDetails: {
    width: "100%",
    backgroundColor: "#F5F2FC",
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginTop: 32,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  userName: {
    color: "#151521",
    fontSize: 16,
    fontWeight: "700",
  },

  desc: {
    color: "#76777A",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },

  settingsContainer: {
    marginTop: 32,
  },

  settingHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
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

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rightText: {
    fontSize: 15,
    fontWeight: "500",
  },

  logoutRow: {
    marginTop: 30,
    paddingTop: 24,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF2D55",
    marginLeft: 16,
  },
});
