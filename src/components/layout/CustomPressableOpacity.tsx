import React from 'react';
import { Animated, Easing, Pressable } from 'react-native';

type CustomPressableOpacityProps = {
  children: React.ReactNode;
  accessibilityLabel?: string;
  disabled?: boolean;
  isFluid?: boolean;
  onPress?: () => void;
};

const CustomPressableOpacity: React.FC<CustomPressableOpacityProps> = ({
  children,
  accessibilityLabel,
  disabled = false,
  isFluid = false,
  onPress,
}) => {
  const animated = new Animated.Value(1);
  const pressInAnimation = () => {
    Animated.timing(animated, {
      toValue: 0.5,
      duration: 100,
      easing: Easing.in(Easing.exp),
      useNativeDriver: true,
    }).start();
  };
  const pressOutAnimation = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 100,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };
  return (
    <Pressable
      className={isFluid ? 'grow' : ''}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={() => !disabled && onPress && onPress()}
      onPressIn={() => !disabled && pressInAnimation()}
      onPressOut={() => !disabled && pressOutAnimation()}
      hitSlop={5}
    >
      <Animated.View style={{ opacity: disabled ? 0.7 : animated }}>{children}</Animated.View>
    </Pressable>
  );
};

export default CustomPressableOpacity;
