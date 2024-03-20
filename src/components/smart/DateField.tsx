import React from 'react';
import { Text, View } from 'react-native';

import Calendar3 from '../../assets/img/svg/calendar3.svg';

import CustomPressableOpacity from '../layout/CustomPressableOpacity';

import DatePicker from 'react-native-date-picker';
import { dateToddMMYYYY, isoStringToddMMYYYY } from '../../helpers/utils';

type DateFieldProps = {
  label?: string;
  placeholder?: string;
  flex?: 'row' | 'column';
  value?: string; // ISO string
  type?: 'text' | 'password';
  hasResetEnabled?: boolean;
  onChange?: (dateISOstring: string) => void;
};

const DateField: React.FC<DateFieldProps> = ({ label, flex = 'row', value, onChange }) => {
  const [internalDate, setInternalDate] = React.useState<Date>();

  React.useEffect(() => {
    if (value === undefined || value === '') return;
    setInternalDate(new Date(value));
  }, [value]);

  const [open, setOpen] = React.useState(false);

  const onOpenDatePicker = () => {
    setOpen(true);
  };

  const onConfirmDate = (date: Date) => {
    setOpen(false);
    setInternalDate(date);
    onChange && onChange(date.toISOString());
  };

  const onCancelDate = () => {
    setOpen(false);
  };

  return (
    <View
      className={flex === 'row' ? 'flex flex-row items-center justify-between' : 'flex flex-col'}
    >
      <DatePicker
        modal
        mode="date"
        open={open}
        date={internalDate ?? new Date()}
        maximumDate={new Date()}
        onConfirm={onConfirmDate}
        onCancel={onCancelDate}
        locale="es-ES"
        title={`Selecciona ${label}`}
        confirmText="Confirmar"
        cancelText="Cancelar"
      />
      {label && (
        <View className={`flex-none ${flex === 'row' ? 'mr-3' : 'mb-1'}`}>
          <Text className="font-sans text-lg font-light text-[#4B566B]">{label}</Text>
        </View>
      )}
      <View className="flex-row items-center justify-between ">
        <View className="relative flex-grow rounded-md border border-[#DAE1E7] bg-white">
          <Text className="p-3 px-5 text-lg text-[#4B566B]">
            {internalDate && dateToddMMYYYY(internalDate)}
          </Text>
          <View className="absolute right-3 h-full flex-none justify-center pl-3">
            <CustomPressableOpacity onPress={onOpenDatePicker}>
              <Calendar3 width={20} height={20} fill={'#bbb'} />
            </CustomPressableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DateField;
