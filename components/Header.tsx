'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="fixed top-0 w-full z-50 glass-dark">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          LuxTravel
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
          <Link href="/destinations" className="text-white hover:text-gray-300 transition-colors">Destinations</Link>
          <Link href="/tours" className="text-white hover:text-gray-300 transition-colors">Tours</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition-colors">About</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</Link>
          {/* <Link href="/blog" className="text-white hover:text-gray-300 transition-colors">Blog</Link> */}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/dashboard" className="text-white hover:text-gray-300">
              <User size={24} />
            </Link>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link href="/login" className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-dark mt-4 mx-4 rounded-lg">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/" className="text-white hover:text-gray-300">Home</Link>
            <Link href="/destinations" className="text-white hover:text-gray-300">Destinations</Link>
            <Link href="/tours" className="text-white hover:text-gray-300">Tours</Link>
            <Link href="/about" className="text-white hover:text-gray-300">About</Link>
            <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
            {/* <Link href="/blog" className="text-white hover:text-gray-300">Blog</Link> */}
            {!user && (
              <>
                <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
                <Link href="/register" className="text-white hover:text-gray-300">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;