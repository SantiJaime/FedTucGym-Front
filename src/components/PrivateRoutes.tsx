import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useUserContext } from "../hooks/useUserContext";

interface Props {
  children: ReactNode;
  role: UserRole[];
}
const PrivateRoutes: React.FC<Props> = ({ children, role }) => {
  const { user, isInitializing } = useUserContext();

  if (isInitializing) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!role.includes(user.role)) {
    return <Navigate to="/inicio" />;
  }

  return children;
};

export default PrivateRoutes;
