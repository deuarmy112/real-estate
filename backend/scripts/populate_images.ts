import 'dotenv/config';
import prisma from '../src/db';

async function main() {
  const sampleImages = [
    'https://images.unsplash.com/photo-1560185127-6c4c0f9f1f4b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3',
    'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4'
  ];

  const listings = await prisma.listing.findMany();
  console.log(`Found ${listings.length} listings`);

  let updated = 0;
  for (let i = 0; i < listings.length; i++) {
    const l = listings[i];
    if (!l.images || l.images.length === 0) {
      const imagesForThis = [sampleImages[i % sampleImages.length]];
      await prisma.listing.update({
        where: { id: l.id },
        data: { images: imagesForThis }
      });
      updated++;
      console.log(`Updated listing ${l.id} with ${imagesForThis.length} image(s)`);
    } else {
      console.log(`Listing ${l.id} already has ${l.images.length} image(s)`);
    }
  }

  console.log(`Done. Updated ${updated} listing(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
