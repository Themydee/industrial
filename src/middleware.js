import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
    // Only protect /admin routes (except /admin/login)
    if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
        const session = request.cookies.get('admin_session')?.value;
        const payload = session ? await decrypt(session) : null;
        
        if (!payload) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
