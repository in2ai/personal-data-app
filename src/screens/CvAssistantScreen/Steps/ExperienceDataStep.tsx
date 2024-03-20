import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import Field from '../../../components/smart/Field';

type ExperienceDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const ExperienceDataStep: React.FC<ExperienceDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(editingCv);

  const onChangeCV = (propertyName: string, value: string) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Experiencia</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <Text>TODO: Experience list</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default ExperienceDataStep;
