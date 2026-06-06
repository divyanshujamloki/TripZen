'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('tripzen_token');
    dispatch(logout());
    router.push('/');
  };

  const navLink = 'text-[#a1a1a6] hover:text-white text-sm transition-colors duration-200';

  return (
    <header className="fixed top-0 w-full z-50 glass-dark">
      <div className="tz-container flex h-14 sm:h-16 items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-semibold tracking-tight text-white">
          TripZen
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={navLink}>Home</Link>
          <Link href="/trips" className={navLink}>Trips</Link>
          <Link href="/contact" className={navLink}>Contact</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className={`${navLink} hidden sm:inline`}>Dashboard</Link>
              {user.role === 'admin' && (
                <Link href="/admin" className={`${navLink} hidden sm:inline`}>Admin</Link>
              )}
              <button onClick={handleLogout} className={`${navLink} hidden sm:inline`}>Logout</button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/login" className={navLink}>Login</Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-black">
          <nav className="tz-container flex flex-col py-4 gap-1">
            <Link href="/" className="py-3 text-white text-base" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/trips" className="py-3 text-white text-base" onClick={() => setIsMenuOpen(false)}>Trips</Link>
            <Link href="/contact" className="py-3 text-white text-base" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="py-3 text-[#a1a1a6] text-base" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="py-3 text-[#a1a1a6] text-base" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                )}
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="py-3 text-left text-[#a1a1a6] text-base">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="py-3 text-[#a1a1a6] text-base" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/register" className="py-3 text-white text-base font-medium" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
