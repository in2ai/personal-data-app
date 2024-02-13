import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import XCircle from '../../assets/img/svg/x-circle.svg';

type FieldProps = {
  label?: string;
  placeholder?: string;
  flex?: 'row' | 'column';
  value?: string | number;
  type?: 'text' | 'password';
  hasResetEnabled?: boolean;
  onChange?: (value: string) => void;
};

const Field: React.FC<FieldProps> = ({
  label,
  placeholder,
  flex = 'row',
  value,
  type = 'text',
  hasResetEnabled = true,
  onChange,
}) => {
  const [internalValue, setInternalValue] = React.useState<string | number>('');

  React.useEffect(() => {
    value !== undefined && setInternalValue(value);
  }, [value]);

  const onChangeText = (newValue: string) => {
    setInternalValue(newValue);
    onChange && onChange(newValue);
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
        <View className="relative flex-grow rounded-md border border-[#DAE1E7] bg-white">
          <TextInput
            secureTextEntry={type === 'password'}
            className="p-3 px-5 text-lg text-[#4B566B]"
            onChangeText={onChangeText}
            value={internalValue.toString()}
            placeholder={placeholder}
          />
          {hasResetEnabled && (
            <TouchableOpacity
              className="absolute right-3 h-full flex-none justify-center pl-3"
              onPress={() => onChangeText('')}
            >
              <XCircle width={20} height={20} fill={'#bbb'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Field;
