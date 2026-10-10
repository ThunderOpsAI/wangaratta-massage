import { NextResponse } from 'next/server';
import { logCallClick } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { intent, referrer } = body;
    await logCallClick(intent || 'clinic_phone_call', referrer);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
