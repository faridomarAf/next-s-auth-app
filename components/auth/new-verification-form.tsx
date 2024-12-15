'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from './card-wrapper';
import {BeatLoader} from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import FormSuccess from '../form-success';
import { FormError } from '../form-error';

export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const params = useSearchParams();

    const token = params.get('token');

    const submitHandler = useCallback(()=>{
       if(token){
        newVerification(token)
        .then((data)=>{
         setSuccess(data.success)
         setError(data.error)
        })
        .catch(()=>{
            setError("Something went worng")
        })

       } 

       setError("Missing Token")
    },[token]);

    useEffect(()=>{
        submitHandler()
    },[submitHandler]);
    
  return (
    <CardWrapper
    headerLabel='Confirm your verification'
    backButtonLabel='Back to login'
    backButtonHref='/login'
    >
       <div className='flex flex-col w-full items-center justify-center space-y-3'>
          {!success && !error && (<BeatLoader/>)}
          <FormSuccess message={success}/>
          <FormError message={error}/>
       </div>
    </CardWrapper>
  )
}
