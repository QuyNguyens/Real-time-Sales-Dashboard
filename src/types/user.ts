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

export interface TopUser {
  _id: string;
  amount: number;
  total: number;    
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}
