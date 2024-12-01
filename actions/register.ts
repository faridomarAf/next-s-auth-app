'use server'
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';


export const register = async (values: z.infer<typeof RegisterSchema>)=>{
  //check for valid field
  const validatedFields = RegisterSchema.safeParse(values);

  if(!validatedFields.success){
    return {error: "Invalid Fields!"}
    }

    return {success: 'Success Register!'}
};