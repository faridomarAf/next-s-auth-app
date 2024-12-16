'use server'
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/utils/password-token-reset';
import { getUserByEmail } from '@/utils/user';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/utils/dbConfig';


export const newPassword = async(values: z.infer< typeof NewPasswordSchema>, token ?: string | null)=>{
    if(!token){
        return {error: 'Missing token!'}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);
    
    if(!validatedFields.success){
        return  {error: "Invalid fields"}
    }

    const {password} = validatedFields.data;

    //check for valid token
    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return {error: "Invalid token"}
    }

    //check for expired token
    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error: "Token has expired!"}
    }

    //get user to match it password for reseting the new password
    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error: "Email does not exist!"}
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update user password
    await db.user.update({
        where:{id: existingUser.id},
        data:{
            password: hashedPassword
        }
    });

    //after updateing password delet the token in db
    await db.passwordResetToken.delete({
        where:{id: existingToken.id}
    });

    return {success: "Password updated"};
}