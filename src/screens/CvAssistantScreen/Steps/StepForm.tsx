import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { UserData } from '../../../models/userData';

import DateField from '../../../components/smart/DateField';
import TextField from '../../../components/smart/TextFIeld';

export type StepFormRow = {
  label: string;
  property: string;
  type: string;
};

type StepFormProps = {
  stepFormRows: StepFormRow[];
  userData: UserData;
  onChangeCv?: (userData: UserData) => void;
};

const StepForm: React.FC<StepFormProps> = ({ stepFormRows, userData, onChangeCv }) => {
  const [internalCv, setInternalCv] = React.useState<UserData>(userData);

  const onChangeCV = (propertyName: string, value: string) => {
    const updatedCv = { ...internalCv, [propertyName]: value };
    setInternalCv(updatedCv);
    onChangeCv && onChangeCv(updatedCv);
  };

  return (
    <>
      {stepFormRows.map((data, index) => {
        if (data.type === 'text') {
          return (
            <View key={data.property} className="mb-5 w-full">
              <TextField
                label={data.label}
                flex="column"
                value={userData[data.property]}
                onChange={(value) => onChangeCV(data.property, value)}
              />
            </View>
          );
        }
        if (data.type === 'ISOstring') {
          return (
            <View key={data.property} className="mb-5 w-full">
              <DateField
                label={data.label}
                flex="column"
                value={userData[data.property]}
                onChange={(value) => onChangeCV(data.property, value)}
              />
            </View>
          );
        }
        return null;
      })}
    </>
  );
};

export default StepForm;
