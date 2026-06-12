'use client';

import { useState, FormEvent, FocusEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { apiJson } from '../lib/apiClient';
import {
  FieldErrors,
  LoginFormData,
  validateEmail,
  validateLoginForm,
  validateLoginPassword,
} from '../lib/validation';
import Button from './ui/Button';
import FieldError, { FormErrorAlert, inputErrorClass, labelErrorClass } from './ui/FieldError';

type LoginField = keyof LoginFormData;

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<LoginField>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validators: Record<LoginField, (value: string) => string | undefined> = {
    email: validateEmail,
    password: validateLoginPassword,
  };

  const updateField = (field: LoginField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: LoginField) => (e: FocusEvent<HTMLInputElement>) => {
    const error = validators[field](e.target.value);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateLoginForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      setErrorMessage('Please fix the errors below.');
      return;
    }

    setStatus('loading');
    dispatch(loginStart());
    setErrorMessage('');
    setFieldErrors({});

    try {
      const { ok, data } = await apiJson<{ message?: string; token: string; user: { role: string } }>(
        '/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );
      if (!ok) throw new Error(data.message || 'Login failed');

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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className={`tz-label ${labelErrorClass(!!fieldErrors.email)}`} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              onBlur={handleBlur('email')}
              className={`tz-input ${inputErrorClass(!!fieldErrors.email)}`}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
            />
            <FieldError message={fieldErrors.email} />
          </div>

          <div>
            <label className={`tz-label ${labelErrorClass(!!fieldErrors.password)}`} htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                onBlur={handleBlur('password')}
                className={`tz-input pr-12 ${inputErrorClass(!!fieldErrors.password)}`}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={!!fieldErrors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e73] hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <FieldError message={fieldErrors.password} />
          </div>

          {status === 'error' && errorMessage && <FormErrorAlert message={errorMessage} />}

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
