import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const storage = {
  async getItem(key: string) {
    if (Platform.OS === "web") {
      return AsyncStorage.getItem(key);
    }

    return SecureStore.getItemAsync(key);
  },

  async setItem(key: string, value: string) {
    if (Platform.OS === "web") {
      return AsyncStorage.setItem(key, value);
    }

    return SecureStore.setItemAsync(key, value);
  },

  async removeItem(key: string) {
    if (Platform.OS === "web") {
      return AsyncStorage.removeItem(key);
    }

    return SecureStore.deleteItemAsync(key);
  },
};

export const token = {
  async getAccessToken() {
    return storage.getItem(ACCESS_TOKEN_KEY);
  },

  async setAccessToken(accessToken: string) {
    return storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  async removeAccessToken() {
    return storage.removeItem(ACCESS_TOKEN_KEY);
  },

  async getRefreshToken() {
    return storage.getItem(REFRESH_TOKEN_KEY);
  },

  async setRefreshToken(refreshToken: string) {
    return storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  async removeRefreshToken() {
    return storage.removeItem(REFRESH_TOKEN_KEY);
  },

  async clearTokens() {
    await storage.removeItem(ACCESS_TOKEN_KEY);
    await storage.removeItem(REFRESH_TOKEN_KEY);
  },
};