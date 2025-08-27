import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import InscripcionT from "../pages/InscripcionT";
import Alumnos from "../pages/Alumnos";
import Puntajes from "../pages/Puntajes";
import MiCuenta from "../pages/MiCuenta";
import PrivateRoutes from "../components/PrivateRoutes";
import AdministrarTorneos from "../pages/AdministrarTorneos";
import HistorialPuntajes from "../pages/HistorialPuntajes";

const RoutesView = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<h1>404</h1>} />
      <Route
        path="/crear-usuario"
        element={
          <PrivateRoutes role={["Administrador"]}>
            <RegisterPage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin-torneos"
        element={
          <PrivateRoutes role={["Administrador"]}>
            <AdministrarTorneos />
          </PrivateRoutes>
        }
      />
      <Route path="/inicio" element={<HomePage />} />
      <Route
        path="/mi-cuenta"
        element={
          <PrivateRoutes role={["Administrador", "Gimnasio", "Juez"]}>
            <MiCuenta />
          </PrivateRoutes>
        }
      />
      <Route
        path="/inscripcion-torneos"
        element={
          <PrivateRoutes role={["Administrador", "Gimnasio"]}>
            <InscripcionT />
          </PrivateRoutes>
        }
      />
      <Route
        path="/alumnos"
        element={
          <PrivateRoutes role={["Administrador", "Gimnasio"]}>
            <Alumnos />
          </PrivateRoutes>
        }
      />
      <Route
        path="/puntajes"
        element={
          <PrivateRoutes role={["Administrador", "Juez"]}>
            <Puntajes />
          </PrivateRoutes>
        }
      />
      <Route
        path="/historial-puntajes"
        element={
          <PrivateRoutes role={["Administrador", "Gimnasio", "Juez"]}>
            <HistorialPuntajes />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default RoutesView;
