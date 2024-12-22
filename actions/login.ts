'use server';

import { signIn } from '@/auth';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { db } from '@/utils/dbConfig';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/utils/mail';
import { getTwoFactorConfirmationByUserId } from '@/utils/two-factor-conformation';
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token';
import { getUserByEmail } from '@/utils/user';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>): Promise<{ error?: string; success?: string; twoFactor?: boolean }> => {
    
    // Validate the input fields
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }
    console.log('clicccccked');
    

    const { email, password, code } = validatedFields.data;

    //find exsitingUser to login for the email-verification purposes
    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        //if user who has account by O-auth, want to login by credential method
        return {error: "Email does not exist!"}
    }

    //check if user exist, but its email not verified yet
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        // send verification email for login
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success: "Confirmation email sent!"}
    }

    // configure how to send two factore token to user email
    if(existingUser.isTwoFactorEnabled && existingUser.email){
       if(code){
         const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

         if(!twoFactorToken){
            return {error: "Invalid code!"}
         }

         if(twoFactorToken.token !== code){
            return {error: "Invalid code!"} 
         } 

         //check for expired token
         const hasExpired = new Date(twoFactorToken.expires) < new Date();

         if(hasExpired){
            return {error: "Code has expired!"}
         }

         // remove token
         await db.twoFactorToken.delete({
            where:{id: twoFactorToken.id}
         });

         const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

         if(existingConfirmation){
            await db.twoFactorConfirmation.delete({where: {id: existingConfirmation.id}})
         }

         //now create new twoFactorConfirmation
         await db.twoFactorConfirmation.create({
            data:{
                userId: existingUser.id
            }
         });
       }
       else{
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        console.log({twoFactorToken});
        
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
        );

        return { twoFactor: true}
       }
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return { success: "Login successful!" }; // Include success on successful login
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error; // Ensure unexpected errors are re-thrown
    }
};
