import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const ADMIN_OPTIONS = [
  { nombre: "MI CUENTA", ruta: "/mi-cuenta" },
  { nombre: "REGISTRAR USUARIO", ruta: "/crear-usuario" },
  { nombre: "ADMINISTRAR TORNEOS", ruta: "/admin-torneos" },
  { nombre: "ALUMNOS", ruta: "/alumnos" },
  { nombre: "HISTORIAL DE PUNTAJES", ruta: "/historial-puntajes" },
];

const GYM_OPTIONS = [
  {
    nombre: "MI CUENTA",
    ruta: "/mi-cuenta",
  },
  {
    nombre: "ALUMNOS",
    ruta: "/alumnos",
  },
  {
    nombre: "INSCRIPCIÓN TORNEOS",
    ruta: "/inscripcion-torneos",
  },
  {
    nombre: "HISTORIAL DE PUNTAJES",
    ruta: "/historial-puntajes",
  },
];

const JUEZ_OPTIONS = [
  {
    nombre: "MI CUENTA",
    ruta: "/mi-cuenta",
  },
  {
    nombre: "PUNTAJES",
    ruta: "/puntajes",
  },
  {
    nombre: "HISTORIAL DE PUNTAJES",
    ruta: "/historial-puntajes",
  },
];

const Menu = () => {
  const navigate = useNavigate();

  const { user } = useUsers();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "65vh" }}
    >
      <List
        sx={{ width: "50%", maxWidth: 800, bgcolor: "background.paper" }}
        className="rounded-4"
      >
        {user?.role === "Administrador"
          ? ADMIN_OPTIONS.map((opcion, index) => (
              <ListItemButton
                key={index}
                onClick={() => navigate(opcion.ruta)}
                sx={{ textAlign: "center" }}
              >
                <ListItemText
                  primary={opcion.nombre}
                  sx={{ textAlign: "center" }}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            ))
          : user?.role === "Gimnasio"
          ? GYM_OPTIONS.map((opcion, index) => (
              <ListItemButton
                key={index}
                onClick={() => navigate(opcion.ruta)}
                sx={{ textAlign: "center" }}
              >
                <ListItemText
                  primary={opcion.nombre}
                  sx={{ textAlign: "center" }}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            ))
          : user?.role === "Juez"
          ? JUEZ_OPTIONS.map((opcion, index) => (
              <ListItemButton
                key={index}
                onClick={() => navigate(opcion.ruta)}
                sx={{ textAlign: "center" }}
              >
                <ListItemText
                  primary={opcion.nombre}
                  sx={{ textAlign: "center" }}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            ))
          : ""}
      </List>
    </div>
  );
};

export default Menu;
