import * as SecureStore from 'expo-secure-store';

import { User } from '../../../models/user';

// USER
export const getUser = async (): Promise<User> => {
  try {
    const userStored = await SecureStore.getItemAsync('user');
    if (!userStored) throw new Error('User not found');
    return JSON.parse(userStored);
  } catch (err) {
    throw new Error(`ERROR recovering stored user => ${err}`);
  }
};

export const setUser = async (user: User): Promise<void> => {
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  } catch (err) {
    throw new Error(`ERROR storing user => ${err}`);
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('user');
  } catch (err) {
    throw new Error(`ERROR removing user => ${err}`);
  }
};

const userStoreService = {
  getUser,
  setUser,
  removeUser,
};

export default userStoreService;
