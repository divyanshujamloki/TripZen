'use client';

import { useState, FormEvent, FocusEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { apiJson } from '../lib/apiClient';
import {
  FieldErrors,
  SignupFormData,
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateSignupForm,
} from '../lib/validation';
import Button from './ui/Button';
import FieldError, { FormErrorAlert, inputErrorClass, labelErrorClass } from './ui/FieldError';

type SignupField = keyof SignupFormData;

const PASSWORD_HINT =
  'At least 8 characters with uppercase, lowercase, number, and special character.';

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<SignupField>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validators: Record<SignupField, (value: string) => string | undefined> = {
    fullName: validateName,
    email: validateEmail,
    phone: (value) => validatePhone(value, true),
    password: validatePassword,
    confirmPassword: (value) => validateConfirmPassword(formData.password, value),
  };

  const updateField = (field: SignupField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (field === 'password' && fieldErrors.confirmPassword && formData.confirmPassword) {
      const confirmError = validateConfirmPassword(value, formData.confirmPassword);
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const validateField = (field: SignupField, value: string) => {
    const error = validators[field](value);
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
    return !error;
  };

  const handleBlur = (field: SignupField) => (e: FocusEvent<HTMLInputElement>) => {
    validateField(field, e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateSignupForm(formData);
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

    const phone = formData.phone.trim();

    try {
      const { ok, data } = await apiJson<{ message?: string; token: string; user: { role: string } }>(
        '/api/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            ...(phone ? { phone } : {}),
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

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
          <div>
            <label className={`tz-label ${labelErrorClass(!!fieldErrors.fullName)}`} htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              onBlur={handleBlur('fullName')}
              className={`tz-input ${inputErrorClass(!!fieldErrors.fullName)}`}
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={!!fieldErrors.fullName}
            />
            <FieldError message={fieldErrors.fullName} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
              <label className={`tz-label ${labelErrorClass(!!fieldErrors.phone)}`} htmlFor="phone">
                Phone <span className="text-[#6e6e73]">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                onBlur={handleBlur('phone')}
                className={`tz-input ${inputErrorClass(!!fieldErrors.phone)}`}
                placeholder="+91 98765 43210"
                autoComplete="tel"
                aria-invalid={!!fieldErrors.phone}
              />
              <FieldError message={fieldErrors.phone} />
            </div>
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
                autoComplete="new-password"
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
            {!fieldErrors.password && (
              <p className="text-[#6e6e73] text-xs mt-1.5">{PASSWORD_HINT}</p>
            )}
          </div>

          <div>
            <label className={`tz-label ${labelErrorClass(!!fieldErrors.confirmPassword)}`} htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              onBlur={handleBlur('confirmPassword')}
              className={`tz-input ${inputErrorClass(!!fieldErrors.confirmPassword)}`}
              placeholder="••••••••"
              autoComplete="new-password"
              aria-invalid={!!fieldErrors.confirmPassword}
            />
            <FieldError message={fieldErrors.confirmPassword} />
          </div>

          {status === 'error' && errorMessage && <FormErrorAlert message={errorMessage} />}
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
