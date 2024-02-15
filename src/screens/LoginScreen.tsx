import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { ScrollView, Text, View } from 'react-native';
import Field from '../components/smart/Field';
import CustomButton from '../components/smart/CustomButton';

// Expo
import { StatusBar } from 'expo-status-bar';

// Icons
import PersonFillLock from '../assets/img/svg/person-fill-lock.svg';
import { useAuthContext } from '../context-providers/auth-context';
import { RootStackParamList } from '../navigation/MainNav';

const h1Style = 'text-3xl font-medium text-h1Color pb-5';
const screenContainerStyle = 'flex h-full w-full p-[20%]';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { loginByUsername, loginBySecretKey } = useAuthContext();

  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');

  const onSubmitUsername = () => {
    if (!username) return;
    loginByUsername(username);
  };

  const onSubmitSecret = () => {
    if (!secret) return;
    loginBySecretKey(secret);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar style={'light'} backgroundColor={'#3c7c8c'} />
      <View className={screenContainerStyle}>
        <View className="mb-20 max-w-md items-center ">
          <PersonFillLock width={100} height={100} fill={'#3c7c8c'} />
        </View>
        <View className="w-full">
          <View className="flex w-full items-center">
            <Text className={h1Style}>Crear cuenta</Text>
            <View className="mb-5 w-full">
              <Field label="Nombre" flex="column" value={username} onChange={setUsername} />
            </View>
            <View className="w-full">
              <CustomButton
                disabled={!username}
                buttonType="primary"
                title="Continuar"
                hasLargeFont={true}
                onPress={onSubmitUsername}
              />
            </View>
          </View>
          <View className="mb-5 mt-20 h-[1px] w-full border-b border-dotted border-gray-400"></View>
          <View className="flex w-full items-center">
            <Text className={h1Style}>o iniciar sesión</Text>
            <View className="mb-5 w-full">
              <Field label="Clave secreta" flex="column" value={secret} onChange={setSecret} />
            </View>
          </View>
          <View className="w-full">
            <CustomButton
              disabled={!secret}
              buttonType="primary"
              title="Iniciar"
              hasLargeFont={true}
              onPress={onSubmitSecret}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
