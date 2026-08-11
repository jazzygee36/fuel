import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const token = {

  
  // Save access token
  async setAccessToken(accessToken: string) {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
  },

  // Get access token
  async getAccessToken() {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },

  // Remove access token
  async removeAccessToken() {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },

  // Save refresh token
  async setRefreshToken(refreshToken: string) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },

  // Get refresh token
  async getRefreshToken() {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  // Remove refresh token
  async removeRefreshToken() {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  },

  // Clear everything
  async clear() {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};
