import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ['/cart', '/checkout', '/contact', '/shop-with-sidebar'];

const isProtectedRoute = (pathname: string) => {
    const locale = pathname.split('/')[1];
    const actualPath = '/' + pathname.split("/").slice(2).join('/'); // Skip the locale

    return protectedPaths.some((path) => actualPath.startsWith(path));
};


// rolee based authentication

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // First, run the internationalization middleware
    const intlResponse = intlMiddleware(request);
    if (intlResponse instanceof NextResponse && intlResponse.status !== 200) {
        return intlResponse;
    }

    // better store the token in the cookies, as such middleware is the server side, not client side.
    // so middleware cannot acces local storage
    const token = request.cookies.get('token')?.value;
    if (isProtectedRoute(pathname) && !token) {
        // If protected and no token, redirect to login
        const loginUrl = new URL('/signin', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Proceed with the internationalization response (or other logic if needed)
    return intlResponse;
}

export const config = {
    // Match all paths except for specific exclusions
    matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
