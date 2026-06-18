import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import RootNavigator from "./src/navigation/rootNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: require("./src/assets/fonts/BricolageGrotesque-Regular.ttf"),
    BricolageGrotesqueBold: require("./src/assets/fonts/BricolageGrotesque-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}