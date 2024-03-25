import 'expo-dev-client';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import StepForm, { StepFormRow } from './StepForm';

export const USER_PERSONAL_DATA_ROWS: StepFormRow[] = [
  { label: 'Nombre', property: 'firstName', type: 'text' },
  { label: 'Apellidos', property: 'lastName', type: 'text' },
  { label: 'Dirección', property: 'address', type: 'text' },
  { label: 'Código postal', property: 'zipCode', type: 'text' },
  { label: 'Localización', property: 'geoLocation', type: 'text' },
  { label: 'Fecha de nacimiento', property: 'birthDate', type: 'ISOstring' },
  { label: 'Lengua materna', property: 'motherTongue', type: 'text' },
];

type PersonalDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({ editingCv, onChangeCv }) => {
  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Datos personales</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <StepForm
            userData={editingCv}
            stepFormRows={USER_PERSONAL_DATA_ROWS}
            onChangeCv={onChangeCv}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default PersonalDataStep;
