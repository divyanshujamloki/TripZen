'use client';

import { motion } from 'framer-motion';
import {
    Plane,
    DollarSign,
    ShieldCheck,
    Map,
    Clock,
    Heart,
    TrendingDown,
    Coffee,
    Car,
    BedDouble,
    FileText,
    Users,
    Globe,
    Award
} from 'lucide-react';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="w-full text-foreground pb-20">
            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-24 px-4 overflow-hidden flex items-center justify-center min-h-[60vh]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    {/* Placeholder for actual background image */}
                    <div className="w-full h-full bg-gray-900 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
                </div>

                <div className="container relative z-20 mx-auto max-w-5xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-white"
                    >
                        Travel Smarter. <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Spend Less.</span> Explore More.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
                    >
                        Discover affordable travel packages, transparent expense tracking, and hassle-free trip management—all in one place.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/tours" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                            Explore Tours
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto px-8 py-4 glass-dark text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 2. About Company Section */}
            <section className="py-24 px-4 container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Redefining Affordable Luxury Travel</h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            At LuxTravel, our mission is to make dream vacations accessible. We specialize in finding the absolute best travel rates without compromising on quality or experience.
                        </p>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            We eliminate the stress of planning by bringing total transparency to travel management. From flight assistance to hidden local fees, we guide you through every expense so you can budget with confidence.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                "Flight Booking Assistance",
                                "Budget Travel Planning",
                                "Hotel Recommendations",
                                "Expense Estimation",
                                "Tour Packages",
                                "End-to-End Guidance"
                            ].map((service, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-gray-300">{service}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[500px] rounded-3xl overflow-hidden glass-dark border border-white/10 p-2"
                    >
                        <div className="w-full h-full rounded-2xl bg-gray-900 bg-cover bg-center flex items-center justify-center overflow-hidden">
                            <div className="text-center p-8 absolute bg-black/40 backdrop-blur-md bottom-8 left-8 right-8 rounded-xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-2">Our Promise</h3>
                                <p className="text-sm text-gray-300">Complete transparency. No hidden fees. Just unforgettable memories.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Why Choose Us */}
            <section className="py-24 px-4 bg-white/5 border-y border-white/10 relative">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Travel With Us?</h2>
                        <p className="text-muted-foreground text-lg">We combine powerful insights, massive network discounts, and personal care to deliver unmatched value.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: DollarSign, title: "Cheapest Travel Rates", desc: "We utilize dynamic pricing algorithms to lock in the absolute lowest fares possible." },
                            { icon: ShieldCheck, title: "Trusted Travel Info", desc: "Verified reviews, accurate requirements, and reliable up-to-date travel data." },
                            { icon: Map, title: "Complete Trip Management", desc: "Leave the logistics to us. We handle everything from door to door." },
                            { icon: TrendingDown, title: "Budget-Friendly Packages", desc: "Packages optimized for your wallet, maximizing your experiences for less." },
                            { icon: Clock, title: "24/7 Customer Support", desc: "Our support agents are always a message away, no matter the time zone." },
                            { icon: Heart, title: "Personalized Assistance", desc: "Customized itineraries tailored entirely to your interests and pacing." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="glass-dark p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/10"
                            >
                                <div className="w-14 h-14 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Travel Expense Guidance Section */}
            <section className="py-24 px-4 container mx-auto max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Travel Expenses</h2>
                    <p className="text-muted-foreground text-lg">Never get caught off-guard. We provide full breakdowns and guidance so you know exactly what your trip will cost before you even pack.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: BedDouble, title: "Hotel & Lodging", desc: "Cost estimates from budget hostels to luxury suites." },
                        { icon: Car, title: "Transportation", desc: "Average costs for local trains, taxis, and flights." },
                        { icon: Coffee, title: "Food Budgets", desc: "Daily dining estimates for street food to fine dining." },
                        { icon: Plane, title: "Activities & Visas", desc: "Entry fees, tour costs, and visa processing charges." },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-black/50 p-6 rounded-2xl border border-white/10 text-center"
                        >
                            <div className="mx-auto w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h4 className="font-medium text-lg mb-2 text-gray-200">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. Statistics Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-900/10 border-t border-white/10">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Users, num: "10,000+", label: "Happy Travelers" },
                            { icon: Globe, num: "150+", label: "Destinations" },
                            { icon: Map, num: "500+", label: "Tours Managed" },
                            { icon: Award, num: "4.9/5", label: "Satisfaction" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400 opacity-80" />
                                <div className="text-4xl font-bold mb-2 text-white">{stat.num}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Testimonials */}
            <section className="py-24 px-4 container mx-auto max-w-7xl border-t border-white/10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Stories From Our Travelers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Sarah Jenkins", role: "Solo Backpacker", quote: "They helped me plan a complete budget-friendly month in Southeast Asia. I strictly followed their expense guidance and actually came home with savings!" },
                        { name: "Michael & Emma", role: "Honeymooners", quote: "The flight assistance and transparent hotel recommendations gave us a premium luxury experience in the Maldives for thousands less than we expected." },
                        { name: "David Chen", role: "Family Vacation", quote: "Managing a family of 5 is a nightmare. TripZen handled our entire Japan itinerary, right down to the bullet train budgets and local food spots." }
                    ].map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-dark p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-yellow-400 mb-4 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-6">"{review.quote}"</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{review.name}</h4>
                                <span className="text-sm text-gray-500">{review.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 7. Call To Action */}
            <section className="py-24 px-4 relative container mx-auto max-w-5xl mt-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-dark p-12 md:p-20 rounded-3xl border border-blue-500/30 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-blue-500/10 z-0" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Plan Your Next Journey With Confidence</h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Stop guessing your costs and start exploring. Get the best travel deals today and let us handle all the confusing details.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/destinations" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                                Explore Destinations
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-black/50 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}