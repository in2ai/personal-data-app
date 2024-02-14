import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';

const screenContainerStyle = 'flex h-full w-full justify-center items-center p-5';

type MyCvScreenProps = NativeStackScreenProps<RootStackParamList, 'MyCV'>;

const MyCvScreen: React.FC<MyCvScreenProps> = ({ navigation }) => {
  return (
    <View className={screenContainerStyle}>
      <Text>My CV</Text>
    </View>
  );
};

export default MyCvScreen;
