import React, { useState } from 'react';
import { View } from 'react-native';

// Icons
import Star from '../../../assets/img/svg/star.svg';
import StarFill from '../../../assets/img/svg/star-fill.svg';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';

type FavoriteToggleButtonProps = {
  isSelected?: boolean;
  onToggle?: () => void;
};

const FavoriteToggleButton: React.FC<FavoriteToggleButtonProps> = ({
  isSelected = false,
  onToggle,
}) => {
  const onToggleFavorite = () => {
    onToggle && onToggle();
  };
  return (
    <CustomPressableOpacity onPress={() => onToggleFavorite()}>
      <View>
        {isSelected ? (
          <StarFill width={22} height={22} fill="#3c7c8c" />
        ) : (
          <Star width={22} height={22} fill="#3c7c8c" />
        )}
      </View>
    </CustomPressableOpacity>
  );
};

export default FavoriteToggleButton;
