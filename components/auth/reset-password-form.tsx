'use client'
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form';
import { ResetSchema } from '@/schemas';
import { HandleFormSubmit } from '@/utils/handleFormSubmit';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { FormError } from '../form-error';
import FormSuccess from '../form-success';
import { Button } from '../ui/button';

export default function ResetPasswordForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues:{
            email:""
        }
    });


    const onSubmitHandler = async (values: z.infer<typeof ResetSchema>)=>{
        setError("");
        setSuccess("");

        console.log(values);
        
        startTransition(()=>{
            HandleFormSubmit(values, {action:reset, setError, setSuccess})
        })
    }


  return (
    <CardWrapper
    headerLabel='Forgot password'
    backButtonLabel='Back to login'
    backButtonHref='/login'
    >
      <Form {...form}>
         <form 
         onSubmit={form.handleSubmit(onSubmitHandler)}
         className='flex flex-col space-y-6'
         >
           <div className='space-y-4'>
            <FormField
            control={form.control}
            name='email'
            render={({field})=>(
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder='email'
                    type='email'
                    />
                </FormControl>
                <FormMessage/>
            </FormItem>
            )}
            />
           </div>
           <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button disabled={isPending} className='w-full' type='submit'>
               {isPending ? "Loading..." : "Send reset email"}
            </Button>
         </form>
      </Form>
    </CardWrapper>
  )
}
