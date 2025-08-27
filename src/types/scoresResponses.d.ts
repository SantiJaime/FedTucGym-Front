interface Score {
  id: number;
  member_name: string;
  member_dni: number;
  id_tournament: number;
  id_category: number;
  id_gym: number;
  gym: string;
  puntaje: number;
}
interface ScoreWithIds {
  id_member: number;
  id_tournament: number;
  puntaje: number;
  id: number;
}
interface FilterScoresData {
  id_category: number;
  id_level: number;
  id_tournament: number;
  id_gym?: number;
}
interface GetScoresByLevelAndCategoryResponse {
  scores: Score[];
  message: string;
  pagination: Pagination;
}
interface CreateScoreData {
  id_tournament: number;
  id_member: number;
  puntaje: number;
}
interface CreateScoreResponse {
  message: string;
  score: ScoreWithIds;
}
