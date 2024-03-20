import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import Field from '../../../components/smart/Field';

type PersonalDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(editingCv);

  const onChangeCV = (propertyName: string, value: string) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      <View className="border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Datos personales</Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <View className="mb-5 w-full">
            <Field
              label="Nombre"
              flex="column"
              value={editingCv.firstName}
              onChange={(value) => onChangeCV('firstName', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Apellidos"
              flex="column"
              value={editingCv.lastName}
              onChange={(value) => onChangeCV('lastName', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Dirección"
              flex="column"
              value={editingCv.address}
              onChange={(value) => onChangeCV('address', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Código postal"
              flex="column"
              value={editingCv.zipCode}
              onChange={(value) => onChangeCV('zipCode', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Geolocalización"
              flex="column"
              value={editingCv.geoLocation}
              onChange={(value) => onChangeCV('geoLocation', value)}
            />
          </View>
          <View className="mb-5 w-full">
            <Field
              label="Fecha de nacimiento"
              flex="column"
              value={editingCv.birthDate}
              onChange={(value) => onChangeCV('birthDate', value)}
            />
          </View>
          <View className="w-full pb-5">
            <Field
              label="Lengua materna"
              flex="column"
              value={editingCv.motherTongue}
              onChange={(value) => onChangeCV('motherTongue', value)}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PersonalDataStep;
