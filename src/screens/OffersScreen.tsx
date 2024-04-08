import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';
import { WorkOffer } from '../models/workOffer';
import WorkOffersList from '../components/smart/WorkOffersList/WorkOffersList';
import WorkOfferDetails from '../components/smart/WorkOffersList/WorkOfferDetails';

import { useOfferContext } from '../context-providers/offer-context';

const screenContainerStyle = 'flex h-full w-full';

type OffersScreenProps = NativeStackScreenProps<RootStackParamList, 'Offers'>;

const OffersScreen: React.FC<OffersScreenProps> = ({ navigation }) => {
  const { workOffers, isFetching: isFetchingWorkOffers } = useOfferContext();
  const sortedWorkOffers = workOffers?.sort((a, b) => b.createdAt - a.createdAt) ?? [];

  useEffect(() => {
    console.log('OffersScreen', workOffers);
  }, [workOffers]);

  const [selectedWorkOffer, setSelectedWorkOffer] = useState<WorkOffer | null>(null);

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

  return !workOffers ? (
    <View className="flex h-full items-center justify-center">
      <ActivityIndicator size="large" color="#3c7c8c" />
      <Text className="mt-5 text-[#3c7c8c]">Loading model...</Text>
    </View>
  ) : (
    <View className={screenContainerStyle}>
      {!selectedWorkOffer ? (
        <WorkOffersList
          workOffers={sortedWorkOffers}
          isFetching={isFetchingWorkOffers}
          onPressWorkOffer={onPressWorkOffer}
        />
      ) : (
        <WorkOfferDetails workOffer={selectedWorkOffer} onCancel={onCancel} onApply={onApply} />
      )}
    </View>
  );
};

export default OffersScreen;
