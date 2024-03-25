import React from 'react';

import { ScrollView, View } from 'react-native';
import { Skill } from '../../../models/userData';
import SkillItem from './SkillItem';
import Field from '../Field';

type SkillsEditorProps = { skills: Skill[]; onChange?: (skills: Skill[]) => void };

const SkillsEditor: React.FC<SkillsEditorProps> = ({ skills = [], onChange }) => {
  const [updatedSkills, setUpdatedSkills] = React.useState<Skill[]>(skills);

  const onAddNewSkill = (newSkill: string) => {
    console.log('New skill: ', newSkill);
    const newSkills = [...updatedSkills, { value: newSkill }];
    setUpdatedSkills(newSkills);
    onChange && onChange(newSkills);
  };

  const onRemoveSkill = (skill: Skill) => {
    const newSkills = updatedSkills.filter((aSkill) => aSkill !== skill);
    setUpdatedSkills(newSkills);
    onChange && onChange(newSkills);
  };

  return (
    <View className="flex flex-1 pt-3">
      <View className="flex-none">
        <Field
          hasResetOnSubmit={true}
          hasResetEnabled={false}
          label="Añadir habilidad"
          flex="column"
          value={''}
          onSubmitEditing={onAddNewSkill}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {updatedSkills.map((skill, index) => (
          <SkillItem key={index} skill={skill} onRemoveSkill={onRemoveSkill} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SkillsEditor;
