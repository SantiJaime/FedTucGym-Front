import { useContext } from 'react';
import { GymsContext } from '../context/gyms/GymsContext';

const useGymsContext = () => {
  const context = useContext(GymsContext);
  if (!context) {
    throw new Error("useGymsContext debe usarse dentro de <GymsProvider>");
  }
  return context;
};

export default useGymsContext;