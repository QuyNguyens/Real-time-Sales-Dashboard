export interface User {
  _id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
