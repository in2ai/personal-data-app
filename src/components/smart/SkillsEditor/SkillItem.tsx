import React from 'react';
import { Text, View } from 'react-native';
import { Skill } from '../../../models/userData';

import TrashFill from '../../../assets/img/svg/trash-fill.svg';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';

type SkillItemProps = { skill: Skill; onRemoveSkill?: (skill: Skill) => void };

const SkillItem: React.FC<SkillItemProps> = ({ skill, onRemoveSkill }) => {
  return (
    <View className="border-lightGrey mb-2 flex-row items-center justify-between rounded-md border border-b px-3 py-2">
      <Text className="text-md text-defaultTextColor">{skill.value}</Text>
      <View>
        <CustomPressableOpacity
          accessibilityLabel="borrar habilidad"
          onPress={() => onRemoveSkill && onRemoveSkill(skill)}
        >
          <TrashFill width={25} height={25} fill={'#3c7c8c'} />
        </CustomPressableOpacity>
      </View>
    </View>
  );
};

export default SkillItem;
