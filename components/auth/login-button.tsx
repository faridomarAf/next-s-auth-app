'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
    children: React.ReactNode,
    mode?: 'model' | 'redirect',
    asChild?: boolean,
}

export function  LoginButton({
    children,
    mode = 'redirect',
    asChild
}:LoginButtonProps) {
    const router = useRouter();

    if(mode === 'model'){
        return (
            <p className='text-xl font-bold text-yellow-50'>
                TODO: template model
            </p>
        )
    }
  
    const onClick = ()=>{
        router.push('/login')
    }

  return (
    <span 
    className='cursor-pointer'
    onClick={onClick}
    >
        {children}
    </span>
  )
}
