import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const response = NextResponse.next();

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
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
    return response;
}

export const config = {
    matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
