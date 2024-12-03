'use server'
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import { db } from '@/utils/dbConfig';
import { getUserByEmail } from '@/utils/user';


export const register = async (values: z.infer<typeof RegisterSchema>)=>{
  //check for valid field
  const validatedFields = RegisterSchema.safeParse(values);

  if(!validatedFields.success){
    return {error: "Invalid Fields!"}
    }

    const { email, password, name } = validatedFields.data;

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //check for existingUser
    const existingUser = await getUserByEmail(email);

    if(existingUser){
      return {error: "Email is already exist!"}
    }

    //create user
    await db.user.create({
      data:{
        name,
        email,
        password: hashedPassword
      }
    });

    //send verification email

    return {success: 'Success Register!'}
};