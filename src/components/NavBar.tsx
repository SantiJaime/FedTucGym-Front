import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import NavLinks from "./NavLinks";

function NavbarComp() {
  const { handleLogout, user, isLoggedIn, logOutLoading } = useUsers();

  const logout = async () => {
    await handleLogout();
  };

  return (
    <Navbar className="navColor" data-bs-theme="dark" fixed="top">
      <Container>
        <Nav className="d-flex justify-content-between align-items-center gap-2 w-100">
          <NavLink to="/HomePage" className={"text-white text-decoration-none"}>
            <Image src="/logo_blanco.png" alt="Logo de torneos" width={50} />
          </NavLink>
          <div className="d-flex gap-3">
            <NavLinks user={user} isLoggedIn={isLoggedIn} logout={logout} logOutLoading={logOutLoading} />
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
