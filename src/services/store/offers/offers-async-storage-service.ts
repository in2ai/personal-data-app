import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkOffer } from '../../../models/WorkOffer';

const getAllOffers = async (): Promise<WorkOffer[]> => {
  try {
    const workOffersStored = await AsyncStorage.getItem('workOffers');
    if (!workOffersStored) return []; // Retorna un array vacío si no hay datos
    return JSON.parse(workOffersStored);
  } catch (err) {
    throw new Error(`ERROR recovering offers => ${err}`);
  }
};

const setAllOffers = async (workOffers: WorkOffer[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('workOffers', JSON.stringify(workOffers));
  } catch (err) {
    throw new Error(`ERROR storing offers => ${err}`);
  }
};

const removeAllOffers = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('workOffers');
  } catch (err) {
    throw new Error(`ERROR removing stored offers => ${err}`);
  }
};

const addNewOffer = async (newOffer: WorkOffer): Promise<void> => {
  try {
    const workOffersStored = await getAllOffers();
    workOffersStored.push(newOffer);
    await setAllOffers(workOffersStored);
  } catch (err) {
    throw new Error(`ERROR adding new offer => ${err}`);
  }
};

const offersAsyncStorageService = {
  getAllOffers,
  removeAllOffers,
  addNewOffer,
};

export default offersAsyncStorageService;
