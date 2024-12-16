'use client'
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form';
import { NewPasswordSchema } from '@/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { FormError } from '../form-error';
import FormSuccess from '../form-success';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/new-password';

export default function NewPasswordForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const params = useSearchParams();
    const token = params.get('token');



    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues:{
            password:""
        }
    });


    const onSubmitHandler = async (values: z.infer<typeof NewPasswordSchema>)=>{
        startTransition(()=>{
          newPassword(values, token)
          .then((data)=>{
            setError(data?.error)
            setSuccess(data.success)
          })
        })
    }


  return (
    <CardWrapper
    headerLabel='Enter new password'
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
            name='password'
            render={({field})=>(
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder='password'
                    type='password'
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
               {isPending ? "Loading..." : "Reset password"}
            </Button>
         </form>
      </Form>
    </CardWrapper>
  )
}
