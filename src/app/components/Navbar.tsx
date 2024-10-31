// components/Navbar.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="text-xl font-semibold">MyLogo</a>
        </Link>

        {/* Menu items for desktop */}
        <ul className="hidden md:flex space-x-6">
          <Link href="/">
            <li className="hover:text-gray-400">Home</li>
          </Link>
          <Link href="/about">
            <li className="hover:text-gray-400">About</li>
          </Link>
          <Link href="/services">
            <li className="hover:text-gray-400">Services</li>
          </Link>
          <Link href="/contact">
            <li className="hover:text-gray-400">Contact</li>
          </Link>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none text-gray-300"
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
        <ul className="absolute right-3 top-12 md:hidden bg-gray-700 ml-auto mt-2 w-2/3 flex flex-col items-start px-4 py-2 space-y-1">
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
