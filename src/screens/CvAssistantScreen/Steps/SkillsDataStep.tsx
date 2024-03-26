import 'expo-dev-client';
import React from 'react';

import { Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import SkillsEditor from '../../../components/smart/SkillsEditor/SkillsEditor';

type SkillsDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const SkillsDataStep: React.FC<SkillsDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(editingCv);

  const onChangeCV = (propertyName: string, value: any) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Habilidades</Text>
      </View>
      <SkillsEditor
        skills={internalCv.skills}
        onChange={(skills) => onChangeCV('skills', skills)}
      />
    </>
  );
};

export default SkillsDataStep;
