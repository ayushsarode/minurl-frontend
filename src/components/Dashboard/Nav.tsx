import { useState } from "react";
import {useAuthStore} from "../../store/authStore"
import {useNavigate} from "react-router-dom"

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();
  const {user}  = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="border-gray-200 dark:bg-gray-900 ml-[20rem] bg-white shadow-md h-23 max-w-full ">
      <div className=" flex  items-center justify-between mx-auto p-7">
        {/* Logo */}
        <a href="#" className="flex items-center  rtl:space-x-reverse">
          <h1></h1>
          <span className="self-center text-lg lg:text-xl font-semibold whitespace-nowrap xl:text-2xl dark:text-white">
            Welcome! {user?.name}
          </span>
        </a>

        {/* Profile & Mobile Menu Button */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Profile Dropdown */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="User"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-4 z-50 mt-65 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user?.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2">
      <li>
        <a
          href="/setting"
          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Settings
        </a>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Sign out
        </button>
      </li>
    </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;