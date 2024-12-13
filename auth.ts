import NextAuth  from "next-auth"
import authConfig from "./auth.config";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "./utils/dbConfig";
import { getUserById } from "./utils/user";
import { UserRole } from "@prisma/client";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
   
  pages :{
    signIn: '/login',
    error: '/error'
  },

  // Events are asynchronous functions that do not return a response, they are useful for audit logs / reporting or handling any other side-effects.
  events:{
    //linkAccount: Sent when an account in a given provider is linked to a user in our user database.
    async linkAccount({user}){
      // lets the verification of accounts which use the provider methods except of credential,
      await db.user.update({
        where:{id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },

  callbacks:{

   //handle verification-email for signIn 
   async signIn({user, account}){
    //Firs Allow Auth without email verification
    if(account?.provider !== "credentials") return true;

    //check email-verification for credential signIn 
    const existingUser = await getUserById(user.id);

    // if email is not verified block user from signIn
    if(!existingUser?.emailVerified) return false;

    //TODO: add 2fa check
     
    return true;// by default allow to signIn
   },

   async session({session, token }){

    if(token.sub && session.user){
      session.user.id = token.sub
    }

    if(token.role && session.user){
      session.user.role = token.role as UserRole
    }
    return session;
   },

   async jwt({token}){
    if(!token.sub) return token;// means user is loggedout

    //now find user byId
    const user = await getUserById(token.sub);// sub is the id in db
    
    if(!user) return token;

    //now asing the role for user
    token.role = user.role
   
    return token;
   } 
  },

  adapter: PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,
}) 