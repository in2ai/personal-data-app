import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { WorkOffer } from '../../../models/WorkOffer';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';

type WorkOfferListItemProps = {
  workOffer: WorkOffer;
  onPress?: (workOffer: WorkOffer) => void;
};

const WorkOfferListItem: React.FC<WorkOfferListItemProps> = ({ workOffer, onPress }) => {
  const matchColorView =
    workOffer.match && workOffer.match > 50
      ? 'rounded-md px-3 py-2 bg-[#ffffff]'
      : 'rounded-md px-3 py-2 bg-[#ffffff]';
  const matchColorText =
    workOffer.match && workOffer.match > 50
      ? 'font-bold text-[#3c7c8c]'
      : 'font-bold text-[#e87975]';
  return (
    <CustomPressableOpacity onPress={() => onPress && onPress(workOffer)}>
      <View className="flex-row items-center justify-between border-b border-[#DCE3EB] p-5">
        <View className="">
          <Text className="text-lg text-h1Color">
            {workOffer.title}({workOffer.created_at})
          </Text>
          <Text className="text-md text-defaultTextColor">{workOffer.summary}</Text>
        </View>
        <View className={matchColorView}>
          <Text className={matchColorText}>{workOffer.match ?? 0}%</Text>
        </View>
      </View>
    </CustomPressableOpacity>
  );
};

export default memo(WorkOfferListItem);
