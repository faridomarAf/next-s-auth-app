import { FaCheck } from "react-icons/fa";
interface FormSuccessProps {
    message?: string
};

export default function FormSuccess({message}:FormSuccessProps) {
    if(!message) return null;


  return (
    <div className='bg-blue-400 p-2 rounded-md flex items-center gap-x-2 text-sm text-white'>
      <FaCheck className='h-4 w-4'/>
      <p>
        {message}
      </p> 
    </div>
  )
}
