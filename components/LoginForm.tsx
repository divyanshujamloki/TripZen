'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

            setStatus('success');
            dispatch(loginSuccess({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                token: data.token
            }));

            router.push('/dashboard');
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message);
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <div className="flex w-full min-h-screen">
            {/* Left Section - Visuals */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center z-0" />
                <div className="relative z-20 text-center px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-bold text-white mb-6">Welcome Back</h1>
                        <p className="text-xl text-gray-300">
                            Login to continue planning your next unforgettable journey.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md glass-dark p-8 md:p-10 rounded-3xl border border-white/10"
                >
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-3">Sign In</h2>
                        <p className="text-gray-400">Enter your email and password to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                required type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                placeholder="hello@example.com"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    required type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5 border border-white/20 rounded bg-black/40 group-hover:border-blue-500 transition-colors">
                                    <input type="checkbox" className="appearance-none absolute inset-0 peer cursor-pointer" />
                                    <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</Link>
                        </div>

                        {status === 'error' && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit" disabled={status === 'loading'}
                            className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3.5 hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /><span>Signing in...</span></>
                            ) : (
                                <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>

                        <div className="text-center text-sm text-gray-400 mt-6">
                            Don't have an account? <Link href="/register" className="text-white font-medium hover:underline">Sign Up</Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}