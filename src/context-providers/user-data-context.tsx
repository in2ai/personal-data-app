import React, { useContext, useEffect, useState } from 'react';
import { UserData } from '../models/userData';
import userDataStoreService from '../services/store/user-data/user-data-store-service';

interface UserDataContextInterface {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  removeUserData: () => void;
}

export const UserDataContext = React.createContext<UserDataContextInterface>(
  {} as UserDataContextInterface
);

const UserDataContextProvider = (props: any) => {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    getStoredUserData();
  }, []);

  useEffect(() => {
    setStoredUserData(userData);
  }, [userData]);

  const getStoredUserData = async () => {
    userDataStoreService
      .getUserData()
      .then((userData) => {
        console.log('User CV recovered');
        setUserData(userData);
      })
      .catch(() => {
        console.log('No user CV recovered');
      });
  };

  const setStoredUserData = (userData: UserData) => {
    setUserData(userData);
    userDataStoreService
      .setUserData(userData)
      .then(() => {
        console.log('User CV stored');
      })
      .catch((err) => {
        console.log('Error storing CV');
      });
  };

  const removeUserData = () => {
    userDataStoreService
      .removeUserData()
      .then(() => {
        setUserData(undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api = { userData, setUserData, removeUserData };

  return <UserDataContext.Provider value={api}>{props.children}</UserDataContext.Provider>;
};

export const useUserDataContext = () => useContext(UserDataContext);

export default UserDataContextProvider;
