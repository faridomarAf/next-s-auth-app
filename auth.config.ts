import type { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./utils/user";
import bcrypt from 'bcryptjs';
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

 
export default {
     providers: [
      //login with github
      Github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      }),
      
      //login with google
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),

      //login with credentials
      Credentials({
         
         async authorize(credentials){
            //check for valid fields
            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email, password} = validatedFields.data;
                const user = await getUserByEmail(email);
                if(!user || !user.password){
                    // [!user.password, means if user created account with social accounts and they want to login with credential logins, in this case they should not allowed! ]
                    return null;
                }; 

                // now after providing email and password, check for valid password
                const isValidPassword = await bcrypt.compare(password, user.password);

                if(isValidPassword){
                    return user;
                }
            };

            return null;
         }     
      })   
     ] 
} satisfies NextAuthConfig