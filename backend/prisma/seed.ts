import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  await prisma.user.createMany({
    data: [
      { id: 1, email: 'alice@example.com', name: 'Alice Agent', password: 'changeme' },
      { id: 2, email: 'bob@example.com', name: 'Bob Broker', password: 'changeme' }
    ],
    skipDuplicates: true
  });

  await prisma.listing.createMany({
    data: [
      { id: 1, title: 'Cozy 2BR Cottage', description: 'A charming cottage near the river.', price: 175000, address: '12 Oak Street', images: [], agentId:1 },
      { id: 2, title: 'Modern Apartment', description: 'Bright 1BR in the city center.', price: 210000, address: '88 Market Ave', images: [], agentId:2 }
    ],
    skipDuplicates: true
  });
}

main()
  .catch(e=>{console.error(e); process.exit(1)})
  .finally(()=>prisma.$disconnect());
