import { useContext } from "react";
import { TournamentContext } from "../context/tournaments/TournamentsContext";

const useTournamentsContext = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error(
      "useTournamentsContext debe usarse dentro de <TournamentsProvider>"
    );
  }
  return context;
};

export default useTournamentsContext;
