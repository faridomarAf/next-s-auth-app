'use server'

import { db } from "@/utils/dbConfig";
import { getUserByEmail } from "@/utils/user";
import { getVirficationTokenByToken } from "@/utils/verification-token"

export const newVerification = async(token: string)=>{
    
    //get the existing token
    const existingToken = await getVirficationTokenByToken(token);

    console.log('existingToken', existingToken);
    

    if(!existingToken){
        return {error:"Token does not exist!"}
    }

    //check for expiration of token
    const isExpiredToken = new Date(existingToken.expires) < new Date();// smaller than current date

    if(isExpiredToken){
        return {error: "Token has expired!"}
    }

    //find user to validate the token
    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error: "Email does not exist!"}
    }

   //update user 
   await db.user.update({
    where:{id: existingUser.id},
    data:{
        emailVerified: new Date(),
        email: existingToken.email// its use changing the email purposes, which should be don by verifying thier email
    }
   })

   // now remove token
   await db.verificationToken.delete({
    where:{id: existingToken.id}
   });

   return {success: "Email verified!"}
}