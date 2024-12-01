import React from 'react'

interface HeaderProps {
    label: string,
}

export function Header({label}: HeaderProps) {
  return (
    <div className='flex flex-col items-center space-y-1'>
        <h1 className='text-slate-500 font-bold'>🔐 Auth</h1>
        <p className='text-slate-500 font-semibold'>
            {label}
        </p>
    </div>
  )
}
