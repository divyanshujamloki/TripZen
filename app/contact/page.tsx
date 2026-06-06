'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const info = [
    { icon: MapPin, label: 'Office', value: 'Connaught Place, New Delhi, India' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: Mail, label: 'Email', value: 'hello@tripzen.com' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10 AM – 7 PM IST' },
  ];

  return (
    <div className="tz-page py-10 sm:py-14">
      <div className="tz-container">
        <SectionHeading title="Contact" subtitle="Questions about a trip? We're here to help." />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="tz-card divide-y divide-white/[0.08]">
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 p-5 sm:p-6">
                  <Icon size={18} className="text-white shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-[#a1a1a6] text-sm mt-1">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden tz-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.24823956553!2d77.0437023!3d28.5272525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b47ed6c69%3A0xa5aef3ef278aeab!2sDelhi%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 invert grayscale opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TripZen office location"
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="tz-card p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-medium text-white mb-6">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full name" required value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="tz-input" />
              <input type="email" placeholder="Email" required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="tz-input" />
              <input type="tel" placeholder="Phone" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="tz-input" />
              <textarea placeholder="Your message..." required rows={5} value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="tz-input resize-none" />
              {status === 'success' && <p className="text-[#a1a1a6] text-sm">Message sent. We&apos;ll reply soon.</p>}
              {status === 'error' && <p className="text-[#a1a1a6] text-sm">Something went wrong. Please try again.</p>}
              <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
                {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <><Send size={16} className="mr-2" /> Send</>}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
