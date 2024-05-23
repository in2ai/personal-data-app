import React, { useState } from 'react';
import { View } from 'react-native';

// Icons
import Star from '../../../assets/img/svg/star.svg';
import StarFill from '../../../assets/img/svg/star-fill.svg';
import CustomPressableOpacity from '../../layout/CustomPressableOpacity';

type FavoriteToggleButtonProps = {
  size?: number;
  isSelected?: boolean;
  onToggle?: () => void;
};

const FavoriteToggleButton: React.FC<FavoriteToggleButtonProps> = ({
  size = 22,
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
          <StarFill width={size} height={size} fill="#3c7c8c" />
        ) : (
          <Star width={size} height={size} fill="#3c7c8c" />
        )}
      </View>
    </CustomPressableOpacity>
  );
};

export default FavoriteToggleButton;
