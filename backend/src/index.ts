import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ensure uploads folder exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (err: Error | null, dest: string) => void) { cb(null, uploadsDir); },
  filename: function (req: Request, file: Express.Multer.File, cb: (err: Error | null, filename: string) => void) { cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-')); }
});
const upload = multer({ storage });

function authenticateJWT(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Unauthorized' });
  const token = parts[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = { id: decoded.userId };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.get("/api/health", (req: any, res: any) => {
  res.json({ status: "ok" });
});

// Auth: register
app.post("/api/auth/register", async (req: any, res: any) => {
  const { email, name, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, name, password: hash } });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
  // don't return password
  // @ts-ignore
  delete user.password;
  res.status(201).json({ user, token });
});

// Auth: login
app.post('/api/auth/login', async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
  // @ts-ignore
  delete user.password;
  res.json({ user, token });
});

// Listings
app.get("/api/listings", (req: any, res: any) => {
  prisma.listing.findMany({ orderBy: { createdAt: 'desc' } }).then((listings: any) => res.json(listings));
});

app.get('/api/listings/:id', async (req: any, res: any) => {
  const id = Number(req.params.id);
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ error: 'Not found' });
  res.json(listing);
});

app.post('/api/listings', async (req: any, res: any) => {
  return res.status(401).json({ error: 'Use authenticated endpoint /api/listings/create' });
});

app.post('/api/listings/create', authenticateJWT, async (req: any, res: any) => {
  const data = req.body;
  // attach agentId from token
  data.agentId = req.user.id;
  const created = await prisma.listing.create({ data });
  res.status(201).json(created);
});

app.put('/api/listings/:id', authenticateJWT, async (req: any, res: any) => {
  const id = Number(req.params.id);
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ error: 'Not found' });
  if (listing.agentId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  const updated = await prisma.listing.update({ where: { id }, data: req.body });
  res.json(updated);
});

app.delete('/api/listings/:id', authenticateJWT, async (req: any, res: any) => {
  const id = Number(req.params.id);
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ error: 'Not found' });
  if (listing.agentId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await prisma.listing.delete({ where: { id } });
  res.json({ ok: true });
});

// file upload
app.post('/api/upload', authenticateJWT, upload.single('file'), (req: any, res: any) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Users / agents
app.get('/api/users', async (req: any, res: any) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(users);
});

app.get('/api/users/:id', async (req: any, res: any) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
