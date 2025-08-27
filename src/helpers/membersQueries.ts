import env from "../config/env";
import { refreshAccessToken } from "./authQueries";

const URL_API = `${env.URL_BACK_DEPLOY}/members`;

export const getMembersByGym = async (
  paramsPayload: Params,
  gymId: number,
  page: number = 1
): Promise<GetMembersByGymResponse> => {
  const url = new URL(`${URL_API}/${gymId}`);
  const params = new URLSearchParams({ page: page.toString() });

  Object.entries(paramsPayload).forEach(([key, value]) => {
    if (typeof value === "number" && value > 0)
      params.append(key, value.toString());
    else if (value) params.append(key, value);
  });
  const response = await fetch(`${url}?${params}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return getMembersByGym(paramsPayload, gymId, page);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetMembersByGymResponse = await response.json();
  return res;
};

export const createMember = async (
  member: CreateMember
): Promise<CreateMemberResponse> => {
  const response = await fetch(`${URL_API}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return createMember(member);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: CreateMemberResponse = await response.json();
  return res;
};

export const updateMember = async (
  id: number,
  member: CreateMember
): Promise<CreateMemberResponse> => {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return updateMember(id, member);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    console.log(error);
    throw error;
  }
  const res: CreateMemberResponse = await response.json();
  return res;
};

export const deleteMember = async (
  id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return deleteMember(id);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: { message: string } = await response.json();
  return res;
};

export const registerToTournament = async ({
  id_member,
  id_tournament,
}: RegisterToTournamentData): Promise<RegisterToTournamentResponse> => {
  const response = await fetch(
    `${URL_API}/${id_member}/tournament/${id_tournament}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return registerToTournament({ id_member, id_tournament });
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: RegisterToTournamentResponse = await response.json();
  return res;
};
