import type { Product } from "@/types/IProduct";

export interface ICartProduct extends Product {
  quantity: number;
};

export type ICart = {
  id: number;
  userId: string;
  date: string; // ISO date string
  products: ICartProduct[];
  __v: number;
};
