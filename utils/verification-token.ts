import { db } from "./dbConfig";

export const getVirficationTokenByEmail = async (email: string)=>{
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where:{email}
        });

        return verificationToken;
    } catch {
        return null;
    }
}

export const getVirficationTokenByToken = async (token: string)=>{
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where:{token}
        });

        return verificationToken;
    } catch {
        return null;
    }
}