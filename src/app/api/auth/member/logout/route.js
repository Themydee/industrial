import { clearMemberSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
    await clearMemberSession();
    return NextResponse.json({ success: true });
}
