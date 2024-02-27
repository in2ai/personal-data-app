import React, { useContext, useEffect, useState } from 'react';
import { initTfjs, jsonToSpaceDelimitedText, load_model, matchCVOffer } from '../api/dl';
import { WorkOffer } from '../models/WorkOffer';
import { useUserDataContext } from './user-data-context';

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
    console.log('//SIMILARITY: ', match);
    return match;
  };

  const api = { isModelLoaded, checkOffer };

  return <TensorflowContext.Provider value={api}>{props.children}</TensorflowContext.Provider>;
};

export const useTensorflowContext = () => useContext(TensorflowContext);

export default TensorflowContextProvider;
