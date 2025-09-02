import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface Props {
  user: UserInfo | null;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  logOutLoading: boolean;
}

const NavLinks: React.FC<Props> = ({ user, logout, isLoggedIn, logOutLoading }) => {
  const LOGGED_USER_NAVS = [
    {
      to: "/inicio",
      text: "Inicio",
    },
    {
      to: "/mi-cuenta",
      text: "Mi cuenta",
    },
  ];

  if (!user) {
    return (
      <NavLink to="/" className={"text-decoration-none btn btn-outline-light"}>
        Iniciar sesión
      </NavLink>
    );
  }
  const spinner = (
    <div className="d-flex align-items-center gap-2">
      <Spinner animation="border" variant="light" size="sm" />
      <span>Cerrando sesión...</span>
    </div>
  )
  return (
    <>
      {isLoggedIn && user.userId > 0 ? (
        <>
          {LOGGED_USER_NAVS.map((nav, index) => (
            <NavLink
              key={index}
              to={nav.to}
              className={"text-decoration-none btn btn-outline-light"}
            >
              {nav.text}
            </NavLink>
          ))}
          <Button onClick={logout} variant="outline-light" disabled={logOutLoading}>
            {logOutLoading ? spinner : "Cerrar sesión"}
          </Button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NavLinks;
