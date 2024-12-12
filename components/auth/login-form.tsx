'use client'
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';

import { 
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem
 } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import FormSuccess from '../form-success';
import { login } from '@/actions/login';
import { HandleFormSubmit } from '@/utils/handleFormSubmit';
import { useSearchParams } from 'next/navigation';


export default function LoginForm() {
    const params = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    //handl the error in case user try to use one email with different providers
    const urlError = params.get('error') === 'OAuthAccountNotLinked'?
    "Email is already in use" : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    });

    const submitHandler = async (values: z.infer<typeof LoginSchema>)=>{
          startTransition(()=>{
          HandleFormSubmit(values,{action:login, setError, setSuccess});
        })
    };

  return (
    <CardWrapper
    headerLabel='Welcome back'
    backButtonLabel='Dont have an account?'
    backButtonHref='/register'
    showSocial
    >
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(submitHandler)}
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
                <FormError message={error || urlError}/>
                <FormSuccess message={success}/>
                <Button disabled={isPending} className='w-full' type='submit'>
                   {isPending ? "Loading..." : "Login"}
                </Button>
            </form> 
        </Form>
    </CardWrapper>
  )
}
