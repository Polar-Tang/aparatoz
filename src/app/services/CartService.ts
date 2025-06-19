// services/cartService.ts
import { CartRepository } from '@/lib/repositories/CartRepository';
import { Cart, CartItem } from '@/types/cart-type.js';
import { randomUUID } from 'crypto'

export class CartService {
    private cartRepository: CartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async getCart(sessionId: string): Promise<Cart | null> {
        const cart = await this.cartRepository.getCartBySession(sessionId);

        if (!cart) {
            return null
        }

        return cart;
    }

    // Get or create cart for session
    async getOrCreateCart(sessionId: string, userId?: number | null): Promise<Cart> {
        let cart = await this.cartRepository.getCartBySession(sessionId);

        if (!cart) {
            cart = await this.cartRepository.createCart(sessionId, userId || null);
        }

        return cart;
    }

    // Add item to cart
    async addToCart(
        sessionId: string,
        productId: number,
        quantity: number,
    ): Promise<CartItem> {
        const cart = await this.getOrCreateCart(sessionId);

        const cartItem = await this.cartRepository.addCartItem(
            cart.id,
            productId,
            quantity,
            
        );

        await this.cartRepository.updateCartTimestamp(cart.id);

        return cartItem;
    }

    // Update item quantity
    async updateCartItem(
        sessionId: string,
        productId: number,
        quantity: number
    ): Promise<CartItem> {
        const cart = await this.getOrCreateCart(sessionId);

        if (quantity <= 0) {
            return await this.cartRepository.removeCartItem(cart.id, productId);
        }

        const updatedItem = await this.cartRepository.updateCartItem(
            cart.id,
            productId,
            quantity
        );

        await this.cartRepository.updateCartTimestamp(cart.id);

        return updatedItem;
    }

    // Remove item from cart
    async removeFromCart(sessionId: string, productId: number): Promise<CartItem> {
        const cart = await this.getOrCreateCart(sessionId);
        const removedItem = await this.cartRepository.removeCartItem(cart.id, productId);
        await this.cartRepository.updateCartTimestamp(cart.id);
        return removedItem;
    }

    // // Get cart with calculated totals
    // async getCartWithTotals(sessionId: string): Promise<CartWithTotals> {
    //     const cart = await this.getOrCreateCart(sessionId);

    //     if (!cart.items.length) {
    //         return {
    //             ...cart,
    //             subtotal: '0.00',
    //             totalItems: 0
    //         };
    //     }

    //     // const subtotal = cart.items.reduce((sum: number, item: CartItem) => {
    //     //     return sum + (parseFloat(item.price) * item.quantity);
    //     // }, 0);

    //     const totalItems = cart.items.reduce((sum: number, item: CartItem) => {
    //         return sum + item.quantity;
    //     }, 0);

    //     return {
    //         ...cart,
    //         subtotal: subtotal.toFixed(2),
    //         totalItems
    //     };
    // }

    // Clear cart
    async clearCart(sessionId: string): Promise<boolean> {
        const cart = await this.getOrCreateCart(sessionId);
        await this.cartRepository.clearCart(cart.id);
        return true;
    }

    // Generate session ID for new users
    generateSessionId(): string {
        return randomUUID();
    }

    // Get cart items count
    async getCartItemsCount(sessionId: string): Promise<number> {
        const cart = await this.getOrCreateCart(sessionId);
        return cart.items.reduce((sum: number, item: CartItem) => {
            return sum + item.quantity;
        }, 0);
    }

    // Check if product exists in cart
    async isProductInCart(sessionId: string, productId: number): Promise<boolean> {
        const cart = await this.getOrCreateCart(sessionId);
        return cart.items.some((item: CartItem) => item.product_id === productId);
    }

    // Get specific cart item
    async getCartItem(sessionId: string, productId: number): Promise<CartItem | null> {
        const cart = await this.getOrCreateCart(sessionId);
        const item = cart.items.find((item: CartItem) => item.product_id === productId);
        return item || null;
    }
}