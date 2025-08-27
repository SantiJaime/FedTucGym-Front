import env from "../config/env";
import { refreshAccessToken } from "./authQueries";

const URL = `${env.URL_BACK_DEPLOY}/tournaments`;

export const getTournaments = async (): Promise<GetTournamentsResponse> => {
  const response = await fetch(`${URL}/date`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return getTournaments();
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const data: GetTournamentsResponse = await response.json();
  return data;
};

export const getPastTournaments = async (page: number = 1): Promise<GetTournamentsResponse> => {
  const response = await fetch(`${URL}/date/past?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return getPastTournaments();
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const data: GetTournamentsResponse = await response.json();
  return data;
};

export const createTournament = async (
  tournament: CreateTournament
): Promise<CreateTournamentResponse> => {
  const response = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tournament),
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return createTournament(tournament);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const data: CreateTournamentResponse = await response.json();
  return data;
};

export const deleteTournament = async (
  id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return deleteTournament(id);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const data: { message: string } = await response.json();
  return data;
};

export const getMembersTournaments = async (
  dataIds: FilterScoresData & { id_tournament: number }, page: number
): Promise<GetMembersTournamentsResponse> => {
  const { id_tournament, id_category, id_level } = dataIds;
  const response = await fetch(
    `${URL}/${id_tournament}/category/${id_category}/level/${id_level}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return getMembersTournaments(dataIds, page);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetMembersTournamentsResponse = await response.json();
  return res;
};

export const getMembersTournamentsByGym = async (
  dataIds: FilterScoresData & { id_gym: number; id_tournament: number }, page: number
): Promise<GetMembersTournamentsResponse> => {
  const { id_tournament, id_gym, id_category, id_level } = dataIds;
  const response = await fetch(
    `${URL}/${id_tournament}/category/${id_category}/level/${id_level}/gym/${id_gym}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return getMembersTournamentsByGym(dataIds, page);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetMembersTournamentsResponse = await response.json();
  return res;
};

export const getMembersNotInTournament = async (
  dataIds: FilterScoresData & { id_gym: number; id_tournament: number }, page: number
): Promise<GetMembersByGymResponse> => {
  const { id_tournament, id_gym, id_category, id_level } = dataIds;
  const response = await fetch(
    `${URL}/not-in/${id_tournament}/category/${id_category}/level/${id_level}/gym/${id_gym}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return getMembersNotInTournament(dataIds, page);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetMembersByGymResponse = await response.json();
  return res;
};

export const updatePayMemberTournament = async ({
  paid,
  id_tournament,
  id_member,
}: UpdatePayMemberTournamentData): Promise<{ message: string }> => {
  const response = await fetch(`${URL}/${id_tournament}/member/${id_member}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paid }),
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return updatePayMemberTournament({ paid, id_tournament, id_member });
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: { message: string } = await response.json();
  return res;
};
