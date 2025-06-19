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
            maxAge: 10 * 24 * 60 * 60, // 10 days in seconds
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
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

export async function DELETE(req: NextRequest) {
    try {
        const body: AddToCartRequest = await req.json();
        const { productId } = body;

        if (!productId) {
            return NextResponse.json<ApiResponse>(
                { error: 'Missing required fields: productId' },
                { status: 400 }
            );
        }

        if (typeof productId !== 'number') {
            return NextResponse.json<ApiResponse>(
                { error: 'Invalid field types. productId, and price must be numbers' },
                { status: 400 }
            );
        }


        const cartService = new CartService()
        const cookieStore = await cookies();
        let sessionId = cookieStore.get('cart_session')?.value;

        if (!sessionId) {

            const response = NextResponse.json<ApiResponse>(
                {
                    success: false,
                    item: {}
                },
                { status: 400 }
            );
            return response;
        }

        const cartItem = await cartService.removeFromCart(
            sessionId,
            productId,
        );

        const response = NextResponse.json<ApiResponse>({
            success: true,
            item: cartItem
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

export async function GET() {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get('cart_session')?.value;

    if (!sessionId) {

        const response = NextResponse.json<ApiResponse>(
            {
                success: false,
                item: {}
            },
            { status: 404 }
        );
        return response;
    }
    const cartService = new CartService()
    const sessionCart = await cartService.getCart(sessionId)
    console.log("sessionCart", sessionCart)
    if (!sessionCart) {

        const response = NextResponse.json<ApiResponse>(
            {
                success: false,
                item: {}
            },
            { status: 404 }
        );
        return response;
    }
     const response = NextResponse.json<ApiResponse>(
            {
                success: true,
                item: sessionCart.items
            },
            { status: 200 }
    );
    return response
}