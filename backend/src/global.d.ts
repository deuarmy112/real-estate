declare module 'express';
declare module 'cors';
declare module 'dotenv';
declare module 'bcrypt';
declare module 'jsonwebtoken';
declare module '@prisma/client';

declare const process: any;

interface NodeRequire {
  (id: string): any;
}
