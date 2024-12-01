'use server'
import { LoginSchema } from '@/schemas';
import * as z from 'zod';

export const login  = async (values: z.infer<typeof LoginSchema>)=>{
    // check for valid-fields
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid Fields!"}
    }

    return {success: 'Success Login!'}
}