// components/Navbar.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest('.navbar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);


  return (
    <nav className="bg-white text-black dark:bg-gray-800 dark:text-white px-4 py-3 shadow-xl fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
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
            <li className="hover:text-gray-400 flex items-center  border-b-4 border-transparent hover:border-red-700 transition duration-200">Home</li>
          </Link>
          <Link href="/about">
            <li className="hover:text-gray-400 flex items-center  border-b-4 border-transparent hover:border-red-700 transition duration-200">About</li>
          </Link>
          <Link href="/services">
            <li className="hover:text-gray-400 flex items-center  border-b-4 border-transparent hover:border-red-700 transition duration-200">Services</li>
          </Link>
          <Link href="/contact">
            <li className="hover:text-gray-400 flex items-center  border-b-4 border-transparent hover:border-red-700 transition duration-200">Contact</li>
          </Link>
        </ul>


        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none text-gray-800 dark:text-white"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16 M4 12h16 M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <ul className="absolute right-8 top-12 md:hidden bg-gray-100 text-black dark:bg-gray-800 dark:text-white ml-auto mt-2 w-6/12 flex flex-col items-start px-4 py-2 space-y-1">
          <button onClick={toggleMenu}>
            <svg
              className="absolute w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className='mx-auto font-semibold'>My Logo</div>
          <hr className="border-black w-full border" />

          <Link href="/">
            <li className="block py-2 px-4 hover:bg-gray-600 rounded">Home</li>
          </Link>
          <Link href="/about">
            <li className="block py-2 px-4 hover:bg-gray-600 rounded">About</li>
          </Link>
          <Link href="/services">
            <li className="block py-2 px-4 hover:bg-gray-600 rounded">Services</li>
          </Link>
          <Link href="/contact">
            <li className="block py-2 px-4 hover:bg-gray-600 rounded">Contact</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
