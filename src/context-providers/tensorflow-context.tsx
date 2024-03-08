import React, { useContext, useEffect, useState } from 'react';
import { initTfjs, jsonToSpaceDelimitedText, load_model, matchCVOffer } from '../api/dl';
import { WorkOffer } from '../models/WorkOffer';
import { useUserDataContext } from './user-data-context';

//Borrar
import {
  getEventsFromRelay,
  publishEventToRelay,
  signEvent,
} from "../api/nostr";
const RELAY_URL = 'ws://137.184.117.201:8008';


interface TensorflowContextInterface {
  isModelLoaded: boolean;
  checkOffer: (offer: WorkOffer) => Promise<number>;
}

export const TensorflowContext = React.createContext<TensorflowContextInterface>(
  {} as TensorflowContextInterface
);

const TensorflowContextProvider = (props: any) => {
  const { userData } = useUserDataContext();

  const [modelLoading, setModelLoading] = useState(true);
  const [model, setModel] = useState(null);
  isModelLoaded = model;

  useEffect(() => {
    initAndLoadModel();
  }, []);

  const initAndLoadModel = async () => {
    await initTfjs();
    const loadedModel = await load_model();
    setModel(loadedModel);
    setModelLoading(false);
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

    const user_string = jsonToSpaceDelimitedText(userData);
    const offer_string = jsonToSpaceDelimitedText(offer);

    console.log('user_string', user_string);
    console.log('offer_string', offer_string);

    const match = await matchCVOffer(user_string, offer_string, model);
    return match;
  };

  const checkOffer_v = async (): Promise<number> => {
    if (!model) {
      console.log('NO MODEL LOADED');
      return;
    }
    if (!userData) {
      console.log('NO USER CV');
      return;
    }
    console.log("AAAAAAAAAAAAAAAAAAA")
    const offers = await getEventsFromRelay(RELAY_URL, {
      kinds: [30023],
      limit: 1,
    });

    const user_string = userData;
    const offer_string = JSON.parse(offers[0].content);

    const match = await matchCVOffer(user_string, offer_string, model);
    return match;
  };

  const api = { isModelLoaded, checkOffer, checkOffer_v };

  return <TensorflowContext.Provider value={api}>{props.children}</TensorflowContext.Provider>;
};

export const useTensorflowContext = () => useContext(TensorflowContext);

export default TensorflowContextProvider;
