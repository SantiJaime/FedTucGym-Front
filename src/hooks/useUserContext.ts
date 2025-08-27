import { useContext } from 'react';
import { UserContext } from '../context/user/UsersContext';

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de <UserProvider>");
  }
  return context;
};
