'use client'
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';// its imported from ['next-auth/react'] because it use in ['use client'] component
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export default function Social() {

  const onClick = (provider: 'google' | 'github')=>{
     signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
     })
  };

  return (
    <div className='flex w-full gap-2'>
        <Button 
          className='w-full' 
          variant={'outline'}
          onClick={()=> onClick('google')}
          >
           <FcGoogle className='w-5 h-5'/>
        </Button>
        <Button 
          className='w-full' 
          variant={'outline'}
          onClick={()=> onClick('github')}
        >
           <FaGithub className='w-5 h-5'/>
        </Button>
    </div>
  )
}
