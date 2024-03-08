import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { Text, View, Button } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';

import CustomButton from '../components/smart/CustomButton';

// Expo
import { StatusBar } from 'expo-status-bar';

// Icons
import PersonWorkspace from '../assets/img/svg/person-workspace.svg';
import FileEarmarkPerson from '../assets/img/svg/file-earmark-person.svg';
import Files from '../assets/img/svg/files.svg';
import Power from '../assets/img/svg/power.svg';
import CustomPressableOpacity from '../components/layout/CustomPressableOpacity';
import { useAuthContext } from '../context-providers/auth-context';
import { useUserDataContext } from '../context-providers/user-data-context';

//remove
import { useTensorflowContext } from '../context-providers/tensorflow-context';

const screenContainerStyle = 'flex h-full w-full justify-between items-center p-5';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  //remove
  const { isModelLoaded, checkOffer, checkOffer_v } = useTensorflowContext();

  const { publicKey, secretKey } = useAuthContext();
  const { userData } = useUserDataContext();

  const { logout } = useAuthContext();

  const onGoToCv = () => {
    navigation.navigate('MyCV', { name: 'MyCV' });
  };

  const onGoToOffers = () => {
    navigation.navigate('Offers', { name: 'Offers' });
  };

  const onLogout = () => {
    logout();
  };

  return (
    <View className={`relative ${screenContainerStyle}`}>
      <StatusBar style={'light'} backgroundColor={'#3c7c8c'} />
      <View className="absolute left-5 top-12">
        <CustomPressableOpacity accessibilityLabel="logout" onPress={onLogout}>
          <View className="flex-row items-center">
            <Power width={25} height={25} fill={'#3c7c8c'} />
            <Text className="ml-2 text-[#3c7c8c]">Logout</Text>
          </View>
        </CustomPressableOpacity>
      </View>
      <View className="items-center">
        <View className="mb-20 mt-[35%] w-full items-center">
          <PersonWorkspace width={100} height={100} fill={'#3c7c8c'} />
        </View>
        <View className="mb-5 w-60">
          <CustomButton
            icon={<FileEarmarkPerson width={25} height={25} fill={'#ffffff'} />}
            buttonType="primary"
            title="Mi currículum"
            hasLargeFont={true}
            onPress={onGoToCv}
          />
        </View>
        <View className="w-60">
          <CustomButton
            disabled={!userData}
            icon={<Files width={25} height={25} fill={'#fff'} />}
            buttonType="primary"
            title="Ver ofertas"
            hasLargeFont={true}
            onPress={onGoToOffers}
          />
        </View>
      </View>
      {/* remove */}
      {/* <View><Button title="Match" onPress={checkOffer_v} /></View> */}

      <View className="mt-auto">
        <View className="mb-5 w-[80%] flex-row rounded-md bg-[#ffffff] p-3">
          <Text className="text-[#404040]">Public key: </Text>
          <Text className="text-[#686868]">{publicKey}</Text>
        </View>
        <View className="mb-5 w-[80%] flex-row  rounded-md bg-[#ffffff] p-3">
          <Text className="text-[#404040]">Secret key: </Text>
          <Text className="text-[#686868]">{secretKey}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
