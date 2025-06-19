import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { CartService } from '@/app/services/CartService';

interface AddToCartRequest {
    productId: number;
    quantity: number;

}

interface ApiResponse<T = unknown> {
    success?: boolean;
    error?: string;
    cart?: T;
    item?: T;
    message?: string;
}
export async function POST(req: NextRequest) {
    try {
        const body: AddToCartRequest = await req.json();
        const { productId, quantity } = body;

        if (!productId || !quantity) {
            return NextResponse.json<ApiResponse>(
                { error: 'Missing required fields: productId, quantity' },
                { status: 400 }
            );
        }

        // Validate types
        if (typeof productId !== 'number' || typeof quantity !== 'number') {
            return NextResponse.json<ApiResponse>(
                { error: 'Invalid field types. productId, quantity, and price must be numbers' },
                { status: 400 }
            );
        }

        if (quantity <= 0) {
            return NextResponse.json<ApiResponse>(
                { error: 'Quantity must be greater than 0' },
                { status: 400 }
            );
        }
        const cartService = new CartService()
        const cookieStore = await cookies();
        let sessionId = cookieStore.get('cart_session')?.value;

        if (!sessionId) {
            sessionId = cartService.generateSessionId();
        }

        const cartItem = await cartService.addToCart(
            sessionId,
            productId,
            quantity,
        );

        const response = NextResponse.json<ApiResponse>({
            success: true,
            item: cartItem
        });

        // Set/update cookie
        response.cookies.set('cart_session', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60
        });
        return response;

    } catch (error) {
        console.error('Add to cart error:', error);
        return NextResponse.json<ApiResponse>(
            { error: 'Failed to add item to cart' },
            { status: 500 }
        );
    }
}