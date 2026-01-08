import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  const listings = await prisma.listing.findMany({ orderBy: { id: 'asc' } });
  console.log('Listings:');
  console.log(JSON.stringify(listings, null, 2));

  const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });
  console.log('Users:');
  console.log(JSON.stringify(users, null, 2));
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
