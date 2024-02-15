import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import CustomButton from '../components/smart/CustomButton';
import { UserCV } from '../models/userCV';

import TrashFill from '../assets/img/svg/trash-fill.svg';
import CustomPressableOpacity from '../components/layout/CustomPressableOpacity';

//TODO: move to component
const USER_DATA_ROWS: { label: string; property: string }[] = [
  { label: 'Nombre', property: 'firstName' },
  { label: 'Apellidos', property: 'firstName' },
  { label: 'Dirección', property: 'address' },
  { label: 'Fecha de nacimiento', property: 'birthDate' },
  { label: 'Resumen', property: 'summary' },
  { label: 'Industria', property: 'industry' },
  { label: 'Código postal', property: 'zipCode' },
  { label: 'Localización', property: 'geoLocation' },
  { label: 'Twitter', property: 'twitterHandles' },
  { label: 'Página web', property: 'websites' },
  { label: 'Mensajería instantánea', property: 'instantMessengers' },
];

type UserCvScreenProps = {
  userCv: UserCV;
  onRemoveCv?: () => void;
};

const UserCvScreen: React.FC<UserCvScreenProps> = ({ userCv, onRemoveCv }) => {
  return (
    <View className="relative h-full w-full p-5">
      <View className="absolute right-10 top-10 z-10 ">
        <CustomPressableOpacity accessibilityLabel="borrar CV" onPress={onRemoveCv}>
          <TrashFill width={25} height={25} fill={'#3c7c8c'} />
        </CustomPressableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full flex-row items-center justify-between pb-5 pt-3">
          <Text className="text-2xl font-bold text-h1Color">Mis datos</Text>
        </View>
        <View className="mb-3 w-full flex-row items-center justify-between border-b border-b-brandColor pb-2">
          <Text className="text-xl text-h1Color">Datos personales</Text>
        </View>
        <View className="pb-2">
          {USER_DATA_ROWS.map(
            (row, index) =>
              userCv[row.property] && (
                <View key={index} className="w-full pb-1">
                  <View className="pb-3">
                    <Text className="text-lg text-h1Color">{row.label}</Text>
                    <Text className="text-md text-defaultTextColor">{userCv[row.property]}</Text>
                  </View>
                </View>
              )
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserCvScreen;
