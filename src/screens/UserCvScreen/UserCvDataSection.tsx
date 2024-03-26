import React from 'react';
import { Text, View } from 'react-native';
import { StepFormRow } from '../CvAssistantScreen/Steps/StepForm';
import { UserData } from '../../models/userData';
import { isoStringToddMMYYYY } from '../../helpers/utils';

type UserCvDataSectionProps = {
  title: string;
  userData: UserData;
  userDataRows: StepFormRow[];
};

const UserCvDataSection: React.FC<UserCvDataSectionProps> = ({
  title,
  userData,
  userDataRows = [],
}) => {
  return (
    <View className="mb-5">
      <View className="mb-3 w-full flex-row items-center justify-between border-b border-b-brandColor pb-2">
        <Text className="text-xl text-h1Color">{title}</Text>
      </View>
      <View className="pb-2">
        {userDataRows.map(
          (row, index) =>
            userData[row.property] && (
              <View key={index} className="w-full pb-1">
                <View className="pb-3">
                  <Text className="text-lg text-h1Color">{row.label}</Text>
                  <Text className="text-md text-defaultTextColor">
                    {row.type === 'ISOstring'
                      ? isoStringToddMMYYYY(userData[row.property])
                      : userData[row.property]}
                  </Text>
                </View>
              </View>
            )
        )}
      </View>
    </View>
  );
};

export default UserCvDataSection;
