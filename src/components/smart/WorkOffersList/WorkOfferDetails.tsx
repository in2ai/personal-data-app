import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { WorkOffer } from '../../../models/WorkOffer';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';
import CustomButton from '../CustomButton';

type WorkOfferDetailsProps = {
  workOffer: WorkOffer;
  onApply?: (workOffer) => void;
  onCancel?: () => void;
};

const WorkOfferDetails: React.FC<WorkOfferDetailsProps> = ({ workOffer, onApply, onCancel }) => {
  const onApplyOffer = () => {
    onApply && onApply(workOffer);
  };

  return (
    <View className="grow justify-between bg-[#ffffff] p-5">
      <View className="my-5 w-full items-center">
        <Text className="text-xl text-h1Color">{workOffer.title}</Text>
      </View>
      <View className="p-5">
        <Text className="text-lg text-h1Color">Descripción</Text>
        <Text className="text-md text-defaultTextColor">{workOffer.summary}</Text>
      </View>
      <View className="p-5">
        <Text className="text-lg text-h1Color">Requisitos</Text>
        <View>
          {workOffer.requiredSkills.map((requiredSkill) => (
            <View key={requiredSkill}>
              <Text className="text-md text-defaultTextColor">{requiredSkill}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="p-5">
        <Text className="text-lg text-h1Color">Ubicación</Text>
        <Text className="text-md text-defaultTextColor">{workOffer.location}</Text>
      </View>
      <View className="p-5">
        <Text className="text-lg text-h1Color">Salario</Text>
        <Text className="text-md text-defaultTextColor">
          {workOffer.price} {workOffer.currency} / {workOffer.period}
        </Text>
      </View>
      <View className="mt-auto flex-row justify-between p-5">
        <View className="w-1/2 pr-2">
          <CustomButton buttonType="secondary" title="Cerrar" onPress={onCancel} />
        </View>
        <View className="w-1/2 pl-2">
          <CustomButton title="Aplicar" onPress={onApplyOffer} />
        </View>
      </View>
    </View>
  );
};

export default memo(WorkOfferDetails);
