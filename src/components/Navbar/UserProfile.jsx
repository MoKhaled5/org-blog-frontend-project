import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className='flex items-center gap-2'>
      <div className='flex flex-col items-end justify-center gap-0'>
        <span className='block w-fit relative top-1'>Hello</span>
        <span className='block w-fit font-semibold text-lg relative bottom-1'>

          {user && user.username
            ? user.username.length > 8
              ? `${user.username.slice(0, 8)}...`
              : user.username
            : 'Guest'}
        </span>
      </div>
      <svg
        className='w-[40px] border-2 border-[#1A1A1A] dark:border-white rounded-full p-[2px]'
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
      >

        <path
          className='fill-[#1A1A1A] dark:fill-white'
          fillOpacity="0.1"
          d="M50 26.868c-.095 5.093-2.57 10.994-7.425 15.873-.476.476-.476.476-.714-.166-2.427-6.593-7.068-10.686-13.993-11.9-7.258-1.285-14.517 2.19-18.277 8.758a16 16 0 0 0-1.428 3.26c-.143.429-.262.5-.619.167-3.76-3.712-6.187-8.187-7.115-13.398-.928-5.117-.31-10.09 1.88-14.826Q5.808 7.103 13.089 3.07C17.326.714 21.92-.334 26.726.095c8.972.761 15.73 5.14 20.18 12.946 2.119 3.712 3.094 7.758 3.07 13.827zm-25.035 1.57c5.473.096 10.661-4.26 10.661-10.614 0-6.306-5.14-10.59-10.566-10.614-5.426 0-10.662 4.237-10.662 10.638 0 6.283 5.14 10.638 10.567 10.59"
        ></path>
        <path
          className='fill-[#1A1A1A] dark:fill-white'
          d="M24.108 50c-4.022 0-8.544-1.356-12.685-4.022-.404-.262-.476-.5-.38-.952 1.285-5.807 6.235-10.328 12.113-11.042 7.33-.904 13.993 3.712 15.754 10.852.143.595.048.928-.5 1.261C34.293 48.667 29.82 50 24.084 50zM17.849 17.825c0-3.974 3.236-7.187 7.187-7.187s7.14 3.236 7.14 7.21c0 3.975-3.237 7.188-7.188 7.188s-7.14-3.237-7.14-7.211"
        ></path>
      </svg>
    </div>
  );
}