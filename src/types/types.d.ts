type ColorType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
  
interface ErrorResponse {
  error: string;
  redirect?: boolean;
}
interface Option {
  value: number;
  label: string;
}
type UserRole = "Administrador" | "Gimnasio" | "Juez";

interface UserInfo {
  userId: number;
  role: UserRole;
  full_name: string;
}
interface Params {
  full_name?: string;
  id_category: number;
  id_level: number;
  dni?: string;
  id_gym: number;
}
interface Pagination {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}