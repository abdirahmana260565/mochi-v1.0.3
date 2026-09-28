import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureDemoData, DEMO_COMPANY } from '@/lib/demo';
export async function GET(){await ensureDemoData();const company=await prisma.company.findUnique({where:{id:DEMO_COMPANY}});const jobs=await prisma.job.findMany({where:{companyId:DEMO_COMPANY},include:{_count:{select:{applications:true}}},orderBy:{createdAt:'desc'}});const totalApplicants=await prisma.application.count({where:{job:{companyId:DEMO_COMPANY}}});const interviews=await prisma.application.count({where:{job:{companyId:DEMO_COMPANY},status:'INTERVIEW'}});return NextResponse.json({company,jobs,stats:{activeJobs:jobs.filter(j => j.status === 'PUBLISHED').length,totalApplicants,interviews}});}
