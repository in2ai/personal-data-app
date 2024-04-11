import React, { useContext, useEffect, useState } from 'react';
import { initTfjs, jsonToSpaceDelimitedText, load_model, matchCVOffer } from '../api/dl';
import { WorkOffer } from '../models/WorkOffer';
import { useUserDataContext } from './user-data-context';

import {
  getEventsFromRelay,
  publishEventToRelay,
  signEvent,
} from "../api/.unused/nostr";
const RELAY_URL = "ws://137.184.117.201:8008";

interface TensorflowContextInterface {
  isModelLoaded: boolean;
  checkOffer: (offer: WorkOffer) => Promise<number>;
}

export const TensorflowContext = React.createContext<TensorflowContextInterface>(
  {} as TensorflowContextInterface
);

const TensorflowContextProvider = (props: any) => {
  const { userData } = useUserDataContext();

  const [model, setModel] = useState(null);
  const isModelLoaded = model ? true : false;

  useEffect(() => {
    initAndLoadModel();
  }, []);

  const initAndLoadModel = async () => {
    await initTfjs();
    const loadedModel = await load_model();
    setModel(loadedModel);
  };

  const checkOffer = async (offer: WorkOffer): Promise<number> => {
    if (!model) {
      console.log('NO MODEL LOADED');
      return;
    }
    if (!userData) {
      console.log('NO USER CV');
      return;
    }
    console.log('CHECKING OFFER');
    // const offers = await getEventsFromRelay(RELAY_URL, {kinds:[30023],limit:1,});
    // const user_string = jsonToSpaceDelimitedText(userData);
    // const offer_string = jsonToSpaceDelimitedText(offer);
    // console.log('user_string', user_string);
    // console.log('offer_string', offer_string);

    const match = await matchCVOffer(userData, offer, model); //JSON.parse(offers[0].content)
    return match;
  };

  const api = { isModelLoaded, checkOffer };

  return <TensorflowContext.Provider value={api}>{props.children}</TensorflowContext.Provider>;
};

export const useTensorflowContext = () => useContext(TensorflowContext);

export default TensorflowContextProvider;
