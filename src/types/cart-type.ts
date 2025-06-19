// types/cart.ts
export interface Cart {
  id: number;
  session_id: string;
  user_id: number | null;
  created_at: Date;
  updated_at: Date;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
}

export interface CartWithTotals extends Cart {
  subtotal: string;
  totalItems: number;
}

export interface CartRow {
  id: number;
  session_id: string;
  user_id: number | null;
  created_at: Date;
  updated_at: Date;
  item_id: number | null;
  product_id: number | null;
  quantity: number | null;
}

export interface CreateCartParams {
  sessionId: string;
  userId?: number | null;
}

export interface AddCartItemParams {
  cartId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemParams {
  cartId: number;
  productId: number;
  quantity: number;
}