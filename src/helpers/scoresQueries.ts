import env from "../config/env";
import { refreshAccessToken } from "./authQueries";

const URL = `${env.URL_BACK_DEPLOY}/puntajes`;
const T_URL = `${env.URL_BACK_DEPLOY}/tournaments`;

export const redirectToGoogleSheets = async (id: number): Promise<{ scriptUrl: string }> => {
  const response = await fetch(`${T_URL}/${id}/sheets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return redirectToGoogleSheets(id);
  }
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const res: { scriptUrl: string } = await response.json();
  return res;
}

export const getScoresByLevelAndCategory = async (
  { id_category, id_level, id_tournament }: FilterScoresData,
  page: number
): Promise<GetScoresByLevelAndCategoryResponse> => {
  const response = await fetch(
    `${URL}/tournament/${id_tournament}/category/${id_category}/level/${id_level}?page=${page}`,
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
    return getScoresByLevelAndCategory({
      id_category,
      id_level,
      id_tournament,
    }, page);
  }
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const res: GetScoresByLevelAndCategoryResponse = await response.json();
  return res;
};
export const getScoresByLevelCategoryAndGym = async (
  { id_category, id_level, id_tournament, id_gym }: FilterScoresData,
  page: number
): Promise<GetScoresByLevelAndCategoryResponse> => {
  const response = await fetch(
    `${URL}/tournament/${id_tournament}/category/${id_category}/level/${id_level}/gym/${id_gym}?page=${page}`,
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
    return getScoresByLevelCategoryAndGym(
      {
        id_category,
        id_level,
        id_tournament,
        id_gym,
      },
      page
    );
  }
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const res: GetScoresByLevelAndCategoryResponse = await response.json();
  return res;
};

export const createScore = async (
  data: CreateScoreData
): Promise<CreateScoreResponse> => {
  const response = await fetch(
    `${URL}/${data.id_member}/tournament/${data.id_tournament}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ puntaje: data.puntaje }),
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return createScore(data);
  }
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const res: CreateScoreResponse = await response.json();
  return res;
};
