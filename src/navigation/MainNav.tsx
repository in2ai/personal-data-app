import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthContext } from '../context-providers/auth-context';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MyCvScreen from '../screens/MyCvScreen';
import OffersScreen from '../screens/OffersScreen';

import RelayTestScreen from '../screens/RelayTest';
import CvTestScreen from '../screens/CvTest';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  MyCV: undefined;
  Offers: undefined;

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
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'transparent',
              shadowColor: 'transparent',
              boxShadow: 'none',
            },
            headerTintColor: '#3c7c8c',
            headerTitleStyle: {
              fontWeight: '300',
            },
          }}
        >
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
              <Stack.Screen
                name="MyCV"
                component={MyCvScreen}
                options={({}) => ({
                  headerTitle: 'Mi currículum',
                  headerShown: true,
                })}
              />
              <Stack.Screen
                name="Offers"
                component={OffersScreen}
                options={({}) => ({
                  headerTitle: 'Ofertas',
                  headerShown: true,
                })}
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
