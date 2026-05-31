import env from "../config/env";
import type { LoginFormData } from "../validation/loginValidatorSchema";
import type { RegisterFormData } from "../validation/registerValidatorSchema";
import { refreshAccessToken } from "./authQueries";

const URL = `${env.URL_BACK_DEPLOY}/users`;

const toUserInfo = (
  raw: MeResponse["user"] | UserInfo
): UserInfo | null => {
  const userId = "userId" in raw ? raw.userId : raw.id;
  if (!userId || !raw.full_name || !raw.role) return null;
  return {
    userId: Number(userId),
    role: raw.role as UserRole,
    full_name: raw.full_name,
    category: raw.category ?? "",
    id_category: (raw.id_category ?? 1) as 1 | 2 | 3,
  };
};

export const login = async (data: LoginFormData) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: LoginResponse = await response.json();
  return res;
};

export const getMe = async (retry = true): Promise<UserInfo | null> => {
  const response = await fetch(`${URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if ((response.status === 401 || response.status === 403) && retry) {
    try {
      await refreshAccessToken();
      return getMe(false);
    } catch {
      return null;
    }
  }
  if (!response.ok) {
    return null;
  }
  const res: MeResponse & { userInfo?: UserInfo } = await response.json();
  const raw = res.userInfo ?? res.user;
  if (!raw) return null;
  return toUserInfo(raw);
};

export const getUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await fetch(`${URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return getUsers();
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetAllUsersResponse = await response.json();
  return res;
};

export const getOneUser = async (id: number): Promise<GetOneUserResponse> => {
  const response = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return getOneUser(id);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetOneUserResponse = await response.json();
  return res;
};

export const getUsersByRole = async (
  id: number
): Promise<GetAllUsersResponse> => {
  const response = await fetch(`${URL}/role/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return getUsersByRole(id);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: GetAllUsersResponse = await response.json();
  return res;
};

export const createUser = async (
  user: RegisterFormData
): Promise<CreateUserResponse> => {
  const response = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return createUser(user);
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: CreateUserResponse = await response.json();
  return res;
};

export const deleteUser = async (): Promise<{ message: string }> => {
  const response = await fetch(`${URL}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    await refreshAccessToken();
    return deleteUser();
  }
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  const res: { message: string } = await response.json();
  return res;
};

export const logout = async () => {
  const response = await fetch(`${URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  await response.json();
};
