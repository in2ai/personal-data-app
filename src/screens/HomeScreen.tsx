import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
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
import { useTensorflowContext } from '../context-providers/tensorflow-context';
import { useOfferContext } from '../context-providers/offer-context';
import SelectDropDown, { SelectItem } from '../components/smart/SelectDropDown';
import { Select } from '@tensorflow/tfjs';

const screenContainerStyle = 'flex h-full w-full justify-between items-center p-5';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { publicKey, secretKey } = useAuthContext();
  const { userData } = useUserDataContext();

  const { clearOffersFromStorage } = useOfferContext(); // TODO: for debug purposes

  const { logout } = useAuthContext();

  const { isModelLoaded } = useTensorflowContext();

  const onGoToCv = () => {
    navigation.navigate('MyCV');
  };

  const onGoToOffers = () => {
    navigation.navigate('Offers');
  };

  const onLogout = () => {
    logout();
  };

  // TODO: for debug purposes
  const onResetOffers = () => {
    clearOffersFromStorage();
  };

  // Industries
  const industries: SelectItem[] = [
    { label: 'Inteligencia Artificial', value: 'artificial_intelligence' },
  ];

  return (
    <View className={`relative ${screenContainerStyle}`}>
      <View className="absolute left-5 top-5">
        <CustomPressableOpacity accessibilityLabel="logout" onPress={onLogout}>
          <View className="flex-row items-center">
            <Power width={25} height={25} fill={'#3c7c8c'} />
            <Text className="ml-2 text-[#3c7c8c]">Logout</Text>
          </View>
        </CustomPressableOpacity>
      </View>
      {!isModelLoaded ? (
        <View className="flex h-full items-center justify-center">
          <ActivityIndicator size="large" color="#3c7c8c" />
          <Text className="mt-5 text-[#3c7c8c]">Loading model...</Text>
        </View>
      ) : (
        <>
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
            <View className="mb-5 w-60">
              <CustomButton
                disabled={!userData}
                icon={<Files width={25} height={25} fill={'#fff'} />}
                buttonType="primary"
                title="Ver ofertas"
                hasLargeFont={true}
                onPress={onGoToOffers}
              />
            </View>
            <View className="w-60">
              <SelectDropDown items={industries} selectedItem={industries[0]} />
            </View>
            <View className="mt-20 w-60">
              <CustomButton
                disabled={!userData}
                icon={<Files width={25} height={25} fill={'#fff'} />}
                buttonType="secondary"
                title="Reset ofertas"
                hasLargeFont={true}
                onPress={onResetOffers}
              />
            </View>
          </View>
          {/* For demo purposes */}
          {/* <View className="mt-auto">
            <View className="mb-5 w-[80%] flex-row rounded-md bg-[#ffffff] p-3">
              <Text className="text-[#404040]">Public key: </Text>
              <Text className="text-[#686868]">{publicKey}</Text>
            </View>
            <View className="mb-5 w-[80%] flex-row  rounded-md bg-[#ffffff] p-3">
              <Text className="text-[#404040]">Secret key: </Text>
              <Text className="text-[#686868]">{secretKey}</Text>
            </View>
          </View> */}
        </>
      )}
    </View>
  );
};

export default HomeScreen;
