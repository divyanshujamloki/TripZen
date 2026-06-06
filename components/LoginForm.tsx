'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import Button from './ui/Button';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    dispatch(loginStart());
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      localStorage.setItem('tripzen_token', data.token);
      router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error: unknown) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
      dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
  };

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] bg-black flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Sign in</h1>
          <p className="text-[#a1a1a6] text-sm sm:text-base">Access your bookings and trip details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="tz-label">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="tz-input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="tz-label">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="tz-input pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e73] hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {status === 'error' && (
            <p className="text-sm text-[#a1a1a6] border border-white/20 rounded-xl px-4 py-3">{errorMessage}</p>
          )}

          <Button type="submit" disabled={status === 'loading'} className="w-full mt-2">
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#a1a1a6] mt-8">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-white hover:underline">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
