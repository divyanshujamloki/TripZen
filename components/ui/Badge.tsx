interface BadgeProps {
  status: 'upcoming' | 'full' | 'draft' | 'completed' | 'cancelled' | 'few-seats';
  children?: React.ReactNode;
}

const styles = {
  upcoming: 'border-white/20 text-white bg-white/5',
  full: 'border-white/10 text-[#a1a1a6] bg-white/[0.03]',
  draft: 'border-white/10 text-[#6e6e73] bg-transparent',
  completed: 'border-white/15 text-[#a1a1a6] bg-white/[0.03]',
  cancelled: 'border-white/10 text-[#6e6e73] bg-transparent',
  'few-seats': 'border-white/25 text-white bg-white/5',
};

const labels = {
  upcoming: 'Upcoming',
  full: 'Full',
  draft: 'Draft',
  completed: 'Completed',
  cancelled: 'Cancelled',
  'few-seats': 'Few Seats Left',
};

export default function Badge({ status, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] sm:text-xs font-medium tracking-wide ${styles[status]}`}>
      {children ?? labels[status]}
    </span>
  );
}
