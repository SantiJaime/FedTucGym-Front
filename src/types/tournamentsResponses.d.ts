interface Tournament {
  id: number;
  name: string;
  inscription_date_end: string;
  date_range: string;
}
interface CreateTournament {
  name: string;
  startDate: string;
  endDate: string;
  inscription_date_end: string;
}
interface GetTournamentsResponse {
  message: string;
  tournaments: Tournament[];
  paginationInfo: TournamentsPaginationInfo;
}
interface CreateTournamentResponse {
  message: string;
  tournament: Tournament;
}
interface DeleteMemberFromTournamentData {
  id_member: number;
  id_tournament: number;
}
interface TournamentsPaginationInfo {
  hasMore: boolean;
  totalCount: number;
  page: number;
}
