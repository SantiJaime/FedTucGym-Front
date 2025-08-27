import useUsers from "../hooks/useUsers";
import CardComp from "../components/CardComp";
import useTournaments from "../hooks/useTournaments";
import { Button, Spinner } from "react-bootstrap";
import { OneTwoThreeIcon } from "../components/Icons";
import useScores from "../hooks/useScores";

export default function Puntajes() {
  const { user } = useUsers();
  const { nextTournament, loading } = useTournaments();
  const { handleRedirect, loading: loadingScores } = useScores();

  const redirect = async (id: number) => {
    const res = await handleRedirect(id);
    if (res?.scriptUrl) {
      window.open(res.scriptUrl, "_blank");
    }
  };

  if (!nextTournament) {
    return (
      <div className="d-flex justify-content-center align-items-start min-vh-60 pt-5">
        <CardComp user={user} color="dark" textColor="white">
          <Button variant="outline-light" disabled>
            {loading ? "Cargando..." : "No hay torneos disponibles"}
          </Button>
        </CardComp>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-60 pt-5">
      <CardComp user={user} color="dark" textColor="white">
        <div className="d-flex flex-column gap-2">
          <Button variant="outline-light" disabled>
            {nextTournament.name}
          </Button>
          <Button
            variant="light"
            className="d-flex align-items-center gap-1"
            onClick={() => redirect(nextTournament.id)}
          >
            {loadingScores ? (
              <div className="d-flex align-items-center gap-1">
                <>
                  <Spinner animation="border" variant="light" size="sm" />
                  <span>Cargando...</span>
                </>
              </div>
            ) : (
              <>
                <OneTwoThreeIcon />
                <span>Puntuar alumnos</span>
              </>
            )}
          </Button>
        </div>
      </CardComp>
    </div>
  );
}
