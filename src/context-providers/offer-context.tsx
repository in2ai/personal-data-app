import React, { useContext, useEffect, useState } from 'react';
import { WorkOffer } from '../models/WorkOffer';
import { relayInit } from 'nostr-tools';
import offersStoreService from '../services/store/offers/offers-store-service';

const RELAY_URL = 'ws://137.184.117.201:8008';
interface OfferContextInterface {
  workOffers: WorkOffer[];
  isFetching: boolean;
}

export const OfferContext = React.createContext<OfferContextInterface>({} as OfferContextInterface);

const OfferContextProvider = (props: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const [workOffers, setWorkOffers] = useState<WorkOffer[]>([]);

  useEffect(() => {
    // For debug purposes, we clear the offers from storage
    // clearOffersFromStorage();
    getOffersFromStorage();
  }, []);

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
    }
    // workOffers && setWorkOffers(workOffers);
    subscribeToRelayOffers(lastOfferTimestamp);
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
      // TODO: add mapper to map the event to the WorkOffer model
      // create nostr event model
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
    // TODO: Use model to add similarity information to the offer
    // TODO: Change to SQL Lite as here we have a list of offers and we can sequencially
    //       pass by tensorflow and just update similarity
    setWorkOffers((workOffers) => [newWorkOffer, ...workOffers]);
    await offersStoreService.addNewOffer(newWorkOffer);
    console.log('Updated offers in storage, added new offer', newWorkOffer);
  };

  const api = {
    workOffers,
    isFetching,
  };

  return <OfferContext.Provider value={api}>{props.children}</OfferContext.Provider>;
};

export const useOfferContext = () => useContext(OfferContext);

export default OfferContextProvider;
