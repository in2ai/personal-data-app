import React, { useContext, useEffect, useState } from 'react';
import {
  getSecuredStoredUserCV,
  removeSecuredStoredUserCV,
  setSecuredStoredUserCV,
} from '../services/store/secure-store-service';
import { UserCV } from '../models/userCV';

interface UserCVContextInterface {
  userCV: UserCV;
  setUserCv: (userCv: UserCV) => void;
  removeUserCv: () => void;
}

export const UserCVContext = React.createContext<UserCVContextInterface>(
  {} as UserCVContextInterface
);

const UserCVContextProvider = (props: any) => {
  const [userCV, setUserCV] = useState<UserCV>();

  useEffect(() => {
    getUserCV();
  }, []);

  const getUserCV = async () => {
    getSecuredStoredUserCV()
      .then((userCV) => {
        setUserCV(userCV);
      })
      .catch(() => {
        console.log('No user cv stored');
      });
  };

  const setUserCv = (userCv: UserCV) => {
    setSecuredStoredUserCV(userCv)
      .then(() => {
        setUserCV(userCv);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeUserCv = () => {
    removeSecuredStoredUserCV()
      .then(() => {
        setUserCV(undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const api = { userCV, setUserCv, removeUserCv };

  return <UserCVContext.Provider value={api}>{props.children}</UserCVContext.Provider>;
};

export const useUserCVContext = () => useContext(UserCVContext);

export default UserCVContextProvider;
