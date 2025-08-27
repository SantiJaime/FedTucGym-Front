import env from '../config/env';

const URL = `${env.URL_BACK_DEPLOY}/users`;

export const refreshAccessToken = async () => {
  const response = await fetch(`${URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }

  await response.json();
  return true;
};