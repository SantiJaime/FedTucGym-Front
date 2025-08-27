import useUsers from "../hooks/useUsers";
import CardComp from "../components/CardComp";

export default function MiCuenta() {
  const { user } = useUsers();

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-60 pt-5">
      <CardComp user={user} color="success" textColor="white" />
    </div>
  );
}
