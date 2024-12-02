import {PrismaClient} from '@prisma/client';

declare global {
    var prisma : PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;

/*
 Note: in production mode we would use just the code bellow:
 export const db = new PrismaClient();
*/