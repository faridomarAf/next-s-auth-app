import { db } from "./dbConfig";


export const getTwoFactorConfirmationByUserId = async(userId: string)=>{
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where:{userId}
        });

        return twoFactorConfirmation;
    } catch {
        return;
    }
}