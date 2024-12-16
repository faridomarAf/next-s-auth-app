'use server'
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from '@/schemas'
import { sendPasswordResetEmail } from '@/utils/mail';
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

   const passwordResetToken = await generatePasswordResetToken(email);

   await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
   );

   return {success: "Reset email send!"}
}