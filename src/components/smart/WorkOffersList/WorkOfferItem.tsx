import React, { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';
import { timestampToddMMYYYYhhmmss } from '../../../helpers/utils';
import { WorkOffer } from '../../../models/WorkOffer';

// Icons
import ExclamationCircle from '../../../assets/img/svg/exclamation-circle.svg';
import FavoriteToggleButton from '../../ui/FavoriteToggleButton/FavoriteToggleButton';
import { useOfferContext } from '../../../context-providers/offer-context';

type WorkOfferListItemProps = {
  workOffer: WorkOffer;
  onPress?: (workOffer: WorkOffer) => void;
};

const WorkOfferListItem: React.FC<WorkOfferListItemProps> = ({ workOffer, onPress }) => {
  const { toggleWorkOfferFavorite } = useOfferContext();
  const onToggleFavorite = async () => {
    toggleWorkOfferFavorite(workOffer);
  };

  const matchColorView =
    workOffer.match && workOffer.match > 50
      ? 'rounded-md p-2 bg-[#ffffff]'
      : 'rounded-md p-2 bg-[#ffffff]';
  const matchColorText =
    workOffer.match && workOffer.match > 50
      ? 'font-bold text-xs text-[#3c7c8c]'
      : 'font-bold text-xs text-[#e87975]';
  return (
    <CustomPressableOpacity onPress={() => onPress && onPress(workOffer)}>
      <View className="w-full flex-row items-center justify-between border-b border-dotted border-[#b8c1c9] p-5">
        <View className="flex-1 pr-2">
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
            <Text className={matchColorText}>{workOffer.match.toFixed(2)}%</Text>
          ) : workOffer.match === null ? (
            // Si workOffer.match es null, mostramos un ícono
            <View className="pl-2">
              <ExclamationCircle width={22} height={22} fill="#cc0000" />
            </View>
          ) : (
            <ActivityIndicator size="small" color="#3c7c8c" />
          )}
        </View>
        <View className="flex-none pl-4">
          <FavoriteToggleButton
            size={16}
            isSelected={workOffer.isFavorite}
            onToggle={onToggleFavorite}
          />
        </View>
      </View>
    </CustomPressableOpacity>
  );
};

export default memo(WorkOfferListItem);
