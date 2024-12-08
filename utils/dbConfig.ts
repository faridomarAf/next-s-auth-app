import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

export const db: PrismaClient = (() => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
})();;

/*
 Note: in production mode we would use just the code bellow:
 export const db = new PrismaClient();
*/