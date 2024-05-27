import 'expo-dev-client';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import StepForm from './StepForm';

export const USER_CONTACT_DATA_ROWS: { label: string; property: string; type: string }[] = [
  { label: 'Email', property: 'email', type: 'text' },
  { label: 'Twitter', property: 'twitterHandles', type: 'text' },
  { label: 'Página/s web', property: 'websites', type: 'text' },
  { label: 'Mensajería instantánea', property: 'instantMessengers', type: 'text' },
];

type ContactDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const ContactDataStep: React.FC<ContactDataStepProps> = ({ editingCv, onChangeCv }) => {
  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Datos de contacto</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <StepForm
            userData={editingCv}
            stepFormRows={USER_CONTACT_DATA_ROWS}
            onChangeCv={onChangeCv}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ContactDataStep;
