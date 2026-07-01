import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect Admin Routes
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const session = request.cookies.get('admin_session')?.value;
        const payload = session ? await decrypt(session) : null;
        
        if (!payload) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }
    
    // Protect Member Routes
    const isMemberRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/content') || 
                          pathname.startsWith('/deals') || 
                          pathname.startsWith('/events');

    if (isMemberRoute) {
        const session = request.cookies.get('member_session')?.value;
        const payload = session ? await decrypt(session) : null;

        if (!payload) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const tier = payload.tier; // Foundation, Builder, Catalyst, Vanguard

        // Access Control: Deal Board is strictly for Catalyst & Vanguard
        if (pathname.startsWith('/deals') && (tier === 'Foundation' || tier === 'Builder')) {
            return NextResponse.redirect(new URL('/dashboard?error=upgrade_required', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/content/:path*', '/deals/:path*', '/events/:path*'],
};
