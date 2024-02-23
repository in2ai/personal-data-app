import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';
import { useAuthContext } from '../context-providers/auth-context';
import { WorkOffer } from '../models/WorkOffer';
import WorkOffersList from '../components/smart/WorkOffersList/WorkOffersList';
import WorkOfferDetails from '../components/smart/WorkOffersList/WorkOfferDetails';

import { matchCVOffer, initTfjs, load_model, jsonToSpaceDelimitedText } from '../api/dl';
import { useUserDataContext } from '../context-providers/user-data-context';
import { useOfferContext}  from '../context-providers/offer-context';
import CustomButton from '../components/smart/CustomButton';

const screenContainerStyle = 'flex h-full w-full';

type OffersScreenProps = NativeStackScreenProps<RootStackParamList, 'Offers'>;

const OffersScreen: React.FC<OffersScreenProps> = ({ navigation }) => {
  const { userData } = useUserDataContext();
  const { workOffers, setWorkOffers, isFetching, setIsFetching, insertOffer, getOffers} = useOfferContext();

  const { publicKey, secretKey } = useAuthContext();
  // const [isFetching, setIsFetching] = useState(false);
  // const [workOffers, setWorkOffers] = useState<WorkOffer[]>([]);
  const [selectedWorkOffer, setSelectedWorkOffer] = useState<WorkOffer | null>(null);

  // Machine learning model
  const [modelLoading, setModelLoading] = useState(true);
  const [model, setModel] = useState(null);
  useEffect(() => {
    async function initAndLoadModel() {
      initTfjs();
      const loadedModel = await load_model();
      setModel(loadedModel);
      setModelLoading(false);
      getOffers();
    }
    initAndLoadModel();
  }, []);

  const checkMatch = async () => {
    if (!model) {
      console.log('NO MODEL LOADED');
      return;
    }

    const user = userData;
    const offer = workOffers[0];

    const user_string = jsonToSpaceDelimitedText(user);
    const offer_string = jsonToSpaceDelimitedText(offer);

    console.log('user_string', user_string);
    console.log('offer_string', offer_string);

    const match = await matchCVOffer(user_string, offer_string, model);

    alert('Match with offer ' + match.toString() + '%');
  };

  const onRefreshList = () => {
    getOffers();
  };

  const onPressWorkOffer = (workOffer: WorkOffer) => {
    console.log('onPressWorkOffer', workOffer);
    setSelectedWorkOffer(workOffer);
  };

  const onCancel = () => {
    setSelectedWorkOffer(null);
  };

  const onApply = (workOffer: WorkOffer) => {
    alert(`Aplicado con éxito a la oferta "${workOffer.title}"`);
    setSelectedWorkOffer(null);
  };

  return modelLoading ? (
    <View className="flex h-full items-center justify-center">
      <ActivityIndicator size="large" color="#3c7c8c" />
      <Text className="mt-5 text-[#3c7c8c]">Loading model...</Text>
    </View>
  ) : (
    <View className={screenContainerStyle}>
      <View className="flex-row">
        <View className="w-1/2 p-4 pr-2">
          <CustomButton buttonType="secondary" title="Insert offer" onPress={insertOffer} />
        </View>
        <View className="w-1/2 p-4 pl-2">
          <CustomButton buttonType="secondary" title="Match" onPress={checkMatch} />
        </View>
      </View>
      {!selectedWorkOffer ? (
        <WorkOffersList
          workOffers={workOffers}
          onRefresh={onRefreshList}
          isFetching={isFetching}
          onPressWorkOffer={onPressWorkOffer}
        />
      ) : (
        <WorkOfferDetails workOffer={selectedWorkOffer} onCancel={onCancel} onApply={onApply} />
      )}
    </View>
  );
};

export default OffersScreen;
