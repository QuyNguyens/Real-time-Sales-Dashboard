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
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  amount: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatus{
  new: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

