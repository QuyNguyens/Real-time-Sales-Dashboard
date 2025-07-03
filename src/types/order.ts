import type { User } from "./user";

export interface OrderItem {
  _id: string;
  orderId: string;
  name: string;
  image: string;
  quantity: number;
  costPrice: number;
  unitPrice: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface SaleOverView{
  month: string;
  sales: number;
  profit: number;
  growth: number;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  status: Status;
  amount: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface OrderStatus{
  new: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface DayStat {
  count: number;
  totalAmount: number;
}

export type Weekday =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type WeeklyStatData = {
  [key in Weekday]: DayStat;
} & {
  weekTotal: number;
};

export interface OrderWeekBreakdownResponse {
  thisWeek: WeeklyStatData;
  sameWeekLastMonth: WeeklyStatData;
  sameWeekLastYear: WeeklyStatData;
}

export interface OrderStatusPayload{
  orderId: string;
  status: Status;
}

export type Status =
  "new" | "processing" | "shipped" | "delivered" | "cancelled";