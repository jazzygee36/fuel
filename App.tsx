import { NavigationContainer } from "@react-navigation/native";
import type { NavigationState } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

import { AuthProvider } from "./src/providers/AuthProvider";
import RootNavigator from "./src/navigation/rootNavigator";

const queryClient = new QueryClient();

const NAVIGATION_STATE_KEY = "NAVIGATION_STATE";

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./src/assets/fonts/BricolageGrotesque-Regular.ttf"),
    BricolageGrotesqueBold: require("./src/assets/fonts/BricolageGrotesque-Bold.ttf"),
  });

  const [initialState, setInitialState] = useState<
    NavigationState | undefined
  >(undefined);

  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    const restoreNavigationState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );

        if (savedState) {
          const parsedState = JSON.parse(savedState);

          if (parsedState) {
            setInitialState(parsedState);
          }
        }
      } catch (error) {
        console.log(
          "Failed to restore navigation state:",
          error
        );

        // Remove corrupted navigation state
        await AsyncStorage.removeItem(NAVIGATION_STATE_KEY);
      } finally {
        setIsNavigationReady(true);
      }
    };

    restoreNavigationState();
  }, []);

  const handleNavigationStateChange = async (
    state: NavigationState | undefined
  ) => {
    try {
      // Don't save undefined
      if (!state) {
        await AsyncStorage.removeItem(NAVIGATION_STATE_KEY);
        return;
      }

      await AsyncStorage.setItem(
        NAVIGATION_STATE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.log(
        "Failed to save navigation state:",
        error
      );
    }
  };

  if (!fontsLoaded || !isNavigationReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer
          initialState={initialState}
          onStateChange={handleNavigationStateChange}
        >
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}