import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";

import { AuthProvider } from "./src/providers/AuthProvider";
import RootNavigator from "./src/navigation/rootNavigator";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./src/assets/fonts/BricolageGrotesque-Regular.ttf"),
    BricolageGrotesqueBold: require("./src/assets/fonts/BricolageGrotesque-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}