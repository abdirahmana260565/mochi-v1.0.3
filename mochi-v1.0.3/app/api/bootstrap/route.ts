import { NextResponse } from 'next/server'; import { ensureDemoData } from '@/lib/demo';
export async function POST(){const data=await ensureDemoData();return NextResponse.json({ok:true,...data});}
