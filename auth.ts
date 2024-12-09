import NextAuth  from "next-auth"
import authConfig from "./auth.config";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "./utils/dbConfig";
import { getUserById } from "./utils/user";
import { UserRole } from "@prisma/client";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
   //create session callback
   async session({session, token,user }){
    console.log({
      sessionToken: user
    });
    
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