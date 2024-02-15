import 'expo-dev-client';
import React from 'react';

import { ScrollView, Text, View } from 'react-native';
import CustomButton from '../components/smart/CustomButton';

import CustomPressableOpacity from '../components/layout/CustomPressableOpacity';

// Icons
import ArrowRightCircleFill from '../assets/img/svg/arrow-right-circle-fill.svg';
import ArrowLeftCircleFill from '../assets/img/svg/arrow-left-circle-fill.svg';
import Field from '../components/smart/Field';
import { UserCV } from '../models/userCV';

type CvAssistantScreenProps = {
  onCancel?: () => void;
  onSave?: (editingCv: UserCV) => void;
};

const CvAssistantScreen: React.FC<CvAssistantScreenProps> = ({ onCancel, onSave }) => {
  const [editingCv, setEditingCv] = React.useState<UserCV>(new UserCV());

  const [actualStep, setActualStep] = React.useState(1);
  const numSteps = 8;

  const onNextPress = () => {
    console.log('Next');
  };
  const onPreviousPress = () => {
    console.log('Previous');
  };

  const onSaveCV = () => {
    onSave && onSave(editingCv);
  };

  const isValidCv = editingCv.firstName && editingCv.lastName && editingCv.address;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="W-full h-full justify-between bg-[#ffffff] p-5">
        <View className="w-full pb-5">
          <Text className="text-xl font-bold text-h1Color">Asistente CV</Text>
          <Text className="text-md text-defaultTextColor">
            Sigue los pasos para completar tu CV.
          </Text>
        </View>
        {/* Steps */}
        <View className="grow px-10 py-5">
          <View className="w-full pb-5">
            <View className="pb-5">
              <Text className="text-lg text-h1Color">Datos personales</Text>
              <Text className="text-md text-defaultTextColor">Introduce tus datos personales.</Text>
            </View>
            <View>
              <View className="mb-5 w-full">
                <Field
                  label="Nombre"
                  flex="column"
                  value={editingCv.firstName}
                  onChange={(value) => setEditingCv({ ...editingCv, firstName: value })}
                />
              </View>
              <View className="mb-5 w-full">
                <Field
                  label="Apellidos"
                  flex="column"
                  value={editingCv.lastName}
                  onChange={(value) => setEditingCv({ ...editingCv, lastName: value })}
                />
              </View>
              <View className="mb-5 w-full">
                <Field
                  label="Dirección"
                  flex="column"
                  value={editingCv.address}
                  onChange={(value) => setEditingCv({ ...editingCv, address: value })}
                />
              </View>
            </View>
          </View>
          <View className="mt-auto w-full flex-row items-center justify-between pb-5">
            <CustomPressableOpacity
              accessibilityLabel={'nextStep'}
              onPress={onPreviousPress}
              disabled={actualStep === 1}
            >
              <ArrowLeftCircleFill width={25} height={25} fill={'#3c7c8c'} />
            </CustomPressableOpacity>
            <View className="flex items-center p-3">
              <Text>1 / 8</Text>
            </View>
            <CustomPressableOpacity
              accessibilityLabel={'nextStep'}
              onPress={onNextPress}
              disabled={actualStep === numSteps}
            >
              <ArrowRightCircleFill width={25} height={25} fill={'#3c7c8c'} />
            </CustomPressableOpacity>
          </View>
        </View>
        <View className="mt-auto flex-row justify-between p-5">
          <View className="w-1/2 pr-2">
            <CustomButton buttonType="secondary" title="Cerrar" onPress={onCancel} />
          </View>
          <View className="w-1/2 pl-2">
            <CustomButton title="Guardar" onPress={onSaveCV} disabled={!isValidCv} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CvAssistantScreen;
