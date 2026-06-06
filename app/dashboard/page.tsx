'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import DashboardContent from './DashboardContent';

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-white" size={28} />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
