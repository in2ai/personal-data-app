import * as SecureStore from 'expo-secure-store';

import { User } from '../../models/user';
import { UserData } from '../../models/userData';

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

// UserData
export const getSecuredStoredUserData = async (): Promise<UserData> => {
  try {
    const userDataStored = await SecureStore.getItemAsync('userData');
    if (!userDataStored) throw new Error('User Data not found');
    return JSON.parse(userDataStored);
  } catch (err) {
    throw new Error(`ERROR recovering User Data => ${err}`);
  }
};

export const setSecuredStoredUserData = async (userData: UserData): Promise<void> => {
  try {
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
  } catch (err) {
    throw new Error(`ERROR storing user Data => ${err}`);
  }
};

export const removeSecuredStoredUserData = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('userData');
  } catch (err) {
    throw new Error(`ERROR removing stored user Data => ${err}`);
  }
};
