// form here we are going to do the validation at front-end & backend
import * as z from 'zod';

export const LoginSchema  = z.object({
    email: z.string().email({
        message:"Email is required!"
    }),
    password: z.string().min(1,{
        message:"Password is requird!"
    })
});

export const RegisterSchema = z.object({
    name : z.string({
        message: "Name is required!"
    }),
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(6,{
        message: "minimum password 6 characters required!"
    })
})