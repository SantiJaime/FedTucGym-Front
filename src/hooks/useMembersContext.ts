import { useContext } from 'react';
import { MembersContext } from '../context/members/MembersContext';

const useMembersContext = () => {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembersContext debe usarse dentro de <MembersProvider>");
  }
  return context;
};

export default useMembersContext;