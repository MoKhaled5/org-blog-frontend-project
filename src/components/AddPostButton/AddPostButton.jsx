import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';


export default function AddPostButton() {
  const { user } = useAuth();

  return (
    <Link
      to={user ? "/addpost" : "/login"} 
      className='bg-[#6941C6] dark:bg-[#9F76FF] transition-transform hover:scale-125 w-15 aspect-square flex justify-center items-center rounded-full fixed bottom-10 right-10 cursor-pointer'
    >
      <svg className='w-6' xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 31 31">
          <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M15.5 3v25M28 15.5H3"></path>
      </svg>
    </Link>
  )
}
