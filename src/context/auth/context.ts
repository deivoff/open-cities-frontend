import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { USER_ROLE } from '$types/globalTypes';

export interface AuthContext {
  token: string | null;
  user: User | null;
  login: Login;
  logout: () => void;
}

export interface User {
  id: string;
  email: string;
  name: {
    givenName: string;
    familyName: string;
  };
  access: USER_ROLE;
  photos: [
    {
      url: string;
    },
  ];
}
export interface Login {
  (token: string): void;
}

export const AuthContext = React.createContext<AuthContext>({
  token: null,
  user: null,
  login: () => {
    /* do nothing. */
  },
  logout: () => {
    /* do nothing. */
  },
});

export const useAuth = (): AuthContext => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      const {
        email, name, photos, id, access,
      } = jwtDecode<User>(savedToken);
      setUser({
        email, name, photos, id, access,
      });
    }
  }, []);

  const login: Login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    const {
      email, name, photos, id, access,
    }: User = jwtDecode(newToken);
    setUser({
      email, name, photos, id, access,
    });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    login, logout, token, user,
  };
};
