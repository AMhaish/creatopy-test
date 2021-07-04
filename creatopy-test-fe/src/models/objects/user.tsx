export interface User {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  password?: string;

  isAuthenticated?: boolean;
  mutationLoading?: boolean;
}
export interface UserCall extends User {
  error?: any;
  status?: number;
}