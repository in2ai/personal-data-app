import React, { useContext, useEffect, useState } from 'react';
import { relayInit } from 'nostr-tools';
import offersStoreService from '../services/store/offers/offers-store-service';
import { useTensorflowContext } from './tensorflow-context';
import { createDatabaseTableIfNotExist } from '../services/store/offers/offers-sql-lite-storage-service';
import { useUserDataContext } from './user-data-context';
import { ScrollView, Text, View } from 'react-native';
import { WorkOffer } from '../models/WorkOffer';
import { StatusBar } from 'expo-status-bar';

const RELAY_URL = 'ws://137.184.117.201:8008';

interface OfferContextInterface {
  workOffers: WorkOffer[];
  isFetching: boolean;
  updateAllOffersMatch: () => void;
  clearOffersFromStorage: () => void; // TODO: for debugging purpposes
}

export const OfferContext = React.createContext<OfferContextInterface>({} as OfferContextInterface);

const OfferContextProvider = (props: any) => {
  const { isModelLoaded, checkOffer } = useTensorflowContext();
  const { userData } = useUserDataContext();

  const [isFetching, setIsFetching] = useState(false);
  const [workOffers, setWorkOffers] = useState<WorkOffer[]>([]);

  useEffect(() => {
    createDatabaseTableIfNotExist();
    console.log('Check if table exists and create if not');
  }, []);

  useEffect(() => {
    if (!userData) return;

    updateAllOffersMatch();
  }, [userData]);

  useEffect(() => {
    isModelLoaded && getOffersFromStorage();
  }, [isModelLoaded]);

  const clearOffersFromStorage = async () => {
    await offersStoreService.removeAllOffers();
    setWorkOffers([]);
    getOffersFromStorage();
  };

  const getOffersFromStorage = async () => {
    setIsFetching(true);
    const workOffers = await offersStoreService.getAllOffers();
    console.log('Offers from storage', workOffers);
    setIsFetching(false);
    let lastOfferTimestamp = 1706758766; // Thursday, February 1, 2024 3:39:26 AM
    if (workOffers && workOffers.length > 0) {
      setWorkOffers(workOffers);
      lastOfferTimestamp = workOffers.sort((a, b) => b.createdAt - a.createdAt)[0].createdAt;
      console.log('Last offer timestamp', lastOfferTimestamp);
      checkOffersFromStorageMatch(workOffers);
    }
    subscribeToRelayOffers(lastOfferTimestamp);
  };

  const checkOffersFromStorageMatch = async (workOffers: WorkOffer[]) => {
    if (workOffers && workOffers.length > 0) {
      workOffers.forEach((workOffer) => {
        workOffer.match === null && checkSimilarity(workOffer);
      });
    }
  };

  const updateAllOffersMatch = async () => {
    if (workOffers && workOffers.length > 0) {
      workOffers.forEach(async (workOffer) => {
        checkSimilarity(workOffer);
      });
    }
  };

  const subscribeToRelayOffers = async (lastTimeStamp?: number) => {
    console.log('Subscribing to relay from timestamp', lastTimeStamp + 1);
    const relay = await relayInit(RELAY_URL);

    relay.on('connect', () => {
      console.log('Connected to relay');
    });

    const sub = relay.sub([
      {
        kinds: [30023],
        since: lastTimeStamp + 1,
        '#industry': undefined, //['work_offer'],
      },
    ]);
    sub.on('event', async (event) => {
      console.log('/////New event');
      const newWorkOffer: WorkOffer = JSON.parse(event.content);
      newWorkOffer.createdAt = event.created_at;
      newWorkOffer.nostrId = event.id;
      addNewWorkOffer(newWorkOffer);
    });
    // sub.on('eose', () => {
    //   console.log('/////EOSE');
    //   sub.unsub();
    // });

    relay.connect();
  };

  const addNewWorkOffer = async (newWorkOffer: WorkOffer) => {
    setWorkOffers((workOffers) => [newWorkOffer, ...workOffers]);
    await offersStoreService.addNewOffer(newWorkOffer);

    checkSimilarity(newWorkOffer);
  };

  const checkSimilarity = async (workOffer: WorkOffer) => {
    const match = await checkOffer(workOffer);
    console.log('//Updated match: ', match);
    workOffer.match = match;
    setWorkOffers((workOffers) =>
      workOffers.map((offer) => (offer.nostrId === workOffer.nostrId ? workOffer : offer))
    );
    await offersStoreService.updateOfferMatch(workOffer);
  };

  const api = {
    workOffers,
    isFetching,
    updateAllOffersMatch,
    clearOffersFromStorage, // TODO: for debugging purposes
  };

  return (
    <OfferContext.Provider value={api}>
      <View className="relative h-full w-full pt-6">
        <StatusBar style={'light'} backgroundColor={'#3c7c8c'} />
        <View className="flex-1">{props.children}</View>
        {/* For debugging pusposes */}
        <View className="absolute bottom-5 left-5 right-5 z-10 h-40 w-[50%] bg-[#000000] opacity-90">
          <ScrollView>
            <Text className="text-[#ffffff]">
              {workOffers ? JSON.stringify(workOffers) : 'No offers'}
            </Text>
          </ScrollView>
        </View>
        {/* End for debugging purposes
         */}
      </View>
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => useContext(OfferContext);

export default OfferContextProvider;
