import React, { useContext, useEffect, useState } from 'react';

interface AuthContextInterface {
  isLoading: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({} as AuthContextInterface);

const AuthContextProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [secret, setSecret] = useState<string | null>();

  const isLogged = secret !== null;

  const login = async (username: string): Promise<boolean> => {
    setIsLoading(true);
    // recover secret
    return true;
  };

  const logout = async () => {
    setSecret(null);
  };

  return (
    <AuthContext.Provider value={{ isLoading, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
