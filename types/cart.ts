// types/cart.ts
import { Product } from "./index";

export interface CartItem extends Product {
  quantity: number;
}