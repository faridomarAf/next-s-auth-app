import NextAuth  from "next-auth"
import authConfig from "./auth.config";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "./utils/dbConfig";
import { getUserById } from "./utils/user";
import { UserRole } from "@prisma/client";
 
export const { auth, handlers, signIn, signOut } = NextAuth({

  //Events are asynchronous functions that do not return a response, they are useful for audit logs / reporting or handling any other side-effects.
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
   //create session callback
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