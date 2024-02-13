import React, { useContext, useState } from 'react';
import { generateKeyPair, getPublicKeyFromPrivate } from '../api/nostr';

interface AuthContextInterface {
  isLoading: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  handleSecret: (secret: string) => void;
  handleUsername: (username: string) => void;
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

  const handleSecret = (secretKey: string) => {
    try {
      if (secretKey.length !== 64) {
        alert('Secret key must be 64 bytes long');
        return;
      }
      const publicKey = getPublicKeyFromPrivate(secretKey);
      setPublicKey(publicKey);
      setSecretKey(secretKey);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleUsername = () => {
    console.log('handleUsername');
    console.log('isLoggedBEFORE: ', isLogged);
    console.log('secretBEFORE: ', secretKey);
    try {
      const keyPair = generateKeyPair();
      setPublicKey(keyPair.publicKey);
      setSecretKey(keyPair.secretKey);
      console.log('isLoggedAFTER: ', isLogged);
      console.log('secretAFTER: ', secretKey);
    } catch (e) {
      alert(e.message);
    }
  };

  const login = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    // recover secret
    return true;
  };

  const logout = async () => {
    setPublicKey(null);
    setSecretKey(null);
  };

  const api = {
    isLoading,
    login,
    logout,
    handleSecret,
    handleUsername,
    publicKey,
    secretKey,
    isLogged,
  };

  return <AuthContext.Provider value={api}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
