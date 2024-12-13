import { db } from '@/utils/dbConfig';
import { getVirficationTokenByEmail } from '@/utils/verification-token';
import {v4 as uuidv4} from 'uuid';

export const generateVerificationToken = async(email: string)=>{
    // here we have to generate the actual token, for that, we should install [npm i uuid]
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);// it would expire in one hour
    
    //check for existingToken by email
    const existingToken = await getVirficationTokenByEmail(email);

    if(existingToken){
        // if there is existing token, remove it from database
        await db.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    //now we can generate new token
    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return verificationToken;
}