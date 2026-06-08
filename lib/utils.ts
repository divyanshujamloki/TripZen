export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateRange(start: string, end: string): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    return `${startDate.getDate()}–${endDate.toLocaleDateString('en-IN', opts).replace(/^\d+\s/, '')}`;
  }

  return `${startDate.toLocaleDateString('en-IN', opts)} – ${endDate.toLocaleDateString('en-IN', opts)}`;
}

export function getAvailableSeats(totalSeats: number, bookedSeats: number): number {
  return Math.max(0, totalSeats - bookedSeats);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function toDateInput(value?: string): string {
  if (!value) return '';
  return value.split('T')[0];
}
