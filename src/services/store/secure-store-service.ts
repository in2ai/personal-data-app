import * as SecureStore from 'expo-secure-store';

import { User } from '../../models/user';
import { userCV } from '../../models/userCV';

// USER
export const getSecuredStoredUser = async (): Promise<User> => {
  try {
    const userStored = await SecureStore.getItemAsync('user');
    if (!userStored) throw new Error('User not found');
    return JSON.parse(userStored);
  } catch (err) {
    throw new Error(`ERROR recovering stored user => ${err}`);
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

// UserCV
export const getSecuredStoredUserCV = async (): Promise<UserCV> => {
  try {
    const userCVStored = await SecureStore.getItemAsync('userCV');
    if (!userCVStored) throw new Error('User CV not found');
    return JSON.parse(userCVStored);
  } catch (err) {
    throw new Error(`ERROR recovering User CV => ${err}`);
  }
};

export const setSecuredStoredUserCV = async (userCV: userCV): Promise<void> => {
  try {
    await SecureStore.setItemAsync('userCV', JSON.stringify(userCV));
  } catch (err) {
    throw new Error(`ERROR storing user CV => ${err}`);
  }
};

export const removeSecuredStoredUserCV = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('userCV');
  } catch (err) {
    throw new Error(`ERROR removing stored user CV => ${err}`);
  }
};
