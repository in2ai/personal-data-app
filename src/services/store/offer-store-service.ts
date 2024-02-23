import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkOffer } from '../../models/WorkOffer';

export const getAsyncStorageStoredOffers = async (): Promise<WorkOffer[]> => {
    try {
        const workOffersStored = await AsyncStorage.getItem('workOffers');
        if (!workOffersStored) return []; // Retorna un array vacío si no hay datos
        return JSON.parse(workOffersStored);
    } catch (err) {
        throw new Error(`ERROR recovering offers => ${err}`);
    }
};
  
export const setAsyncStorageStoredOffers = async (workOffers: WorkOffer[]): Promise<void> => {
    try {
        await AsyncStorage.setItem('workOffers', JSON.stringify(workOffers));
    } catch (err) {
        throw new Error(`ERROR storing offers => ${err}`);
    }
};
  
export const removeAsyncStorageStoredOffers = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('workOffers');
    } catch (err) {
        throw new Error(`ERROR removing stored offers => ${err}`);
    }
};

export const getAsyncStorageStoredOfferByTitle = async (title: string): Promise<WorkOffer | undefined> => {
    try {
        const workOffersStored = await AsyncStorage.getItem('workOffers');
        if (!workOffersStored) return undefined;
        const workOffers: WorkOffer[] = JSON.parse(workOffersStored);
        return workOffers.find(offer => offer.title === title);
    } catch (err) {
        throw new Error(`ERROR recovering offer by title => ${err}`);
    }
};
