'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Send, Loader2, MessageSquare } from 'lucide-react';
import { submitContactForm, resetContactStatus } from '../redux/slices/contactSlice';
import { AppDispatch, RootState } from '../redux/store';

export default function ContactForm() {
    const dispatch = useDispatch<AppDispatch>();
    const { status, errorMessage } = useSelector((state: RootState) => state.contact);

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

    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                dispatch(resetContactStatus());
                setFormData({
                    fullName: '', email: '', phone: '', destination: '', travelDate: '',
                    travelers: 1, subject: '', message: '', preferredContactMethod: 'Email'
                });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(submitContactForm(formData));
    };

    return (
        <section className="py-20 px-4 w-full text-foreground">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 px-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Design Your Dream Trip</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Our luxury travel experts are ready to curate an unforgettable experience just for you.
                    </p>
                </motion.div>

                {/* Fully Responsive Grid Container */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">

                    {/* Left Column - Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full lg:w-5/12 space-y-8"
                    >
                        <div className="glass-dark p-6 md:p-8 rounded-2xl flex flex-col h-full">
                            <h3 className="text-2xl font-semibold mb-8">Contact Details</h3>

                            <div className="space-y-8 flex-grow">
                                {/* Contact Items */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 text-blue-400 shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-200 font-medium mb-1 text-lg">Office location</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            123 Explorer's Avenue, Suite 400<br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 text-blue-400 shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-200 font-medium mb-1 text-lg">Send an email</h4>
                                        <a href="mailto:hello@tripzen.com" className="block text-muted-foreground text-sm hover:text-white transition-colors">hello@tripzen.com</a>
                                        <a href="mailto:support@tripzen.com" className="block text-muted-foreground text-sm hover:text-white transition-colors mt-1">support@tripzen.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 text-blue-400 shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-200 font-medium mb-1 text-lg">Give us a call</h4>
                                        <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                                        <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                                            <MessageSquare className="w-4 h-4" /> +1 (555) 987-6543 (WhatsApp)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 text-blue-400 shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-200 font-medium mb-1 text-lg">Business Hours</h4>
                                        <p className="text-muted-foreground text-sm">Mon-Fri: 9:00 AM - 6:00 PM (EST)</p>
                                        <p className="text-muted-foreground text-sm">Sat-Sun: 10:00 AM - 4:00 PM (EST)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-gray-300 font-medium mb-4 text-sm uppercase tracking-wider">Follow our journeys</p>
                                <div className="flex space-x-4">
                                    {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                                        <a key={idx} href="#" className="p-2.5 bg-black/40 rounded-lg text-gray-400 hover:text-white hover:bg-primary/50 transition-all border border-transparent hover:border-white/20">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full lg:w-7/12"
                    >
                        <div className="glass-dark p-6 md:p-8 rounded-2xl h-full">
                            <h3 className="text-2xl font-semibold mb-6">Send an Inquiry</h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="fullName" className="text-sm font-medium text-gray-300">Full Name</label>
                                        <input required type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                                        <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                                        <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="destination" className="text-sm font-medium text-gray-300">Dream Destination</label>
                                        <input required type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                            placeholder="Bali, Paris, etc."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="space-y-1.5 md:col-span-1">
                                        <label htmlFor="travelDate" className="text-sm font-medium text-gray-300">Travel Date</label>
                                        <input required type="date" id="travelDate" name="travelDate" value={formData.travelDate} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all [color-scheme:dark]"
                                        />
                                    </div>

                                    <div className="space-y-1.5 md:col-span-1">
                                        <label htmlFor="travelers" className="text-sm font-medium text-gray-300">Travelers</label>
                                        <input required type="number" min="1" id="travelers" name="travelers" value={formData.travelers} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5 md:col-span-1">
                                        <label htmlFor="preferredContactMethod" className="text-sm font-medium text-gray-300">Contact Method</label>
                                        <select id="preferredContactMethod" name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer">
                                            <option className="bg-gray-900" value="Email">Email</option>
                                            <option className="bg-gray-900" value="Phone Call">Phone</option>
                                            <option className="bg-gray-900" value="WhatsApp">WhatsApp</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                                    <input required type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                        placeholder="Inquiry about Honeymoon Package"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                    <textarea required id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                        placeholder="Tell us about your requirements..."
                                    ></textarea>
                                </div>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm font-medium">
                                        Your inquiry has been sent successfully! Our experts will contact you shortly.
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium">
                                        {errorMessage || 'Failed to send message. Please try again.'}
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-white text-black font-semibold rounded-xl px-4 py-4 mt-2 hover:bg-gray-200 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Sending...</span>
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
        </section>
    );
}