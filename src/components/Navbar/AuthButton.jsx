import { useTheme } from "../../context/ThemeContext"
import { Link } from "react-router-dom"
import UserProfile from "./UserProfile"


export default function AuthButton() {
  return (
    <Link 
      to='/login'
      className='bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] text-xs sm:text-lg font-medium rounded-full px-4 py-2 sm:py-2 sm:px-6 cursor-pointer'
    >
      LOGIN
    </Link>
  )
}
