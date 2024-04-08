import React, { memo } from 'react';
import { Text, View } from 'react-native';
import CustomPressableOpacity from '../layout/CustomPressableOpacity';

type CustomButtonProps = {
  icon?: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  buttonType?: 'primary' | 'secondary';
  hasLargeFont?: boolean;
  accessibilityLabel?: string;
  disabled?: boolean;
  onPress?: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  title,
  size = 'medium',
  buttonType = 'primary',
  hasLargeFont = false,
  accessibilityLabel,
  disabled,
  onPress,
}) => {
  return (
    <CustomPressableOpacity
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        className={`flex w-full cursor-pointer flex-row items-center  ${icon ? 'justify-start px-3' : 'justify-center'} rounded-md ${
          size === 'small' ? 'h-[55px]' : size === 'medium' ? 'h-[60px]' : 'h-[65px]'
        } ${
          disabled
            ? 'bg-[#3c7c8c] opacity-50'
            : buttonType === 'primary'
              ? 'border border-white bg-[#3c7c8c] opacity-100'
              : 'border border-black bg-white opacity-100'
        }`}
      >
        {icon && <View className="pr-2">{icon}</View>}
        <Text
          className={`whitespace-nowrap ${
            hasLargeFont ? 'text-[25px]' : 'text-[19px]'
          } font-semibold ${
            disabled ? 'text-[#3c7c8c]' : buttonType === 'primary' ? 'text-white' : 'text-[#3c7c8c]'
          }`}
        >
          {title}
        </Text>
      </View>
    </CustomPressableOpacity>
  );
};

export default memo(CustomButton);
