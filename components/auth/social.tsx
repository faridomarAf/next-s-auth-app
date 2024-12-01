'use client'
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';
import { Button } from '../ui/button';

export default function Social() {
  return (
    <div className='flex w-full gap-2'>
        <Button className='w-full' variant={'outline'}>
           <FcGoogle className='w-5 h-5'/>
        </Button>
        <Button className='w-full' variant={'outline'}>
           <FaGithub className='w-5 h-5'/>
        </Button>
    </div>
  )
}
