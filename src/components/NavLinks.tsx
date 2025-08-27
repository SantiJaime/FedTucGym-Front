import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface Props {
  user: UserInfo | null;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

const NavLinks: React.FC<Props> = ({ user, logout, isLoggedIn }) => {
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
          <Button onClick={logout} variant="outline-light">
            Cerrar sesión
          </Button>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NavLinks;
