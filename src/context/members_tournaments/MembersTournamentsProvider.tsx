import { useState, type ReactNode } from "react";
import { MembersTournamentsContext } from "./MembersTournamentsContext";

const MembersTournamentsProvider = ({ children }: { children: ReactNode }) => {
  const [membersTournaments, setMembersTournaments] = useState<
    MembersTournaments[] | null
  >(null);
  const [membersNotInTournament, setMembersNotInTournament] = useState<
    FullMemberInfo[] | null
  >(null);

  const [selectedTournament, setSelectedTournament] = useState(0);
  const [membersTournamentsPagination, setMembersTournamentsPagination] =
    useState<Pagination | null>(null);
  const [membersNotInTournamentsPagination, setMembersNotInTournamentsPagination] =
    useState<Pagination | null>(null);
  return (
    <MembersTournamentsContext.Provider
      value={{
        membersTournaments,
        setMembersTournaments,
        membersNotInTournament,
        setMembersNotInTournament,
        selectedTournament,
        setSelectedTournament,
        membersTournamentsPagination,
        setMembersTournamentsPagination,
        membersNotInTournamentsPagination,
        setMembersNotInTournamentsPagination,
      }}
    >
      {children}
    </MembersTournamentsContext.Provider>
  );
};

export default MembersTournamentsProvider;
