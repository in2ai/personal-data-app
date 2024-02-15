import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';
import { useUserCVContext } from '../context-providers/user-cv-context';
import NoCvScreen from './NoCvScreen';
import CvAssistantScreen from './CvAssistantScreen';
import { UserCV } from '../models/userCV';
import UserCvScreen from './UserCvScreen';

const screenContainerStyle = 'flex h-full w-full';

type MyCvScreenProps = NativeStackScreenProps<RootStackParamList, 'MyCV'>;

const MyCvScreen: React.FC<MyCvScreenProps> = ({}) => {
  const { userCV, setUserCv, removeUserCv } = useUserCVContext();
  const [startAssistant, setStartAssistant] = useState(false);

  const onStartAssistant = () => {
    setStartAssistant(true);
  };

  const onSaveUserCv = (userCv: UserCV) => {
    setUserCv(userCv);
  };

  const onRemoveUserCv = () => {
    removeUserCv();
  };

  return (
    <View className={screenContainerStyle}>
      {!userCV ? (
        startAssistant ? (
          <CvAssistantScreen onSave={onSaveUserCv} />
        ) : (
          <NoCvScreen onStartAssistant={onStartAssistant} />
        )
      ) : (
        <UserCvScreen userCv={userCV} onRemoveCv={onRemoveUserCv} />
      )}
    </View>
  );
};

export default MyCvScreen;
