import { createContext } from "react";

type UserContextType = {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);