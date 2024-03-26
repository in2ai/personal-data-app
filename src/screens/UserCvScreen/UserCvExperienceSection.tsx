import React from 'react';
import { Text, View } from 'react-native';
import { Experience } from '../../models/userData';

import TrashFill from '../../assets/img/svg/trash-fill.svg';
import CustomPressableOpacity from '../../components/layout/CustomPressableOpacity';

type UserCvExperienceSectionProps = {
  title: string;
  experiences: Experience[];
  onRemoveExperience?: (item: Experience) => void;
};

const UserCvExperienceSection: React.FC<UserCvExperienceSectionProps> = ({
  title,
  experiences = [],
  onRemoveExperience,
}) => {
  return (
    <View className="mb-5">
      {title && (
        <View className="mb-3 w-full flex-row items-center justify-between border-b border-b-brandColor pb-2">
          <Text className="text-xl text-h1Color">{title}</Text>
        </View>
      )}
      <View className="pb-2">
        {experiences.map((experience) => (
          <View
            key={experience.companyName}
            className="mb-3 w-full flex-row items-center justify-between border-b border-dotted border-b-[#c2c2c2] py-2"
          >
            <View className="flex">
              <View className="flex justify-center">
                <View>
                  <Text className="text-base font-bold text-h1Color">{experience.title}</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-md text-defaultTextColor ">{experience.companyName}</Text>
                  {experience.location && (
                    <Text className="text-md text-defaultTextColor ">| {experience.location}</Text>
                  )}
                </View>
                {experience.startedOn && (
                  <Text className="font-light italic text-[#787878]">
                    ({experience.startedOn ?? ''} - {experience.finishedOn ?? 'Presente'})
                  </Text>
                )}
              </View>
              {experience.description && (
                <View className="pb-5">
                  <Text className="text-md text-defaultTextColor">{experience.description}</Text>
                </View>
              )}
            </View>
            {onRemoveExperience && (
              <CustomPressableOpacity onPress={() => onRemoveExperience(experience)}>
                <TrashFill width={25} height={25} fill={'#3c7c8c'} />
              </CustomPressableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserCvExperienceSection;
