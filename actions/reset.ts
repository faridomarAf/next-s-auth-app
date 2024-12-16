'use server'
import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/utils/user';
import * as z from 'zod'

export const reset = async(values: z.infer<typeof ResetSchema>)=>{
   const isValidField = ResetSchema.safeParse(values);

   if(!isValidField.success){
      return {error: "Invalid email!"}
   }

   const { email } = isValidField.data;

   //find user
   const existingUser = await getUserByEmail(email);

   if(!existingUser){
     return {erorr: "Email not found"} 
   }

   //TODO

   return {susccess: "Reset email send!"}
}