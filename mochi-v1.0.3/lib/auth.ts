import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const COOKIE = 'mochi_session';
const DAYS = 7;
const hashToken = (token:string) => crypto.createHash('sha256').update(token).digest('hex');

export async function createSession(userId:string){
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now()+DAYS*24*60*60*1000);
  await prisma.session.create({data:{tokenHash:hashToken(token),userId,expiresAt}});
  const jar = await cookies();
  jar.set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',expires:expiresAt});
}
export async function getCurrentUser(){
  const jar=await cookies(); const token=jar.get(COOKIE)?.value; if(!token) return null;
  const session=await prisma.session.findUnique({where:{tokenHash:hashToken(token)},include:{user:{include:{profile:true,company:true}}}});
  if(!session) return null;
  if(session.expiresAt<=new Date()){await prisma.session.delete({where:{id:session.id}}).catch(()=>{});return null;}
  return session.user;
}
export async function destroySession(){
  const jar=await cookies(); const token=jar.get(COOKIE)?.value;
  if(token) await prisma.session.deleteMany({where:{tokenHash:hashToken(token)}});
  jar.delete(COOKIE);
}
export async function verifyPassword(password:string,hash:string){return bcrypt.compare(password,hash)}
export async function hashPassword(password:string){return bcrypt.hash(password,12)}
