import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import Field from '../../../components/smart/Field';

type SkillsDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const SkillsDataStep: React.FC<SkillsDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(editingCv);

  const onChangeCV = (propertyName: string, value: string) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Habilidades</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <Text>TODO: Skills list</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default SkillsDataStep;
