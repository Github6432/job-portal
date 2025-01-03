// components/Navbar.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ThemeToggle from './ThemeToggle';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearUser, setUser } from '@/store/user/userSlice';
import { RootState } from '@/store';

interface User {
  success: boolean;
  user: {
    name: string;
    email: string;
    phoneNumber: number;
    dob: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    role: string;
    isVerified: boolean;
    loginHistory: Array<object>;
    notificationsEnabled: boolean;
    notificationPreferences: Array<object>;
    // Add other properties as necessary
  };
}




const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const cookieData = Cookies.get('userData');
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        dispatch(setUser(parsedData));
      } catch (error) {
        console.error('Failed to parse userData from cookies', error);
      }
    }
  }, [dispatch]);
  const userData = useAppSelector((state: RootState) => state.user.userData) as User | null;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen);
  };
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible((prev) => !prev);
  };


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the navbar
      if (isOpen && !(event.target as HTMLElement).closest('.navbar')) {
        setIsOpen(false);  // Close the menu
      }
      if (dropdownVisible && !(event.target as HTMLElement).closest('.dropdown')) {
        setDropdownVisible(false); // Close the dropdown
      }
    };

    // Attach the click event listener
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Cleanup the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, dropdownVisible]);

  const handleLogout = async () => {
    console.log('loghj')
    try {
      const response = await fetch('/api/auth/logout', {method: 'POST', credentials: 'include' });
      console.log(response)
      if (response.ok) {
        dispatch(clearUser());
        Cookies.remove('userData');
        // window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  


  return (
    <nav className="px-4 bg-white bg-opacity-95 dark:bg-opacity-95 dark:bg-gray-900 py-3 shadow-xl fixed top-0 left-0 w-full z-10">
      <div className="container md:w-4/5 mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className='flex justify-center items-center space-x-3'>
          <Link href="/" legacyBehavior>
            <a className="text-xl font-semibold">MyLogo</a>
          </Link>
          <ThemeToggle />
        </div>

        {/* Menu items for desktop */}
        <ul className="hidden md:flex justify-center items-center space-x-4">
          <Link href="/">
            <li className="hover:text-gray-400 flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200">Home</li>
          </Link>
          <Link href="/about">
            <li className="hover:text-gray-400 flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200">About</li>
          </Link>
          <Link href="/services">
            <li className="hover:text-gray-400 flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200">Services</li>
          </Link>
          <Link href="/contact">
            <li className="hover:text-gray-400 flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200">Contact</li>
          </Link>
          {userData?.success ? (
            <li
              onClick={toggleDropdown}
              className="relative hover:text-gray-400 uppercase flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200 cursor-pointer"
            >
              {userData?.success ? (
                <div
                  className="relative uppercase flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200 cursor-pointer"
                >
                  <span className="flex items-center">
                    {userData?.user?.name}
                    <span className="ml-1">
                      {dropdownVisible ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </span>
                  {dropdownVisible && (
                    <ul className="absolute text-sm top-full right-0 mt-2 bg-white dark:bg-black shadow-lg border rounded-md w-40">
                      <li className="hover:bg-gray-100 px-4 py-2 border-b">
                        <Link href="/Profile">Profile</Link>
                      </li>
                      <li className="hover:bg-gray-100 px-4 py-2 border-b">
                        <Link href={`/${userData?.user?.role}/Dashboard`}>Dashboard</Link>
                      </li>
                      <li
                        className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link href="/user/login">
                  <li className="hover:text-gray-400 flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200">
                    Login
                  </li>
                </Link>
              )}
            </li>
          ) : (
            <Link href="/user/login">
              <li className="hover:text-gray-400 flex items-center border-b-4 border-transparent hover:border-red-700 transition duration-200">
                Login
              </li>
            </Link>
          )}
        </ul>
        {/* Mobile menu button */}
        <button className="md:hidden focus:outline-none " onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16 M4 12h16 M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <ul className="absolute right-8 top-12 md:hidden bg-gray-100 text-black dark:bg-gray-900 dark:text-white ml-auto mt-2 w-6/12 flex flex-col items-start px-4 py-2 space-y-1">
          <button onClick={toggleMenu}>
            <svg fill="none" className="absolute w-6 h-6" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className='mx-auto font-semibold'>My Logo</div>
          <hr className="border-black w-full border" />
          {userData?.success ?
            (<>
              <Link href="/Profile">
                <li className="block py-1 px-4 hover:bg-gray-600 rounded">Profile</li>
              </Link>
              <Link href={`/${userData?.user?.role}/Dashboard`}>
                <li className="block py-1 px-4 hover:bg-gray-600 rounded">Dashboard</li>
              </Link>
            </>
            ) : (
              <>
                <Link href="/user/register">
                  <li className="block py-1 px-4 hover:bg-gray-600 rounded">Register</li>
                </Link>
                <Link href="/user/login">
                  <li className="block py-1 px-4 hover:bg-gray-600 rounded">Login</li>
                </Link>
              </>
            )
          }
          <Link href="/">
            <li className="block py-1 px-4 hover:bg-gray-600 rounded">Home</li>
          </Link>
          <Link href="/about">
            <li className="block py-1 px-4 hover:bg-gray-600 rounded">About</li>
          </Link>
          <Link href="/services">
            <li className="block py-1 px-4 hover:bg-gray-600 rounded">Services</li>
          </Link>
          <Link href="/contact">
            <li className="block py-1 px-4 hover:bg-gray-600 rounded">Contact</li>
          </Link>
          {userData?.success && <li onClick={handleLogout} className="block py-1 px-4 hover:bg-gray-600 rounded">Logout</li>}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
