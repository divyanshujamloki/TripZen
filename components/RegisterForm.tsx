'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { apiJson } from '../lib/apiClient';
import Button from './ui/Button';

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');
    dispatch(loginStart());
    setErrorMessage('');

    try {
      const { ok, data } = await apiJson<{ message?: string; token: string; user: { role: string } }>(
        '/api/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );
      if (!ok) throw new Error(data.message || 'Registration failed');

      setStatus('success');
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      localStorage.setItem('tripzen_token', data.token);
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (error: unknown) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
      dispatch(loginFailure(error instanceof Error ? error.message : 'Registration failed'));
    }
  };

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] bg-black flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Create account</h1>
          <p className="text-[#a1a1a6] text-sm sm:text-base">Join TripZen to book group trips.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="tz-label">Full name</label>
            <input required type="text" name="fullName" value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="tz-input" placeholder="Your name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="tz-label">Email</label>
              <input required type="email" name="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="tz-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="tz-label">Phone</label>
              <input required type="tel" name="phone" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="tz-input" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div>
            <label className="tz-label">Password</label>
            <div className="relative">
              <input required type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="tz-input pr-12" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e73] hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="tz-label">Confirm password</label>
            <input required type={showPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="tz-input" placeholder="••••••••" />
          </div>

          {status === 'error' && (
            <p className="text-sm text-[#a1a1a6] border border-white/20 rounded-xl px-4 py-3">{errorMessage}</p>
          )}
          {status === 'success' && (
            <p className="text-sm text-white border border-white/20 rounded-xl px-4 py-3 flex items-center gap-2">
              <CheckCircle2 size={16} /> Account created. Redirecting...
            </p>
          )}

          <Button type="submit" disabled={status === 'loading' || status === 'success'} className="w-full mt-2">
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#a1a1a6] mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-white hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
