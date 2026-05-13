'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Send, Loader2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        destination: '',
        travelDate: '',
        travelers: 1,
        subject: '',
        message: '',
        preferredContactMethod: 'Email',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message.');

            setStatus('success');
            setFormData({
                fullName: '', email: '', phone: '', destination: '', travelDate: '',
                travelers: 1, subject: '', message: '', preferredContactMethod: 'Email'
            });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred.');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get in Touch</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Ready for your next adventure? Contact our travel experts to start planning your dream vacation today.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                    {/* Left Column - Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="glass-dark p-8 rounded-2xl border border-gray-800">
                            <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-xl text-blue-400">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-300 font-medium mb-1">Office Address</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            123 Explorer's Avenue, Suite 400<br />
                                            New York, NY 10001, United States
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-xl text-blue-400">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-300 font-medium mb-1">Email Address</h3>
                                        <p className="text-gray-500 text-sm">hello@tripzen.com</p>
                                        <p className="text-gray-500 text-sm">support@tripzen.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-xl text-blue-400">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-300 font-medium mb-1">Phone & WhatsApp</h3>
                                        <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
                                        <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                                            <MessageSquare className="w-4 h-4" /> +1 (555) 987-6543
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-gray-800 p-3 rounded-xl text-blue-400">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-300 font-medium mb-1">Working Hours</h3>
                                        <p className="text-gray-500 text-sm">Mon - Fri: 9:00 AM - 6:00 PM (EST)</p>
                                        <p className="text-gray-500 text-sm">Sat - Sun: 10:00 AM - 4:00 PM (EST)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-10 pt-8 border-t border-gray-800">
                                <h3 className="text-gray-300 font-medium mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                                        <a key={idx} href="#" className="p-3 bg-gray-900 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Google Map Embedded */}
                        <div className="h-64 rounded-2xl overflow-hidden glass-dark border border-gray-800">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280010374!2d-74.14448719293153!3d40.697631233306935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                                className="w-full h-full border-0 grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="glass-dark p-8 rounded-2xl border border-gray-800 h-full">
                            <h2 className="text-2xl font-semibold mb-6 text-white">Send Us an Inquiry</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-medium text-gray-400">Full Name *</label>
                                        <input required type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address *</label>
                                        <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone Number *</label>
                                        <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    {/* Destination */}
                                    <div className="space-y-2">
                                        <label htmlFor="destination" className="text-sm font-medium text-gray-400">Destination *</label>
                                        <input required type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            placeholder="Bali, Paris, etc."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Travel Date */}
                                    <div className="space-y-2">
                                        <label htmlFor="travelDate" className="text-sm font-medium text-gray-400">Travel Date *</label>
                                        <input required type="date" id="travelDate" name="travelDate" value={formData.travelDate} onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>

                                    {/* Travelers */}
                                    <div className="space-y-2">
                                        <label htmlFor="travelers" className="text-sm font-medium text-gray-400">Travelers *</label>
                                        <input required type="number" min="1" id="travelers" name="travelers" value={formData.travelers} onChange={handleChange}
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="preferredContactMethod" className="text-sm font-medium text-gray-400">Preferred Contact Method</label>
                                    <select id="preferredContactMethod" name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer">
                                        <option value="Email">Email</option>
                                        <option value="Phone Call">Phone Call</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                    </select>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-400">Subject *</label>
                                    <input required type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        placeholder="Inquiry about Honeymoon Package"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-400">Message *</label>
                                    <textarea required id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                        placeholder="Tell us about your requirements..."
                                    ></textarea>
                                </div>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center">
                                        Your inquiry has been sent successfully! Our team will contact you shortly.
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                                        {errorMessage || 'Failed to send message. Please try again.'}
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-white text-black font-semibold rounded-lg px-4 py-4 mt-6 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Sending Inquiry...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Inquiry</span>
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
