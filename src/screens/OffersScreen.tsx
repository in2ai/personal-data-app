import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/MainNav';
import { useAuthContext } from '../context-providers/auth-context';
import { getEventsFromRelay, publishEventToRelay, signEvent } from '../api/nostr';
import { WorkOffer } from '../models/WorkOffer';
import WorkOffersList from '../components/smart/WorkOffersList/WorkOffersList';
import WorkOfferDetails from '../components/smart/WorkOffersList/WorkOfferDetails';

const RELAY_URL = 'ws://137.184.117.201:8008';

const screenContainerStyle = 'flex h-full w-full';

type OffersScreenProps = NativeStackScreenProps<RootStackParamList, 'Offers'>;

const OffersScreen: React.FC<OffersScreenProps> = ({ navigation }) => {
  const { publicKey, secretKey } = useAuthContext();
  const [isFetching, setIsFetching] = useState(false);
  const [workOffers, setWorkOffers] = useState<WorkOffer[]>([]);
  const [selectedWorkOffer, setSelectedWorkOffer] = useState<WorkOffer | null>(null);

  useEffect(() => {
    setIsFetching(true);
    getOffers();
    return () => {
      setIsFetching(false);
    };
  }, []);

  const handlePublicMessage = async () => {
    const message = '';
    try {
      const eventTemplate = {
        kind: 1,
        tags: [],
        content: message,
        created_at: Math.floor(Date.now() / 1000),
      };
      const signedEvent = signEvent(eventTemplate, secretKey);
      await publishEventToRelay(RELAY_URL, signedEvent);
    } catch (e) {
      alert(e.message);
    }
  };

  const insertOffer = async () => {
    try {
      const workOffer: WorkOffer = {
        title: 'Oferta de trabajo',
        summary: 'Oferta de trabajo de prueba',
        requiredSkills: ['React', 'Node.js', 'MongoDB'],
        location: 'Madrid',
        price: 50000,
        currency: 'EUR',
        period: 'year',
      };
      const workOfferString = JSON.stringify(workOffer);

      const eventTemplate = {
        kind: 30023,
        tags: [],
        content: workOfferString,
        created_at: Math.floor(Date.now() / 1000),
      };
      const signedEvent = signEvent(eventTemplate, secretKey);
      await publishEventToRelay(RELAY_URL, signedEvent);
      getOffers();
    } catch (e) {
      alert(e.message);
    }
  };

  const getOffers = async () => {
    setIsFetching(true);
    const events = await getEventsFromRelay(RELAY_URL, {
      kinds: [30023],
      limit: 10,
    });
    const workOffers: WorkOffer[] = events.map((event) => ({
      ...JSON.parse(event.content),
      match: Math.round(Math.random() * 100),
    }));
    workOffers.sort((a, b) => (a.match ?? 0) - (b.match ?? 0)).reverse();
    setIsFetching(false);
    setWorkOffers(workOffers);
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

  return (
    <View className={screenContainerStyle}>
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
