'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, CalendarCheck, MessageCircle, ArrowLeft } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/trips', label: 'Trips', icon: Map },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/questions', label: 'Questions', icon: MessageCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <Link href="/" className="flex items-center gap-2 text-[#a1a1a6] hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to site
      </Link>
      <p className="text-[11px] uppercase tracking-[0.15em] text-[#6e6e73] mb-4">Admin</p>
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-full lg:rounded-xl text-sm whitespace-nowrap transition-colors ${
              pathname === href || (href !== '/admin' && pathname.startsWith(href))
                ? 'bg-white text-black font-medium'
                : 'text-[#a1a1a6] hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
