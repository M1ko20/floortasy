import { updateSession } from './lib/supabase/middleware'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()
    const { pathname } = request.nextUrl
    
    if (
        request.nextUrl.pathname.startsWith('/api/') ||
        request.nextUrl.pathname.startsWith('/_next/')
    ) {
        return NextResponse.next()
    }

    const supabase = createMiddlewareClient({ req: request, res }) 
    const { data: { user } } = await supabase.auth.getUser()
    const allowedRoutes = ['/', '/sign-up', '/login'] 
    const isRouteAllowed = allowedRoutes.includes(pathname);
    
    if (!user) {
        if (isRouteAllowed) {
            await updateSession(request);
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    } else if (user && (pathname == "/login" || pathname == "/sign-up")) {
        await updateSession(request);
        return NextResponse.redirect(new URL('/fantasy', request.url))
    } else {
        await updateSession(request);
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}