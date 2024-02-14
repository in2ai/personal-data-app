import * as SecureStore from 'expo-secure-store';

import { User } from '../../models/user';

export const getSecuredStoredUser = async (): Promise<User> => {
  try {
    const userStored = await SecureStore.getItemAsync('user');
    if (!userStored) throw new Error('User not found');
    return JSON.parse(userStored);
  } catch (err) {
    throw new Error(`ERROR recovering items => ${err}`);
  }
};

export const setSecuredStoredUser = async (user: User): Promise<void> => {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  } catch (err) {
    throw new Error(`ERROR storing user => ${err}`);
  }
};

export const removeSecuredStoredUser = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('user');
  } catch (err) {
    throw new Error(`ERROR removing user => ${err}`);
  }
};
