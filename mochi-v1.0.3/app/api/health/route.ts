import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(){try{await prisma.$queryRaw`SELECT 1`;return NextResponse.json({ok:true,database:'connected',version:'0.8.0'});}catch(e){return NextResponse.json({ok:false,database:'disconnected',error:'DATABASE_UNAVAILABLE'},{status:503});}}
