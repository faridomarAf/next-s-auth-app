import { db } from '@/utils/dbConfig';
import crypto from 'crypto';
import { getPasswordResetTokenByEmail } from '@/utils/password-token-reset';
import { getVirficationTokenByEmail } from '@/utils/verification-token';
import {v4 as uuidv4} from 'uuid';
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token';

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

// Generate token for password reset
export const generatePasswordResetToken = async(email: string)=>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);// it would expire in one hour
    const existingToken = await getPasswordResetTokenByEmail(email);

    if(existingToken){
        await db.passwordResetToken.delete({
            where:{id: existingToken.id}
        });
    }

    //create new paassword reset token
    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return passwordResetToken;
}


//generate two-factor-token
export const generateTwoFactorToken = async(email: string)=>{
    // create a token which is 6 digit number
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime()+ 3600 * 1000);

    //check for existingToken
    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where:{id: existingToken.id}
        })
    }

    //create new twoFactorToken
    const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email,
            token,
            expires
        }
    });

    return twoFactorToken;
}