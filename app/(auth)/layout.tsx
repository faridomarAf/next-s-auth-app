import React from 'react'

export default function AuthLayout({children}:{children: React.ReactNode}) {

  return (
    <div className='flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-white'>
        {children}
    </div>
  )
}
