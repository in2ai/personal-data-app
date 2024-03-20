import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import Field from '../../../components/smart/Field';

type ProfessionalDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const ProfessionalDataStep: React.FC<ProfessionalDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(editingCv);

  const onChangeCV = (propertyName: string, value: string) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Datos profesionales</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <View className="mb-5 w-full">
            <Field
              label="Industria"
              flex="column"
              value={editingCv.industry}
              onChange={(value) => onChangeCV('industry', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Titular"
              flex="column"
              value={editingCv.headline}
              onChange={(value) => onChangeCV('headline', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Sumario"
              flex="column"
              value={editingCv.summary}
              onChange={(value) => onChangeCV('summary', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Lenguas"
              flex="column"
              value={editingCv.languages}
              onChange={(value) => onChangeCV('languages', value)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfessionalDataStep;
