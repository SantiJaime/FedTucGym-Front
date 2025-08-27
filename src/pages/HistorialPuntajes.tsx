import useUsers from "../hooks/useUsers";
import CardComp from "../components/CardComp";
import useTournaments from "../hooks/useTournaments";
import { Button } from "react-bootstrap";
import { OneTwoThreeIcon } from "../components/Icons";
import useScores from "../hooks/useScores";
import SelectTournamentComp from "../components/SelectTournamentComp";
import { useState } from "react";
import { toast } from "sonner";

const HistorialPuntajes = () => {
  const { user } = useUsers();
  const { pastTournaments, loading, paginationInfo, handleLoadMoreTournaments } = useTournaments();
  const { handleRedirect } = useScores();
  const [selectedTournament, setSelectedTournament] = useState(0);

  const redirect = async (id: number) => {
    if (selectedTournament === 0) {
      toast.error("Debe seleccionar un torneo");
      return;
    }
    const res = await handleRedirect(id);
    if (res?.scriptUrl) {
      window.open(res.scriptUrl, "_blank");
    }
  };

  if (!pastTournaments || pastTournaments.length === 0) {
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
          <SelectTournamentComp
            handleLoadMoreTournaments={handleLoadMoreTournaments}
            tournaments={pastTournaments}
            loading={loading}
            selectedTournament={selectedTournament}
            setSelectedTournament={setSelectedTournament}
            paginationInfo={paginationInfo}
          />
          <Button
            onClick={() => redirect(selectedTournament)}
            variant="outline-light"
            disabled={selectedTournament === 0}
            className="d-flex justify-content-center align-items-center gap-1"
          >
            <OneTwoThreeIcon />
            <span>Ver puntajes</span>
          </Button>
        </div>
      </CardComp>
    </div>
  );
};

export default HistorialPuntajes;
