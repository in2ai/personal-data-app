import React from 'react';
import { Text, TextInput, View } from 'react-native';

import CustomPressableOpacity from '../layout/CustomPressableOpacity';
import XCircle from '../../assets/img/svg/x-circle.svg';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  flex?: 'row' | 'column';
  value?: string;
  hasResetEnabled?: boolean;
  hasResetOnSubmit?: boolean;
  onChange?: (value: string) => void;
  onSubmitEditing?: (value: string) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  flex = 'row',
  value,
  hasResetEnabled = true,
  hasResetOnSubmit = false,
  onChange,
  onSubmitEditing,
}) => {
  const [internalValue, setInternalValue] = React.useState<string>('');

  React.useEffect(() => {
    value !== undefined && setInternalValue(value);
  }, [value]);

  const onChangeText = (newValue: string) => {
    setInternalValue(newValue);
    onChange && onChange(newValue);
  };

  const onSubmitEdit = () => {
    onSubmitEditing && onSubmitEditing(internalValue);
    if (hasResetOnSubmit) {
      setInternalValue('');
    }
  };

  return (
    <View
      className={flex === 'row' ? 'flex flex-row items-center justify-between' : 'flex flex-col'}
    >
      {label && (
        <View className={`flex-none ${flex === 'row' ? 'mr-3' : 'mb-1'}`}>
          <Text className="font-sans text-lg font-light text-[#4B566B]">{label}</Text>
        </View>
      )}
      <View className="flex-row items-center justify-between ">
        <View className="border-lightGrey relative flex-grow rounded-md border bg-white">
          <TextInput
            className="p-3 px-5 text-lg text-[#4B566B]"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEdit}
            value={internalValue.toString()}
            placeholder={placeholder}
          />
          {hasResetEnabled && (
            <View className="absolute right-3 h-full flex-none justify-center pl-3">
              <CustomPressableOpacity onPress={() => onChangeText('')}>
                <XCircle width={20} height={20} fill={'#bbb'} />
              </CustomPressableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TextField;
