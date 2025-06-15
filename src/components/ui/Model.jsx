import { Check, X } from 'lucide-react'
import React from 'react'

const Model = ({message , success , onClose}) => {
  return (
    <div className='fixed top-0 left-0  w-full h-full items-center flex justify-center backdrop-blur-[5px] '>
      <div className='relative bg-white shadow-2xl  rounded-md h-96 w-96 opacity-100 flex-col   flex items-center justify-center'>
        <div className={`p-4 ${success?"bg-green-500":"bg-red-500"}  w-fit rounded-full text-white`}>{success?<Check size={80}/>:<X size={80}/>}</div>
        <div className='text-2xl'>{success?message:"Somthing Went wrong!"}</div>
        <button onClick={onClose} className='cursor-pointer rounded-full absolute right-0 top-0 p-2 bg-gray-200'><X/></button>
      </div>
    </div>
  )
}

export default Model
