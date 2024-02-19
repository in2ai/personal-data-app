import React, { useContext, useEffect, useState } from 'react';
import {
  getSecuredStoredUserData,
  removeSecuredStoredUserData,
  setSecuredStoredUserData,
} from '../services/store/secure-store-service';
import { UserData } from '../models/userData';

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
    getSecuredStoredUserData()
      .then((userData) => {
        setUserData(userData);
      })
      .catch(() => {
        console.log('No user CV recovered');
      });
  };

  const setStoredUserData = (userData: UserData) => {
    setUserData(userData);
    setSecuredStoredUserData(userData)
      .then(() => {
        console.log('User CV stored');
      })
      .catch((err) => {
        console.log('Error storing CV');
      });
  };

  const removeUserData = () => {
    removeSecuredStoredUserData()
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
