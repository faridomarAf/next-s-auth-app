import React from 'react'
import {auth, signOut} from '@/auth'
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
    const session = await auth();
    const user = JSON.stringify(session)
    console.log(user);
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-4'>
      <h1 className='text-4xl font-bold text-neutral-500'>User details which get from auth-sessioon</h1>
        <div className='flex flex-col py-5 px-9 shadow-md rounded-lg bg-slate-100 '>
          <div className='flex gap-1 text-xl font-bold text-teal-600'>
            <h2>Image:</h2>
            <h2>{session?.user?.image}</h2>
          </div>
          <div className='flex gap-1 text-xl font-bold text-teal-600'>
            <h2>Name:</h2>
            <h2>{session?.user?.name}</h2>
          </div>
          <div className='flex gap-1 text-xl font-bold text-teal-600'>
            <h2>Email:</h2>
            <h2>{session?.user?.email}</h2>
          </div>
          <div className='flex gap-1 text-xl font-bold text-teal-600'>
            <h2>Role:</h2>
            <h2>{session?.user?.role}</h2>
          </div>
          <div className='flex gap-1 text-xl font-bold text-teal-600'>
            <h2>ID:</h2>
            <h2>{session?.user?.id}</h2>
          </div>
        </div>
        <h1 className='text-lg'>{user}</h1>
        <form action={async()=>{
          "use server"
          await signOut({redirectTo:'/login'});
        }}>
          <Button type='submit'>
            Sign out
          </Button>
        </form>
    </div>
  )
}
