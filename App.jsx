import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthScreen from "./src/screens/Auth";
import RelayTestScreen from "./src/screens/RelayTest";
import CvTestScreen from "./src/screens/CvTest";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ title: "Autenticación" }}
          />
          <Stack.Screen name="RelayTest" component={RelayTestScreen} />
          <Stack.Screen name="CvTest" component={CvTestScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
