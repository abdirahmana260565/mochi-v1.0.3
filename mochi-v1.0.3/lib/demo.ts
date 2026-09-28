import { prisma } from './prisma';

export const DEMO_COMPANY_USER = '00000000-0000-0000-0000-000000000001';
export const DEMO_SEEKER_USER = '00000000-0000-0000-0000-000000000002';
export const DEMO_COMPANY = '00000000-0000-0000-0000-000000000101';

export async function ensureDemoData() {
  await prisma.user.upsert({where:{id:DEMO_COMPANY_USER}, update:{}, create:{id:DEMO_COMPANY_USER,email:'company@mochi.local',passwordHash:'demo-only',role:'COMPANY'}});
  await prisma.user.upsert({where:{id:DEMO_SEEKER_USER}, update:{}, create:{id:DEMO_SEEKER_USER,email:'seeker@mochi.local',passwordHash:'demo-only',role:'JOB_SEEKER'}});
  await prisma.company.upsert({where:{id:DEMO_COMPANY}, update:{}, create:{id:DEMO_COMPANY,ownerUserId:DEMO_COMPANY_USER,name:'PT Mochi Digital Indonesia',description:'Demo company for Mochi V0.8',industry:'Technology',verificationStatus:'VERIFIED'}});
  const count = await prisma.job.count({where:{companyId:DEMO_COMPANY}});
  if(count===0){
    await prisma.job.createMany({data:[
      {companyId:DEMO_COMPANY,title:'Senior Frontend Engineer',description:'Build polished web experiences with Next.js and TypeScript.',location:'Jakarta / Hybrid',employmentType:'Full-time',salaryMin:15000000,salaryMax:22000000,status:'PUBLISHED'},
      {companyId:DEMO_COMPANY,title:'Product Designer',description:'Design user-centered product experiences for the Mochi ecosystem.',location:'Remote — Indonesia',employmentType:'Full-time',salaryMin:10000000,salaryMax:18000000,status:'PUBLISHED'}
    ]});
  }
  return {companyId:DEMO_COMPANY,companyUserId:DEMO_COMPANY_USER,seekerUserId:DEMO_SEEKER_USER};
}
