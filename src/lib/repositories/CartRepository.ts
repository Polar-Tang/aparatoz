// lib/repositories/cartRepository.ts
import {pool} from '@/lib/sql';
import { 
  Cart, 
  CartItem, 
  CartRow,
} from '@/types/cart-type.js';


export class CartRepository {
  // Create a new cart session with expiry
  async createCart(sessionId: string, userId: number | null = null, expiryDays: number = 10): Promise<Cart> {
    const query = `
      INSERT INTO carts (session_id, user_id, created_at, updated_at, expires_at)
      VALUES ($1, $2, NOW(), NOW(), NOW() + INTERVAL '${expiryDays} days')
      RETURNING *
    `;
    const result = await pool.query(query, [sessionId, userId]);
    const cartData = result.rows[0];
    
    return {
      ...cartData,
      items: []
    };
  }

  // Get cart by session ID (only if not expired)
  async getCartBySession(sessionId: string): Promise<Cart | null> {
    const query = `
      SELECT c.*, ci.id as item_id, ci.product_id, ci.quantity
      FROM carts c
      LEFT JOIN cart_items ci ON c.id = ci.cart_id
      WHERE c.session_id = $1 AND (c.expires_at IS NULL OR c.expires_at > NOW())
    `;
    const result = await pool.query(query, [sessionId]);
    const rows: CartRow[] = result.rows;
    
    return this.formatCartWithItems(rows);
  }

  // Add item to cart
  async addCartItem(
    cartId: number, 
    productId: number, 
    quantity: number, 
  ): Promise<CartItem> {
    const query = `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + $3
      RETURNING *
    `;
    const result = await pool.query(query, [cartId, productId, quantity]);
    return result.rows[0] as CartItem;
  }

  // Update cart item quantity
  async updateCartItem(
    cartId: number, 
    productId: number, 
    quantity: number
  ): Promise<CartItem> {
    const query = `
      UPDATE cart_items 
      SET quantity = $3, updated_at = NOW()
      WHERE cart_id = $1 AND product_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [cartId, productId, quantity]);
    return result.rows[0] as CartItem;
  }

  // Remove item from cart
  async removeCartItem(cartId: number, productId: number): Promise<CartItem> {
    const query = `
      DELETE FROM cart_items 
      WHERE cart_id = $1 AND product_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [cartId, productId]);
    return result.rows[0] as CartItem;
  }

  // Clear entire cart
  async clearCart(cartId: number): Promise<boolean> {
    const query = `DELETE FROM cart_items WHERE cart_id = $1`;
    await pool.query(query, [cartId]);
    return true;
  }

  // Update cart timestamp
  async updateCartTimestamp(cartId: number): Promise<void> {
    const query = `
      UPDATE carts 
      SET updated_at = NOW() 
      WHERE id = $1
    `;
    await pool.query(query, [cartId]);
  }

  // Helper method to format cart data
  private formatCartWithItems(rows: CartRow[]): Cart | null {
    if (!rows.length) return null;
    
    const firstRow = rows[0];
    const cart: Cart = {
      id: firstRow.id,
      session_id: firstRow.session_id,
      user_id: firstRow.user_id,
      created_at: firstRow.created_at,
      updated_at: firstRow.updated_at,
      items: []
    };

    rows.forEach(row => {
      if (row.item_id && row.product_id && row.quantity ) {
        cart.items.push({
          id: row.item_id,
          product_id: row.product_id,
          quantity: row.quantity,
        });
      }
    });

    return cart;
  }
}