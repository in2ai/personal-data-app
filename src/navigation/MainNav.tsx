import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '../context-providers/auth-context';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RelayTestScreen from '../screens/RelayTest';
import CvTestScreen from '../screens/CvTest';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;

  Auth: undefined;
  RelayTest: { secretKey: string; publicKey: string };
  CvTest: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainNav(): JSX.Element {
  const { isLogged } = useAuthContext();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogged ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="RelayTest" component={RelayTestScreen} />
              <Stack.Screen name="CvTest" component={CvTestScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default MainNav;
