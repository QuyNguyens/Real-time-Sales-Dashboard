export interface Product {
  _id: string;
  name: string;
  costPrice: number;
  unitPrice: number;
  type: ProductType;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductType =
  | "quần áo"
  | "thiết bị điện tử"
  | "điện thoại"
  | "giày dép"
  | "khác";

export interface ProductTypeStatsEntry {
  amount: number;
  growth: number;
}

export type ProductTypeStats = {
  [key in ProductType]?: ProductTypeStatsEntry;
};

