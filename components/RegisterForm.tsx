'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, UserPlus, CheckCircle2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';

export default function RegisterForm() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', password: '', confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Simple password strength calculation
    const getPasswordStrength = () => {
        let score = 0;
        if (formData.password.length > 7) score++;
        if (/[A-Z]/.test(formData.password)) score++;
        if (/[0-9]/.test(formData.password)) score++;
        if (/[^A-Za-z0-9]/.test(formData.password)) score++;
        return score;
    };
    const strength = getPasswordStrength();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setStatus('error');
            setErrorMessage("Passwords do not match.");
            return;
        }

        setStatus('loading');
        dispatch(loginStart());
        setErrorMessage('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');

            setStatus('success');
            dispatch(loginSuccess({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                token: data.token
            }));

            setTimeout(() => router.push('/dashboard'), 1500);
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
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center z-0" />
                <div className="relative z-20 text-center px-12">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        <h1 className="text-5xl font-bold text-white mb-6">Start Your Travel Journey</h1>
                        <p className="text-xl text-gray-300">
                            Create your account to unlock premium travel deals and personalized itineraries.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 bg-black py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-lg glass-dark p-8 md:p-10 rounded-3xl border border-white/10"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Join us to start planning your perfect getaway.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                    placeholder="John Doe" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                    placeholder="john@example.com" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-300">Phone</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                    placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>

                        <div className="space-y-1.5 relative">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input required type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                    placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {formData.password && (
                                <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4].map(idx => (
                                        <div key={idx} className={`h-1.5 flex-1 rounded-full transition-colors ${idx <= strength ? (strength < 3 ? 'bg-yellow-500' : 'bg-emerald-500') : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                            <input required type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                placeholder="••••••••" />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group pt-2">
                            <div className="relative flex items-center justify-center w-5 h-5 border border-white/20 rounded mt-0.5 bg-black/40 group-hover:border-blue-500 transition-colors shrink-0">
                                <input required type="checkbox" className="appearance-none absolute inset-0 peer cursor-pointer" />
                                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-gray-400 text-sm leading-tight group-hover:text-gray-300 transition-colors">
                                I agree to the <Link href="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                            </span>
                        </label>

                        {status === 'error' && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Account created successfully! Redirecting...
                            </div>
                        )}

                        <button
                            type="submit" disabled={status === 'loading' || status === 'success'}
                            className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3.5 mt-4 hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /><span>Creating Account...</span></>
                            ) : (
                                <><span>Create Account</span><UserPlus className="w-4 h-4" /></>
                            )}
                        </button>

                        <div className="text-center text-sm text-gray-400 mt-6">
                            Already have an account? <Link href="/login" className="text-white font-medium hover:underline">Sign In</Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}