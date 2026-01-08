import 'dotenv/config';
import prisma from '../src/db';

async function main() {
  const updates = [
    { title: 'Sunny Lakefront Villa', video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { title: 'Downtown Loft with City Views', video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
    { title: 'Cozy Mountain Cabin', video: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }
  ];

  for (const u of updates) {
    const l = await prisma.listing.findFirst({ where: { title: u.title } });
    if (!l) {
      console.log(`Listing not found: ${u.title}`);
      continue;
    }
    await prisma.listing.update({ where: { id: l.id }, data: { video: u.video } });
    console.log(`Updated ${u.title} with video`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
