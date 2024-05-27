import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export type SelectItem = { label: string; value: string };

type SelectDropDownProps = {
  items: SelectItem[];
  selectedItem?: SelectItem;
  title?: string;
  searchable?: boolean;
  onChangeValue?: (value: string | null) => void;
};

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  items = [],
  selectedItem,
  title,
  onChangeValue,
}) => {
  return (
    <View className="flex h-[100px] w-full items-start justify-start">
      {title && (
        <View>
          <Text className="font-inter pb-2 text-[15px] font-medium uppercase text-[#9EA5B0]">
            {title}
          </Text>
        </View>
      )}
      <View className="w-full">
        <Picker
          style={{
            height: 50,
            width: '100%',
            borderColor: '#E1E8F1',
            borderRadius: 5,
            borderWidth: 1,
            color: '#3c7c8c',
          }}
          itemStyle={{
            fontFamily: 'Inter',
            fontSize: 20,
          }}
          selectedValue={selectedItem.value}
          onValueChange={(itemValue, itemIndex) => onChangeValue(itemValue)}
        >
          {items.map((item, index) => (
            <Picker.Item
              style={{
                fontFamily: 'Inter',
                fontSize: 20,

                borderColor: '#E1E8F1',
                borderRadius: 5,
                borderWidth: 1,
              }}
              label={item.label}
              value={item.value}
              key={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectDropDown;
