import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ['/cart', '/checkout', '/contact', '/shop-with-sidebar'];

const isProtectedRoute = (pathname: string) => {
    const actualPath = '/' + pathname.split("/").slice(2).join('/'); 
    return protectedPaths.some((path) => actualPath.startsWith(path));
};

export default async function  middleware(request: NextRequest) {
    const response = NextResponse.next();
    const { pathname } = request.nextUrl;

    // First, run the internationalization middleware
    const intlResponse = intlMiddleware(request);
    if (intlResponse instanceof NextResponse && intlResponse.status !== 200) {
        return intlResponse;
    }


    // CREATE SUPABASE CLEINT WITH SSR
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return request.cookies.get(name)?.value;
                },
                set(name, value, options) {
                    response.cookies.set(name, value, options);
                },
                remove(name, options) {
                    response.cookies.set(name, '', { ...options, maxAge: -1 });
                },
            },
        }

    )
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const token = request.cookies.get('token')?.value;
    if (isProtectedRoute(pathname) && !token) {
        const loginUrl = new URL('/signin', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return response;
}

export const config = {
    matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
