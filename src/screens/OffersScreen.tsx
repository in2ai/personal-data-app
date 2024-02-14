import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';

const screenContainerStyle = 'flex h-full w-full justify-center items-center p-5';

type OffersScreenProps = NativeStackScreenProps<RootStackParamList, 'Offers'>;

const OffersScreen: React.FC<OffersScreenProps> = ({ navigation }) => {
  return (
    <View className={screenContainerStyle}>
      <Text>Offers</Text>
    </View>
  );
};

export default OffersScreen;
