import { useState, type ReactNode } from "react";
import { TournamentContext } from "./TournamentsContext";

const TournamentsProvider = ({ children }: { children: ReactNode }) => {
  const [tournaments, setTournaments] = useState<Tournament[] | null>(null);
  const [pastTournaments, setPastTournaments] = useState<Tournament[] | null>(
    null
  );
  const [nextTournament, setNextTournament] = useState<Tournament | null>(null);
  const [paginationInfo, setPaginationInfo] =
    useState<TournamentsPaginationInfo | null>(null);

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        setTournaments,
        pastTournaments,
        setPastTournaments,
        nextTournament,
        setNextTournament,
        paginationInfo,
        setPaginationInfo,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export default TournamentsProvider;
