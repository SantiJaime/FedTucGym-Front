import { useState, useEffect, type ReactNode } from 'react';
import { UserContext } from './UsersContext';
import { getMe } from '../../helpers/userQueries';

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserInfo | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userInfo = await getMe();
        setUserState(userInfo);
      } finally {
        setIsInitializing(false);
      }
    };
    initAuth();
  }, []);

  const setUser = (user: UserInfo | null) => {
    setUserState(user);
  };

  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, isInitializing }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
