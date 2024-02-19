import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserData } from '../../models/userData';

// UserData
export const getAsyncstorageStoredUserData = async (): Promise<UserData> => {
  try {
    const userDataStored = await AsyncStorage.getItem('userData');
    if (!userDataStored) throw new Error('User Data not found');
    return JSON.parse(userDataStored);
  } catch (err) {
    throw new Error(`ERROR recovering User Data => ${err}`);
  }
};

export const setAsyncstorageStoredUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (err) {
    throw new Error(`ERROR storing user Data => ${err}`);
  }
};

export const removeAsyncstorageStoredUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (err) {
    throw new Error(`ERROR removing stored user Data => ${err}`);
  }
};
