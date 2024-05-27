import React from 'react';
import { Text, View } from 'react-native';
import { Skill } from '../../models/userData';

type UserCvSkillsSectionProps = {
  title: string;
  skills: Skill[];
};

const UserCvSkillsSection: React.FC<UserCvSkillsSectionProps> = ({ title, skills = [] }) => {
  return (
    <View className="mb-5">
      <View className="mb-3 w-full flex-row items-center justify-between border-b border-b-brandColor pb-2">
        <Text className="text-xl text-h1Color">{title}</Text>
      </View>
      <View className="pb-2">
        <Text className="text-md text-defaultTextColor">
          {skills.map((skill) => skill.value).join(', ')}
        </Text>
      </View>
    </View>
  );
};

export default UserCvSkillsSection;
