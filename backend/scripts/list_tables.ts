import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  const tables: Array<{ table_schema: string; table_name: string }> = await prisma.$queryRaw`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;

  console.log('Public tables:');
  tables.forEach(t => console.log(`- ${t.table_name}`));

  for (const t of tables) {
    try {
      const countRes: any = await prisma.$queryRawUnsafe(`SELECT count(*)::int AS cnt FROM "${t.table_name}"`);
      const cnt = Array.isArray(countRes) && countRes[0] ? countRes[0].cnt : countRes.cnt;
      console.log(`${t.table_name}: ${cnt} rows`);
    } catch (e) {
      // skip if table cannot be queried directly
      const msg = (e as any)?.message ?? String(e);
      console.log(`${t.table_name}: (unable to count rows)`, msg);
    }
  }
}

main()
  .catch(e=>{ console.error(e); process.exit(1); })
  .finally(()=>prisma.$disconnect());
