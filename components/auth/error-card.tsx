import React from 'react';
import { CardWrapper } from './card-wrapper'
import { MdOutlineWrongLocation } from "react-icons/md";

export function ErrorCard() {
  return (
    <CardWrapper
    headerLabel='Oops! something went wrong'
    backButtonHref='/login'
    backButtonLabel='Go back to login page'
    >
      <div className='flex w-full justify-center text-red-900'>
        <MdOutlineWrongLocation size={'30px'}/>
      </div>
    </CardWrapper>
  )
}
