import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { WorkOffer } from '../../../models/WorkOffer';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';

type WorkOfferListItemProps = {
  workOffer: WorkOffer;
  onPress?: (workOffer: WorkOffer) => void;
};

const WorkOfferListItem: React.FC<WorkOfferListItemProps> = ({ workOffer, onPress }) => {
  return (
    <CustomPressableOpacity onPress={() => onPress && onPress(workOffer)}>
      <View className="border-b border-[#DCE3EB] p-5">
        <Text className="text-lg text-h1Color">{workOffer.title}</Text>
        <Text className="text-md text-defaultTextColor">{workOffer.summary}</Text>
      </View>
    </CustomPressableOpacity>
  );
};

export default memo(WorkOfferListItem);
