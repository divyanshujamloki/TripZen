'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { apiJson } from '../../lib/apiClient';
import AdminSidebar from '../../components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('tripzen_token');
    if (!token) {
      router.push('/login?redirect=/admin');
      return;
    }

    if (user) {
      if (user.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      setReady(true);
      return;
    }

    apiJson<{ user: { role: string } }>('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (data.user?.role === 'admin') setReady(true);
        else router.push('/dashboard');
      })
      .catch(() => router.push('/login?redirect=/admin'));
  }, [user, router]);

  if (!ready) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-black">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="tz-page py-8 sm:py-10">
      <div className="tz-container flex flex-col lg:flex-row gap-8 lg:gap-12">
        <AdminSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
