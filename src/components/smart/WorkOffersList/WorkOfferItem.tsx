import React, { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';
import { timestampToddMMYYYYhhmmss } from '../../../helpers/utils';
import { WorkOffer } from '../../../models/WorkOffer';

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
      <View className="w-full flex-row items-center justify-between p-5">
        <View className="flex-1">
          <Text className="text-md font-bold text-h1Color">{workOffer.title}</Text>
          <Text className="text-xs font-bold">
            {timestampToddMMYYYYhhmmss(workOffer.createdAt)}
          </Text>
          <Text numberOfLines={2} className="text-md text-defaultTextColor">
            {workOffer.summary}
          </Text>
        </View>
        <View className={`flex-none ${workOffer.match ? matchColorView : null}`}>
          {workOffer.match || workOffer.match === 0 ? (
            <Text className={matchColorText}>{workOffer.match}%</Text>
          ) : (
            <ActivityIndicator size="small" color="#3c7c8c" />
          )}
        </View>
      </View>
    </CustomPressableOpacity>
  );
};

export default memo(WorkOfferListItem);
