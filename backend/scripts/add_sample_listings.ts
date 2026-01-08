import 'dotenv/config';
import prisma from '../src/db';

async function main() {
  const samples = [
    {
      title: 'Sunny Lakefront Villa',
      description: 'Spacious 4BR villa with private dock and panoramic lake views.',
      price: 895000,
      address: '101 Lakeview Drive',
      images: [
        'https://images.unsplash.com/photo-1505691723518-36a3f1d9a1d4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2'
      ],
      agentId: 1
    },
    {
      title: 'Downtown Loft with City Views',
      description: 'Modern 2BR loft in the heart of downtown, close to transit and restaurants.',
      price: 450000,
      address: '22 Central Ave, Apt 8',
      images: [
        'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'
      ],
      agentId: 2
    },
    {
      title: 'Suburban Family Home',
      description: '5BR family home with large yard and finished basement.',
      price: 380000,
      address: '456 Maple Street',
      images: [
        'https://images.unsplash.com/photo-1572120360610-d971b9b9f1a5?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4'
      ],
      agentId: 1
    },
    {
      title: 'Cozy Mountain Cabin',
      description: 'Two-bedroom cabin near hiking trails — perfect weekend retreat.',
      price: 220000,
      address: '7 Pine Ridge',
      images: [
        'https://images.unsplash.com/photo-1505691723518-36a3f1d9a1d4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5'
      ],
      agentId: 2
    }
  ];

  try {
    const res = await prisma.listing.createMany({ data: samples as any[], skipDuplicates: true });
    console.log(`createMany result: ${JSON.stringify(res)}`);
  } catch (err) {
    console.error('createMany failed, falling back to individual upserts', err);
    for (const s of samples) {
      const existing = await prisma.listing.findFirst({ where: { title: s.title } });
      if (existing) {
        console.log(`Already exists: ${s.title} (id=${existing.id})`);
        continue;
      }
      const created = await prisma.listing.create({ data: s as any });
      console.log(`Created listing ${created.id}: ${created.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
