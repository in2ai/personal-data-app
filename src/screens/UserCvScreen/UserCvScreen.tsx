import 'expo-dev-client';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../models/userData';

import CustomPressableOpacity from '../../components/layout/CustomPressableOpacity';
import { isoStringToddMMYYYY } from '../../helpers/utils';

import TrashFill from '../../assets/img/svg/trash-fill.svg';
import PencilSquare from '../../assets/img/svg/pencil-square.svg';

import { USER_PERSONAL_DATA_ROWS } from '../CvAssistantScreen/Steps/PersonalDataStep';
import { USER_CONTACT_DATA_ROWS } from '../CvAssistantScreen/Steps/ContactDataStep';
import { USER_PROFESSIONAL_DATA_ROWS } from '../CvAssistantScreen/Steps/ProfessionalDataStep';
import UserCvDataSection from './UserCvDataSection';
import UserCvSkillsSection from './UserCvSkillsSection';

const USER_EXPERIENCE_DATA_ROWS: { label: string; property: string; type: string }[] = [
  { label: 'Compañía', property: 'companyName', type: 'text' },
  { label: 'Título', property: 'title', type: 'text' },
  { label: 'Descripción', property: 'description', type: 'text' },
  { label: 'Ubicación', property: 'location', type: 'text' },
  { label: 'Comenzado el', property: 'startedOn', type: 'text' },
  { label: 'Finalizado el', property: 'finishedOn', type: 'text' },
];

type UserCvScreenProps = {
  userData: UserData;
  onEditCv?: () => void;
  onRemoveCv?: () => void;
};

const UserCvScreen: React.FC<UserCvScreenProps> = ({ userData, onEditCv, onRemoveCv }) => {
  return (
    <View className="relative h-full w-full px-5">
      <View className="absolute right-5 top-5 z-10">
        <View className="flex-row">
          <View className="mr-3 rounded-full bg-white p-3 opacity-80">
            <CustomPressableOpacity accessibilityLabel="Editar CV" onPress={onEditCv}>
              <PencilSquare width={25} height={25} fill={'#3c7c8c'} />
            </CustomPressableOpacity>
          </View>
          <View className="rounded-full bg-white p-3 opacity-80">
            <CustomPressableOpacity accessibilityLabel="borrar CV" onPress={onRemoveCv}>
              <TrashFill width={25} height={25} fill={'#3c7c8c'} />
            </CustomPressableOpacity>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full flex-row items-center justify-between py-5">
          <Text className="text-2xl font-bold text-h1Color">Mis datos</Text>
        </View>
        {/* Personal data */}
        <UserCvDataSection
          title="Datos personales"
          userDataRows={USER_PERSONAL_DATA_ROWS}
          userData={userData}
        />
        {/* Contact data */}
        <UserCvDataSection
          title="Datos de contacto"
          userDataRows={USER_CONTACT_DATA_ROWS}
          userData={userData}
        />
        {/* Professional data */}
        <UserCvDataSection
          title="Datos de contacto"
          userDataRows={USER_PROFESSIONAL_DATA_ROWS}
          userData={userData}
        />
        {/* Skills */}
        <UserCvSkillsSection title="Habilidades" skills={userData.skills} />

        {/* Experience */}
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
