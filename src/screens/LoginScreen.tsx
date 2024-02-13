import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { RootStackParamList } from '../../App';
import { Text, View } from 'react-native';
import Field from '../components/smart/Field';
import CustomButton from '../components/smart/CustomButton';

const h1Style = 'text-3xl font-medium text-h1Color mb-5';
const screenContainerStyle =
  'bg-defaultAppBgColor h-full w-full items-center justify-start p-[20%]';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View className={screenContainerStyle}>
      <View className="mb-20 w-[25%]">
        <View className="aspect-square w-full bg-slate-400"></View>
      </View>
      <View className="w-full">
        <View className="flex w-full items-center">
          <Text className={h1Style}>Crear cuenta</Text>
          <View className="mb-5 w-full">
            <Field label="Nombre" flex="column" />
          </View>
          <View className="w-full">
            <CustomButton
              disabled={true}
              buttonType="primary"
              title="Continuar"
              hasLargeFont={true}
            />
          </View>
        </View>
        <View className="mb-5 mt-20 h-[1px] w-full border-b border-dotted border-gray-400"></View>
        <View className="flex w-full items-center">
          <Text className={h1Style}>o iniciar sesión</Text>
          <View className="mb-5 w-full">
            <Field label="Clave secreta" flex="column" />
          </View>
        </View>
        <View className="w-full">
          <CustomButton disabled={true} buttonType="primary" title="Iniciar" hasLargeFont={true} />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
