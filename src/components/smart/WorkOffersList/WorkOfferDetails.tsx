import React, { memo, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

import CustomButton from '../CustomButton';
import { WorkOffer } from '../../../models/WorkOffer';
import FavoriteToggleButton from '../../ui/FavoriteToggleButton/FavoriteToggleButton';
import { useOfferContext } from '../../../context-providers/offer-context';

type WorkOfferDetailsProps = {
  workOffer: WorkOffer;
  onApply?: (workOffer) => void;
  onCancel?: () => void;
};

const WorkOfferDetails: React.FC<WorkOfferDetailsProps> = ({ workOffer, onApply, onCancel }) => {
  const onApplyOffer = () => {
    onApply && onApply(workOffer);
  };

  const { toggleWorkOfferFavorite } = useOfferContext();
  const onToggleFavorite = async () => {
    toggleWorkOfferFavorite(workOffer);
  };

  return (
    <View className="grow justify-between bg-[#ffffff] px-5">
      <View className="w-full flex-row items-center justify-between border-b border-dotted border-[#b8c1c9] py-5">
        <Text className="pr-5 text-lg font-semibold leading-[24px] text-h1Color">
          {workOffer.title}
        </Text>
        <View className="flex-none">
          <FavoriteToggleButton isSelected={workOffer.isFavorite} onToggle={onToggleFavorite} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-5">
          <Text className="text-lg text-h1Color">Descripción</Text>
          <Text className="text-md text-defaultTextColor">{workOffer.summary}</Text>
        </View>
        <View className="py-5">
          <Text className="text-lg text-h1Color">Requisitos</Text>
          <Text className="text-md text-defaultTextColor">
            {workOffer.requiredSkills?.join(', ')}
          </Text>
        </View>
        <View className="py-5">
          <Text className="text-lg text-h1Color">Ubicación</Text>
          <Text className="text-md text-defaultTextColor">{workOffer.location}</Text>
        </View>
        <View className="py-5">
          <Text className="text-lg text-h1Color">Salario</Text>
          <Text className="text-md text-defaultTextColor">
            {workOffer.price} {workOffer.currency} / {workOffer.period}
          </Text>
        </View>
      </ScrollView>
      <View className="mt-auto flex-row justify-between py-5">
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
