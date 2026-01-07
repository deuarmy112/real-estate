import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check(){
  const users = await prisma.user.count();
  const listings = await prisma.listing.count();
  console.log(`users:${users} listings:${listings}`);
}

check().catch(e=>{console.error(e); process.exit(1)}).finally(()=>prisma.$disconnect());
