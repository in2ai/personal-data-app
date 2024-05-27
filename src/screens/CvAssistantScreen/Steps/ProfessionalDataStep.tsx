import 'expo-dev-client';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import StepForm, { StepFormRow } from './StepForm';

export const USER_PROFESSIONAL_DATA_ROWS: StepFormRow[] = [
  { label: 'Industria', property: 'industry', type: 'text' },
  { label: 'Titular', property: 'headline', type: 'text' },
  { label: 'Sumario', property: 'summary', type: 'text' },
  { label: 'Lenguas', property: 'languages', type: 'text' },
];

type ProfessionalDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const ProfessionalDataStep: React.FC<ProfessionalDataStepProps> = ({ editingCv, onChangeCv }) => {
  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Datos profesionales</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <StepForm
            userData={editingCv}
            stepFormRows={USER_PROFESSIONAL_DATA_ROWS}
            onChangeCv={onChangeCv}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProfessionalDataStep;
