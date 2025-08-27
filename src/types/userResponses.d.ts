interface User {
  id: number;
  full_name: string;
  role: string;
}
interface UserInfo {
  userId: number;
  role: UserRole;
  full_name: string;
  category: string;
  id_category: 1 | 2 | 3;
}
interface LoginResponse {
  message: string;
  userInfo: UserInfo;
}
interface GetAllUsersResponse {
  message: string;
  users: User[];
}
interface GetOneUserResponse {
  message: string;
  user: User;
}
interface CreateUserResponse {
  message: string;
  user: Omit<User, "role"> & { id_role: number };
}
