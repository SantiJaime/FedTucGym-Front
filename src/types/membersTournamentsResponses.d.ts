interface MembersTournaments {
  full_name: string;
  dni: number;
  id_tournament: number;
  id_gym: number;
  id_member: number;
  gym: string;
  paid: boolean;
}

interface GetMembersTournamentsResponse {
  message: string;
  membersTournaments: MembersTournaments[];
  pagination: Pagination;
}
interface RegisterToTournamentData {
  id_member: number;
  id_tournament: number;
}
interface RegisterToTournamentResponse {
  member: {
    id_tournament: number;
    id_member: number;
    paid: boolean;
  };
  message: string;
}
