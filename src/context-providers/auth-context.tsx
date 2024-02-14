import React, { useContext, useEffect, useState } from 'react';
import { generateKeyPair, getPublicKeyFromPrivate } from '../api/nostr';
import {
  getSecuredStoredUser,
  removeSecuredStoredUser,
  setSecuredStoredUser,
} from '../services/store/secure-store-service';
import { User } from '../models/user';

interface AuthContextInterface {
  isLoading: boolean;
  logout: () => void;
  loginBySecretKey: (secret: string) => void;
  loginByUsername: (username: string) => void;
  publicKey: string | null;
  secretKey: string | null;
  isLogged: boolean;
}

export const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);

const AuthContextProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const isLogged = secretKey !== null;

  useEffect(() => {
    getUser();
  }, []);

  // LOGIN
  const loginBySecretKey = (secretKey: string) => {
    try {
      if (secretKey.length !== 64) {
        alert('Secret key must be 64 bytes long');
        return;
      }
      const publicKey = getPublicKeyFromPrivate(secretKey);

      const user: User = { publicKey, secretKey };
      setUser(user);
    } catch (e) {
      alert(e.message);
    }
  };

  const loginByUsername = () => {
    try {
      const keyPair = generateKeyPair();

      const user: User = { publicKey: keyPair.publicKey, secretKey: keyPair.secretKey };
      setUser(user);
    } catch (e) {
      alert(e.message);
    }
  };
  const logout = async () => {
    removeUser();
  };

  // USER
  const getUser = async () => {
    getSecuredStoredUser()
      .then((user) => {
        setPublicKey(user.publicKey);
        setSecretKey(user.secretKey);
      })
      .catch(() => {
        console.log('No user stored');
      });
  };

  const setUser = (user: User) => {
    setPublicKey(user.publicKey);
    setSecretKey(user.secretKey);
    setSecuredStoredUser(user).catch((e) => {
      alert(e.message);
    });
  };

  const removeUser = () => {
    setPublicKey(null);
    setSecretKey(null);
    removeSecuredStoredUser().catch((e) => {
      alert(e.message);
    });
  };

  const api = {
    isLoading,
    logout,
    loginBySecretKey,
    loginByUsername,
    publicKey,
    secretKey,
    isLogged,
  };

  return <AuthContext.Provider value={api}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
