import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '@/schemas';
import { HandleFormSubmit } from '@/utils/handleFormSubmit';
import { register } from '@/actions/register';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardWrapper } from './card-wrapper';
import { useState, useTransition } from 'react';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import FormSuccess from '../form-success';

export default function RegisterForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    });

    const submitHandler = async (values: z.infer<typeof RegisterSchema>)=>{
        HandleFormSubmit(values,{action:register, setError, setSuccess})
    };

  return (
    <CardWrapper
    headerLabel='Create an account'
    backButtonLabel='Already have an account!'
    backButtonHref='/login'
    showSocial
    >
    <Form {...form}>
      <form
      className='flex flex-col space-y-6'
      onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className='space-y-4'>
          <FormField
          control={form.control}
          name='name'
          render={({field})=>(
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder='Name'
                    type='text'
                    />
                </FormControl>
                <FormMessage/>
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name='email'
          render={({field})=>(
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                    {...field}
                    placeholder='Email'
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
                    placeholder='Password'
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
        <Button
        type='submit'
        className='w-full'
        >
            Register
        </Button>
      </form>
    </Form>
    </CardWrapper>
  )
}
