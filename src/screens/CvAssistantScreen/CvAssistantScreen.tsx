import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import CustomButton from '../../components/smart/CustomButton';

import { UserData } from '../../models/userData';

// Steps
import PersonalDataStep from './Steps/PersonalDataStep';
import StepNavigator from '../../components/smart/StepNavigator';
import ContactDataStep from './Steps/ContactDataStep';
import ProfessionalDataStep from './Steps/ProfessionalDataStep';
import ExperienceDataStep from './Steps/ExperienceDataStep';
import SkillsDataStep from './Steps/SkillsDataStep';

type CvAssistantScreenProps = {
  onCancel?: () => void;
  onSave?: (editingCv: UserData) => void;
};

const CvAssistantScreen: React.FC<CvAssistantScreenProps> = ({ onCancel, onSave }) => {
  const [editingCv, setEditingCv] = React.useState<UserData>(new UserData());

  const onChangeCv = (updatedCv: UserData) => {
    console.log('Cv updated', updatedCv);
    setEditingCv(updatedCv);
  };
  const steps = [
    { screen: 1, component: <PersonalDataStep editingCv={editingCv} onChangeCv={onChangeCv} /> },
    { screen: 2, component: <ContactDataStep editingCv={editingCv} onChangeCv={onChangeCv} /> },
    {
      screen: 3,
      component: <ProfessionalDataStep editingCv={editingCv} onChangeCv={onChangeCv} />,
    },
    { screen: 4, component: <ExperienceDataStep editingCv={editingCv} onChangeCv={onChangeCv} /> },
    { screen: 5, component: <SkillsDataStep editingCv={editingCv} onChangeCv={onChangeCv} /> },
  ];

  // Actions
  const onSaveCV = () => {
    onSave && onSave(editingCv);
  };

  const isValidCv = editingCv.firstName && editingCv.lastName && editingCv.address;

  return (
    <View className="W-full h-full justify-between bg-[#ffffff]">
      <View className="w-full grow p-5">
        <View className="w-full pb-5">
          <Text className="text-xl font-bold text-h1Color">Asistente CV</Text>
          <Text className="text-md text-defaultTextColor">
            Sigue los pasos para completar tu CV.
          </Text>
        </View>
        <View className="h-2 w-full flex-grow overflow-hidden">
          <StepNavigator stepComponents={steps} initialStep={1} />
        </View>
        <View className="mt-auto flex-row justify-between border-t border-[#badbe3] pb-0 pt-5">
          <View className="w-1/2 pr-2">
            <CustomButton buttonType="secondary" title="Cerrar" onPress={onCancel} />
          </View>
          <View className="w-1/2 pl-2">
            <CustomButton title="Guardar" onPress={onSaveCV} disabled={!isValidCv} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CvAssistantScreen;
