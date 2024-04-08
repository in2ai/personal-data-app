import 'fast-text-encoding'; // this is needed to polyfill TextDecoder which nostr-tools uses
import 'react-native-get-random-values'; // this is needed to polyfill crypto.getRandomValues which nostr-tools uses
import 'react-native-webview-crypto'; // this is needed to polyfill crypto.subtle which nostr-tools uses
import 'react-native-url-polyfill/auto'; // this is needed to polyfill URLSearchParams which nostr-tools uses
import 'websocket-polyfill'; // this is needed to polyfill WebSocket which nostr-tools uses

import React, { useContext, useEffect, useState } from 'react';
import userStoreService from '../services/store/user/secure-store-service';
import { User } from '../models/user';
import nostrService from '../services/nostr/nostr-service';

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
      const publicKey = nostrService.getPublicKeyFromPrivate(secretKey);

      const user: User = { publicKey, secretKey };
      setUser(user);
    } catch (e) {
      alert(e.message);
    }
  };

  const loginByUsername = () => {
    try {
      const keyPair = nostrService.generateKeyPair();

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
    userStoreService
      .getUser()
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
    userStoreService.setUser(user).catch((e) => {
      alert(e.message);
    });
  };

  const removeUser = () => {
    setPublicKey(null);
    setSecretKey(null);
    userStoreService.removeUser().catch((e) => {
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
