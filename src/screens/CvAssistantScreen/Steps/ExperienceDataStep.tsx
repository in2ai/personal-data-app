import 'expo-dev-client';
import React, { useState } from 'react';

import { Modal, ScrollView, Text, View } from 'react-native';

import { Experience, UserData } from '../../../models/userData';

import PlusCircleFill from '../../../assets/img/svg/plus-circle-fill.svg';
import X from '../../../assets/img/svg/x.svg';
import CustomPressableOpacity from '../../../components/layout/CustomPressableOpacity';
import CustomButton from '../../../components/smart/CustomButton';
import UserCvExperienceSection from '../../UserCvScreen/UserCvExperienceSection';
import ExperienceForm, { ExperienceFormRow } from './ExperienceForm';

export const USER_EXPERIENCE_ROWS: ExperienceFormRow[] = [
  { label: 'Compañia', property: 'companyName', type: 'text' },
  { label: 'Puesto', property: 'title', type: 'text' },
  { label: 'Descripción', property: 'description', type: 'text' },
  { label: 'Lugar', property: 'location', type: 'text' },
  { label: 'Empezado el', property: 'startedOn', type: 'ISOstring' },
  { label: 'Acabado el', property: 'finishedOn', type: 'ISOstring' },
];

type ExperienceDataStepProps = {
  editingCv: UserData;
  onChangeCv?: (editingCv: UserData) => void;
};

const ExperienceDataStep: React.FC<ExperienceDataStepProps> = ({ editingCv, onChangeCv }) => {
  const [internalCv, setInternalCv] = useState<UserData>(editingCv);
  const [newExperience, setNewExperience] = useState<Experience>();

  // MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setNewExperience(new Experience());
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setNewExperience(undefined);
    setIsModalVisible(false);
  };
  const onCancelNewExperience = () => {
    closeModal();
  };

  const onSaveNewExperience = () => {
    console.log('//New experience: ', newExperience);
    const newExperiences = internalCv.experiences
      ? [...internalCv.experiences, newExperience]
      : [newExperience];
    console.log('//New experiences: ', newExperiences);
    const newInternalCv = { ...internalCv, experiences: [...newExperiences] };
    setInternalCv(newInternalCv);
    onChangeCv && onChangeCv(newInternalCv);
    closeModal();
  };

  const onRemoveExperience = (experience: Experience) => {
    const newExperiences = internalCv.experiences?.filter(
      (anExperience) => anExperience !== experience
    );
    const newInternalCv = { ...internalCv, experiences: newExperiences };
    setInternalCv(newInternalCv);
    onChangeCv && onChangeCv(newInternalCv);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View
          className="h-full w-full items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <View
            className="relative flex h-full max-h-[95%] w-full max-w-[95%] rounded-md bg-white p-3 drop-shadow-lg"
            style={{
              shadowColor: '#000000',
              elevation: 5,
            }}
          >
            {/* Header */}
            <View className="w-full flex-none flex-row items-center justify-between border-b border-[#D2DAE1] pb-3">
              <Text className="pl-1 text-lg font-bold text-brandColor">Add new experience</Text>
              <CustomPressableOpacity onPress={closeModal}>
                <X width={30} height={30} fill={'#9EA5B0'} />
              </CustomPressableOpacity>
            </View>
            {/* Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View className="py-3">
                <ExperienceForm
                  experience={newExperience}
                  experienceFormRow={USER_EXPERIENCE_ROWS}
                  onChange={(experience) => setNewExperience(experience)}
                />
              </View>
            </ScrollView>
            {/* Actions */}
            <View className="flex-none flex-row items-center justify-between border-t border-[#D2DAE1] pt-3">
              <View className="w-1/2 pr-2">
                <CustomButton
                  buttonType="secondary"
                  title="Cancelar"
                  onPress={onCancelNewExperience}
                />
              </View>
              <View className="w-1/2 pl-2">
                <CustomButton buttonType="primary" title="Guardar" onPress={onSaveNewExperience} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View className="w-full flex-row items-center justify-between border-b border-dotted border-[#3c7c8c] pb-3">
        <Text className="text-lg text-h1Color">Experiencia</Text>
        <CustomPressableOpacity onPress={openModal}>
          <PlusCircleFill width={20} height={20} fill={'#3c7c8c'} />
        </CustomPressableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <UserCvExperienceSection
            title=""
            experiences={internalCv.experiences}
            onRemoveExperience={onRemoveExperience}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ExperienceDataStep;
