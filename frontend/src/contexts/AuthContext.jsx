import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../api';

import Cookies from 'js-cookie';

const JWT_COOKIE_NAME = 'JWT';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const isAdmin = user?.role == 'ADMIN';
  const isProfessor = user?.role == 'PROFESSOR';

  useEffect(() => {
    async function main() {
      const jwt = Cookies.get(JWT_COOKIE_NAME);
      if (jwt) {
        api.changeClientBearerToken(jwt);

        setUser(await api.users.getMe());
      }

      setIsLoading(false);
    }
    main();
  }, []);

  async function login(data) {
    const { login, password } = data;

    const { jwt, ...newUser } = await api.users.login({
      login,
      password,
    });

    Cookies.set(JWT_COOKIE_NAME, jwt, {
      expires: 60 * 60 * 24 * 7, // 7 days
    });
    setUser(newUser);
  }

  function logout() {
    setUser(null);
    Cookies.remove(JWT_COOKIE_NAME);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        isAdmin,
        isProfessor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
