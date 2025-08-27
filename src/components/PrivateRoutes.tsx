import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useUsers from '../hooks/useUsers';

interface Props {
  children: ReactNode;
  role: UserRole[];
}
const PrivateRoutes: React.FC<Props> = ({ children, role }) => {
  const { user } = useUsers();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!role.includes(user.role)) {
    return <Navigate to="/inicio" />;
  }

  return children;
};

export default PrivateRoutes;
