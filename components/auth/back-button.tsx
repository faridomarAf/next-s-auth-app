'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';

interface BackButtonPros {
    href: string,
    label: string,
}

export default function BackButton({
    href,
    label,
}: BackButtonPros) {
  return (
    <Button variant={'link'} className='w-full text-center'>
        <Link href={href}>
          {label}
        </Link>
    </Button>
  )
}
