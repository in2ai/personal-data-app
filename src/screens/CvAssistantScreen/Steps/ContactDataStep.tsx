import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import Field from '../../../components/smart/Field';

type ContactDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const ContactDataStep: React.FC<ContactDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(editingCv);

  const onChangeCV = (propertyName: string, value: string) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Datos de contacto</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <View className="mb-5 w-full">
            <Field
              label="Email"
              flex="column"
              value={editingCv.email}
              onChange={(value) => onChangeCV('email', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Twitter"
              flex="column"
              value={editingCv.twitterHandles}
              onChange={(value) => onChangeCV('twitterHandles', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Websites"
              flex="column"
              value={editingCv.websites}
              onChange={(value) => onChangeCV('websites', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Instant messengers"
              flex="column"
              value={editingCv.instantMessengers}
              onChange={(value) => onChangeCV('instantMessengers', value)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ContactDataStep;
