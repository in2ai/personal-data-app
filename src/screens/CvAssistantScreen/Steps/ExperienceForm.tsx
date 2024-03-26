import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import { Experience, UserData } from '../../../models/userData';

import DateField from '../../../components/smart/DateField';
import TextField from '../../../components/smart/TextFIeld';

export type ExperienceFormRow = {
  label: string;
  property: string;
  type: string;
};

type ExperienceFormProps = {
  experienceFormRow: ExperienceFormRow[];
  experience: Experience;
  onChange?: (experience: Experience) => void;
};

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experienceFormRow,
  experience = new Experience(),
  onChange,
}) => {
  const [internalExperience, setInternalExperience] = React.useState<Experience>(experience);

  const onChangeExperience = (propertyName: string, value: string) => {
    const updatedExperience = { ...internalExperience, [propertyName]: value };
    setInternalExperience(updatedExperience);
    onChange && onChange(updatedExperience);
  };

  return (
    <>
      {experienceFormRow.map((data, index) => {
        if (data.type === 'text') {
          return (
            <View key={data.property} className="mb-5 w-full">
              <TextField
                label={data.label}
                flex="column"
                value={experience[data.property]}
                onChange={(value) => onChangeExperience(data.property, value)}
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
                value={experience[data.property]}
                onChange={(value) => onChangeExperience(data.property, value)}
              />
            </View>
          );
        }
        return null;
      })}
    </>
  );
};

export default ExperienceForm;
