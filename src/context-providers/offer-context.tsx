import React, { useContext, useEffect, useState } from 'react';
import {
  getAsyncStorageStoredOffers,
  setAsyncStorageStoredOffers,
  removeAsyncStorageStoredOffers,
} from '../services/store/offer-store-service';
import { useAuthContext } from '../context-providers/auth-context';
import { getEventsFromRelay, publishEventToRelay, signEvent } from '../api/nostr';
import { WorkOffer } from '../models/WorkOffer';

interface OfferContextInterface {
    isFetching: boolean;
    workOffers: WorkOffer[];
    selectedWorkOffer: WorkOffer | null;
    setIsFetching: (isFetching: boolean) => void;
    setWorkOffers: (workOffers: WorkOffer[]) => void;
    setSelectedWorkOffer: (workOffer: WorkOffer | null) => void;
    insertOffer: () => Promise<void>;
    getOffers: () => Promise<void>;
    //insertOffer: (offer: WorkOffer) => Promise<void>;
}
  
export const OfferContext = React.createContext<OfferContextInterface>(
    {} as OfferContextInterface
);
  
const OfferContextProvider = (props: any) => {

    const { publicKey, secretKey } = useAuthContext();

    const [isFetching, setIsFetching] = useState(false);
    const [workOffers, setWorkOffers] = useState<WorkOffer[]>([]);
    const [selectedWorkOffer, setSelectedWorkOffer] = useState<WorkOffer | null>(null);
    
    const RELAY_URL = 'ws://137.184.117.201:8008';
  
    useEffect(() => {
      getOffers();
    }, []);

    const insertOffer = async () => {
      console.log("Insert Offer")
      try {
        const workOffer: WorkOffer = {
          title: 'Desarrollador Fullstack',
          summary: 'Oferta para aplicaciones móviles y web',
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
      console.log("Get Offer")
      setIsFetching(true);
      const events = await getEventsFromRelay(RELAY_URL, {
          kinds: [30023],
          limit: 10,
      });
      const workOffers: WorkOffer[] = events.map((event) => ({
          ...JSON.parse(event.content),
      }));
      setIsFetching(false);
      setWorkOffers(workOffers);

      // checkMatch();
    };
  
    const api = {
      isFetching,
      workOffers,
      selectedWorkOffer,
      setIsFetching,
      setWorkOffers,
      setSelectedWorkOffer,
      insertOffer,
      getOffers
    };
  
    return <OfferContext.Provider value={api}>{props.children}</OfferContext.Provider>;
  };
  
export const useOfferContext = () => useContext(OfferContext);
  
export default OfferContextProvider;