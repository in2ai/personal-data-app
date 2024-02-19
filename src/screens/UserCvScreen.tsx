import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import CustomButton from '../components/smart/CustomButton';
import { UserData } from '../models/userData';

import TrashFill from '../assets/img/svg/trash-fill.svg';
import CustomPressableOpacity from '../components/layout/CustomPressableOpacity';

//TODO: move to component
const USER_PERSONAL_DATA_ROWS: { label: string; property: string }[] = [
  { label: 'Nombre', property: 'firstName' },
  { label: 'Apellidos', property: 'lastName' },
  { label: 'Dirección', property: 'address' },
  { label: 'Fecha de nacimiento', property: 'birthDate' },
  { label: 'Lengua materna', property: 'motherTongue' },
  { label: 'Resumen', property: 'summary' },
  { label: 'Industria', property: 'industry' },
  { label: 'Código postal', property: 'zipCode' },
  { label: 'Localización', property: 'geoLocation' },
  { label: 'Twitter', property: 'twitterHandles' },
  { label: 'Página web', property: 'websites' },
  { label: 'Mensajería instantánea', property: 'instantMessengers' },
];

const USER_EXPERIENCE_DATA_ROWS: { label: string; property: string }[] = [
  { label: 'Compañía', property: 'companyName' },
  { label: 'Título', property: 'title' },
  { label: 'Descripción', property: 'description' },
  { label: 'Ubicación', property: 'location' },
  { label: 'Comenzado el', property: 'startedOn' },
  { label: 'Finalizado el', property: 'finishedOn' },
];

type UserCvScreenProps = {
  userData: UserData;
  onRemoveCv?: () => void;
};

const UserCvScreen: React.FC<UserCvScreenProps> = ({ userData, onRemoveCv }) => {
  return (
    <View className="relative h-full w-full px-5">
      <View className="absolute right-7 top-7 z-10 rounded-full bg-white p-3 opacity-80">
        <CustomPressableOpacity accessibilityLabel="borrar CV" onPress={onRemoveCv}>
          <TrashFill width={25} height={25} fill={'#3c7c8c'} />
        </CustomPressableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full flex-row items-center justify-between py-5">
          <Text className="text-2xl font-bold text-h1Color">Mis datos</Text>
        </View>
        {/* Peronal data */}
        <View className="mb-5">
          <View className="mb-3 w-full flex-row items-center justify-between border-b border-b-brandColor pb-2">
            <Text className="text-xl text-h1Color">Datos personales</Text>
          </View>
          <View className="pb-2">
            {USER_PERSONAL_DATA_ROWS.map(
              (row, index) =>
                userData[row.property] && (
                  <View key={index} className="w-full pb-1">
                    <View className="pb-3">
                      <Text className="text-lg text-h1Color">{row.label}</Text>
                      <Text className="text-md text-defaultTextColor">
                        {userData[row.property]}
                      </Text>
                    </View>
                  </View>
                )
            )}
          </View>
        </View>
        {/* Skills */}
        {userData.experiences?.length > 0 && (
          <View className="mb-5">
            <View className="mb-3 w-full flex-row items-center justify-between border-b border-b-brandColor pb-2">
              <Text className="text-xl text-h1Color">Experiencia</Text>
            </View>
            {userData.experiences.map((experience) => (
              <View key={experience.companyName} className="mb-3 border-b border-b-[#c2c2c2] pb-2">
                <View className="pb-3">
                  <Text className="text-lg text-h1Color">{experience.companyName}</Text>
                  <Text className="text-md font-bold text-defaultTextColor">
                    {experience.title}
                  </Text>
                  <Text className="font-light italic text-[#787878]">
                    {experience.startedOn ?? ''} - {experience.finishedOn ?? ''}
                  </Text>
                </View>
                {experience.description && (
                  <View className="pb-5">
                    <Text className="text-md text-defaultTextColor">{experience.description}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserCvScreen;
