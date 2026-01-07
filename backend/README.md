Backend setup

1) Install dependencies

```powershell
cd backend
npm install
```

2) Start Postgres (from repo root)

```powershell
docker-compose up -d
```

3) Generate Prisma client and run migrations

```powershell
npx prisma generate
npx prisma db push
npx prisma db seed
```

4) Run backend

```powershell
npm run dev
```
