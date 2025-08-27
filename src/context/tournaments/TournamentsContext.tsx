import React, { createContext } from "react";

type TournamentContextType = {
  tournaments: Tournament[] | null;
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[] | null>>;
  pastTournaments: Tournament[] | null;
  setPastTournaments: React.Dispatch<React.SetStateAction<Tournament[] | null>>;
  nextTournament: Tournament | null;
  setNextTournament: React.Dispatch<React.SetStateAction<Tournament | null>>;
  paginationInfo: TournamentsPaginationInfo | null;
  setPaginationInfo: React.Dispatch<
    React.SetStateAction<TournamentsPaginationInfo | null>
  >;
};

export const TournamentContext = createContext<
  TournamentContextType | undefined
>(undefined);
