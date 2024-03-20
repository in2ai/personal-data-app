import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';
import { useUserDataContext } from '../context-providers/user-data-context';
import NoCvScreen from './NoCvScreen';
import CvAssistantScreen from './CvAssistantScreen/CvAssistantScreen';
import { UserData } from '../models/userData';
import UserCvScreen from './UserCvScreen';

const screenContainerStyle = 'flex h-full w-full';

type MyCvScreenProps = NativeStackScreenProps<RootStackParamList, 'MyCV'>;

const MyCvScreen: React.FC<MyCvScreenProps> = ({}) => {
  const { userData, setUserData, removeUserData } = useUserDataContext();
  const [startAssistant, setStartAssistant] = useState(false);

  const onStartAssistant = () => {
    setStartAssistant(true);
  };

  const onSaveUserCv = (userData: UserData) => {
    setUserData(userData);
  };

  const onRemoveUserCv = () => {
    removeUserData();
    setStartAssistant(false);
  };

  const onCancelAssistant = () => {
    setStartAssistant(false);
  };

  return (
    <View className={screenContainerStyle}>
      {!userData ? (
        startAssistant ? (
          <CvAssistantScreen onSave={onSaveUserCv} onCancel={onCancelAssistant} />
        ) : (
          <NoCvScreen onStartAssistant={onStartAssistant} onImportedUserCv={onSaveUserCv} />
        )
      ) : (
        <UserCvScreen userData={userData} onRemoveCv={onRemoveUserCv} />
      )}
    </View>
  );
};

export default MyCvScreen;
