import React, { createContext } from "react";

type GymsContextType = {
  gyms: User[] | null;
  setGyms: React.Dispatch<React.SetStateAction<User[] | null>>;
};

export const GymsContext = createContext<GymsContextType | undefined>(
  undefined
);
