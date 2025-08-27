import { useState, type ReactNode } from "react";
import { GymsContext } from './GymsContext';

const GymsProvider = ({ children }: { children: ReactNode }) => {
  const [gyms, setGyms] = useState<User[] | null>(null);

  return (
    <GymsContext.Provider value={{ gyms, setGyms }}>
      {children}
    </GymsContext.Provider>
  );
};

export default GymsProvider;
