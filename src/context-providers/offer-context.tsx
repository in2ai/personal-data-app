import React, { useContext, useEffect, useState } from 'react';
import { WorkOffer } from '../models/workOffer';
import { relayInit } from 'nostr-tools';
import offersStoreService from '../services/store/offers/offers-store-service';
import { useTensorflowContext } from './tensorflow-context';
import { createDatabaseTableIfNotExist } from '../services/store/offers/offers-sql-lite-storage-service';
import { useUserDataContext } from './user-data-context';

const RELAY_URL = 'ws://137.184.117.201:8008';
interface OfferContextInterface {
  workOffers: WorkOffer[];
  isFetching: boolean;
  updateAllOffersMatch: () => void;
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
    // For debug purposes, we clear the offers from storage
    // clearOffersFromStorage();
    isModelLoaded && getOffersFromStorage();
  }, [isModelLoaded]);

  const clearOffersFromStorage = async () => {
    await offersStoreService.removeAllOffers();
    setWorkOffers([]);
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
      },
    ]);
    sub.on('event', async (event) => {
      const newWorkOffer: WorkOffer = JSON.parse(event.content);
      newWorkOffer.createdAt = event.created_at;
      newWorkOffer.nostrId = event.id;
      console.log('//Received new offer', newWorkOffer.createdAt);
      addNewWorkOffer(newWorkOffer);
    });
    sub.on('eose', () => {
      sub.unsub();
    });

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
  };

  return <OfferContext.Provider value={api}>{props.children}</OfferContext.Provider>;
};

export const useOfferContext = () => useContext(OfferContext);

export default OfferContextProvider;
