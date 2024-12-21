'use server';

import { signIn } from '@/auth';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/utils/mail';
import { getUserByEmail } from '@/utils/user';
import { AuthError } from 'next-auth';
import * as z from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>): Promise<{ error?: string; success?: string; twoFactor?: boolean }> => {
    // Validate the input fields
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }

    const { email, password } = validatedFields.data;

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
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        console.log({twoFactorToken});
        
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
        );

        return { twoFactor: true}
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
